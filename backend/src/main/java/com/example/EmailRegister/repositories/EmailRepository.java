package com.example.EmailRegister.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmailRegister.models.Email;

public interface EmailRepository extends JpaRepository<Email, Long> {
    boolean existsByName(String name);
}
