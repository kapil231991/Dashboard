package com.kapil.backend.services;

import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepositery userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<User> getUsers() {
        return userRepo.findAll();
    }

    public User createUser(User u1) {

        if (userRepo.findByUsername(u1.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepo.findByEmail(u1.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        u1.setPassword(passwordEncoder.encode(u1.getPassword()));
        return userRepo.save(u1);
    }

    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }


}
