package com.fixmate.backend.service;

import com.fixmate.backend.config.JwtUtil;
import com.fixmate.backend.dto.LoginRequest;
import com.fixmate.backend.dto.SignupRequest;
import com.fixmate.backend.entity.User;
import com.fixmate.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwt, AuthenticationManager am){
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwt;
        this.authManager = am;
    }

    public void signup(SignupRequest r){

        if(repo.existsByEmail(r.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");

        }

        User user = new User(
                r.getFirstName(),
                r.getLastName(),
                r.getEmail(),
                r.getPhone(),
                encoder.encode(r.getPassword()),
                r.getRole()
        );


        repo.save(user);
    }

    public String login(LoginRequest r){

        repo.findByEmail(r.getEmail()).ifPresent(user -> {
            if (user.isBanned()) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Your account has been banned.");
            }
        });


        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        r.getEmail(),
                        r.getPassword()
                )
        );

        return jwtUtil.generateToken(r.getEmail());
    }
}
