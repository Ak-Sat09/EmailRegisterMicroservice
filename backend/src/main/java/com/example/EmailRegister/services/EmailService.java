package com.example.EmailRegister.services;

import com.example.EmailRegister.dtos.EmailListDto;
import com.example.EmailRegister.models.Company;
import com.example.EmailRegister.models.Email;
import com.example.EmailRegister.repositories.CompanyRepositories;
import com.example.EmailRegister.repositories.EmailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final CompanyRepositories companyRepository;
    private final EmailRepository emailRepository;

    /**
     * Save emails from DTO and return int array: [addedCount, skippedCount]
     */
    @Transactional
    public int[] saveEmails(EmailListDto emailListDTO) {
        int addedCount = 0;
        int skippedCount = 0;

        log.info("Start saving emails: {}", emailListDTO.getEmails());

        for (String emailStr : emailListDTO.getEmails()) {

            // Extract company name
            String companyName = extractCompanyName(emailStr);
            if (companyName == null) {
                log.warn("Skipping invalid email: {}", emailStr);
                skippedCount++;
                continue;
            }

            // Find or create company
            Company company = companyRepository.findByName(companyName)
                    .orElseGet(() -> {
                        log.info("Creating new company: {}", companyName);
                        return companyRepository.save(Company.builder().name(companyName).build());
                    });

            // Check if email already exists
            if (!emailRepository.existsByName(emailStr)) {
                Email email = Email.builder()
                        .name(emailStr)
                        .company(company)
                        .build();

                company.addEmail(email); // bidirectional mapping
                emailRepository.save(email);

                log.info("Saved email: {} under company: {}", emailStr, companyName);
                addedCount++;
            } else {
                log.info("Skipped duplicate email: {} under company: {}", emailStr, companyName);
                skippedCount++;
            }
        }

        log.info("Finished saving emails. Added: {}, Skipped: {}", addedCount, skippedCount);
        return new int[] { addedCount, skippedCount };
    }

    /**
     * Extract company name from email
     */
    private String extractCompanyName(String email) {
        if (email == null || !email.contains("@"))
            return null;

        String[] parts = email.split("@");
        if (parts.length != 2 || parts[1].isEmpty())
            return null;

        // Take only the part before the first dot
        String domainPart = parts[1].toLowerCase(); // e.g., example.com
        String[] domainParts = domainPart.split("\\.");
        String company = domainParts[0];

        // Capitalize first letter
        return company.substring(0, 1).toUpperCase() + company.substring(1);
    }
}
