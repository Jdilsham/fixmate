package com.fixmate.backend.controller;

import com.fixmate.backend.dto.AuthResponse;
import com.fixmate.backend.dto.LoginRequest;
import com.fixmate.backend.dto.SignupRequest;
import com.fixmate.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest r) {
        auth.signup(r);
        return ResponseEntity.ok("User Created");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest r) {
        String token = auth.login(r);
        return ResponseEntity.ok(new AuthResponse(token));
    }

}
