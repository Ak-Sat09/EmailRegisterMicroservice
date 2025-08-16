package com.example.EmailRegister.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailListDto {

    @NotEmpty(message = "Email list cannot be empty")
    private List<@Email(message = "Invalid email format") String> emails;
}
