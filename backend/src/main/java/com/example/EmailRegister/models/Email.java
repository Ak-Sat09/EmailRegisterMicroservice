package com.example.EmailRegister.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "emails", uniqueConstraints = {
        @UniqueConstraint(name = "uk_email_address", columnNames = "email_address")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Email name is required")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @jakarta.validation.constraints.Email(message = "Invalid email format")
    @Column(name = "email_address", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    // Override equals & hashCode for Set uniqueness
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Email))
            return false;
        Email email = (Email) o;
        return name != null && name.equalsIgnoreCase(email.getName());
    }

    @Override
    public int hashCode() {
        return name != null ? name.toLowerCase().hashCode() : 0;
    }
}
