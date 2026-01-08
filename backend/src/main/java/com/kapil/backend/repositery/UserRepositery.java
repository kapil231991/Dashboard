package com.kapil.backend.repositery;

import com.kapil.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepositery extends JpaRepository<User , Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
