package com.fixmate.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private String role;
}
