package com.fixmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";

    public AuthResponse(String token) {
        this.token = token;
    }
}
