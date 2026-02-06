package com.kapil.backend.strategy.repositories;

import com.kapil.backend.models.User;
import com.kapil.backend.strategy.models.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, UUID> {

    List<Goal> findByCreatedBy(User user);
    Optional<Goal> findByIdAndCreatedBy(UUID id, User createdBy);
}
