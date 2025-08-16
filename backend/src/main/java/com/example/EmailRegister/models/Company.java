package com.example.EmailRegister.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "companies", uniqueConstraints = {
        @UniqueConstraint(name = "uk_company_name", columnNames = "name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    @Column(nullable = false)
    private String name;

    @Builder.Default
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Email> emails = new LinkedHashSet<>();

    // Helper method to add email
    public void addEmail(Email email) {
        emails.add(email); // Set ensures uniqueness
        email.setCompany(this);
    }

    // Helper method to remove email
    public void removeEmail(Email email) {
        emails.remove(email);
        email.setCompany(null);
    }
}
