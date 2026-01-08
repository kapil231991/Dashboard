package com.kapil.backend.controllers;

import com.kapil.backend.dto.LoginRequest;
import com.kapil.backend.dto.LoginResponse;
import com.kapil.backend.dto.RegisterRequest;
import com.kapil.backend.models.User;
import com.kapil.backend.security.JwtUtil;
import com.kapil.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(),
                                    request.getPassword()
                            )
                    );

            // If we reach here → authentication successful
            String token = JwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(
                    new LoginResponse(token)
            );
        } catch (AuthenticationException ex) {
            // Bad credentials / user not found
            return ResponseEntity.status(401)
                    .body(new LoginResponse("Invalid username or password"));
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

        return ResponseEntity.status(201)
                .body(new LoginResponse("User registered successfully"));
    }

}
