package com.example.EmailRegister.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class EmailResponseDto {

    private int added; // Number of emails successfully added
    private int skipped; // Number of emails skipped (duplicates/invalid)
}