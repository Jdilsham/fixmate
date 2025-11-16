package com.fixmate.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public String me(@AuthenticationPrincipal UserDetails user) {
        return "Logged in as: " + user.getUsername();
    }
}
