package com.kapil.backend.todos.repositories;

import com.kapil.backend.models.User;
import com.kapil.backend.todos.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByCreatedBy(User user);

    Optional<Todo> findByIdAndCreatedBy(Long id, User user);
}