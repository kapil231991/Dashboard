package com.kapil.backend.controllers;

import com.kapil.backend.dto.ErrorResponse;
import com.kapil.backend.dto.LoginRequest;
import com.kapil.backend.dto.LoginResponse;
import com.kapil.backend.dto.RegisterRequest;
import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import com.kapil.backend.security.JwtUtil;
import com.kapil.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepositery userRepositery;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, UserRepositery userRepositery) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.userRepositery = userRepositery;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            String token = JwtUtil.generateToken(request.getUsername());

            User user = userRepositery
                    .findByUsername(request.getUsername())
                    .orElseThrow();

            return ResponseEntity.ok(
                    new LoginResponse(
                            token,
                            user.getUsername(),
                            user.getFirstName(),
                            user.getLastName()
                    )
            );

        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401)
                    .body(new ErrorResponse("Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword()); // encoded in service

        userService.createUser(user);


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = JwtUtil.generateToken(request.getUsername());


        return ResponseEntity.status(201)
                .body(new LoginResponse(
                        token,
                        user.getUsername(),
                        user.getFirstName(),
                        user.getLastName()));
    }

}
