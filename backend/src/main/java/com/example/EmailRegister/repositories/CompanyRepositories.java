package com.example.EmailRegister.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmailRegister.models.Company;

public interface CompanyRepositories extends JpaRepository<Company, Long> {
    Optional<Company> findByName(String name);
}
