package com.example.EmailRegister.controllers;

import com.example.EmailRegister.dtos.EmailListDto;
import com.example.EmailRegister.dtos.EmailResponseDto;
import com.example.EmailRegister.services.EmailService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    private final EmailService emailService; // injected via Lombok

    /**
     * Endpoint to save list of emails
     */
    @PostMapping("/save")
    public ResponseEntity<EmailResponseDto> saveEmails(
            @Valid @RequestBody EmailListDto emailListDTO) {

        int[] result = emailService.saveEmails(emailListDTO);

        EmailResponseDto response = EmailResponseDto.builder()
                .added(result[0])
                .skipped(result[1])
                .build();

        return ResponseEntity.ok(response);
    }
}
