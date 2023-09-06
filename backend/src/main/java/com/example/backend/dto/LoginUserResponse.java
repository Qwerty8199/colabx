package com.example.backend.dto;

import com.example.backend.model.ApplicationUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginUserResponse {

    private ApplicationUser user;
    private String jwt;
    
}
