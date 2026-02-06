package com.kapil.backend.todos.services;


import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import com.kapil.backend.todos.dto.CreateTodoRequest;
import com.kapil.backend.todos.dto.UpdateTodoRequest;
import com.kapil.backend.todos.dto.TodoResponse;
import com.kapil.backend.todos.models.Todo;
import com.kapil.backend.todos.models.enums.TodoStatus;
import com.kapil.backend.todos.repositories.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepositery userRepository;

    public TodoService(TodoRepository todoRepository, UserRepositery userRepositery) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepositery;

    }

    /* =========================
       CREATE
       ========================= */
    public TodoResponse create(CreateTodoRequest req, User user) {

        Todo todo = new Todo();
        todo.setTitle(req.getTitle());
        todo.setDescription(req.getDescription());
        todo.setDueDate(req.getDueDate());
        todo.setStatus(TodoStatus.PENDING);
        todo.setCreatedBy(user);

        Todo saved = todoRepository.save(todo);
        return map(saved);
    }

    /* =========================
       GET ALL (user-specific)
       ========================= */
    public List<TodoResponse> getAll(String username) {
        User user = resolveUser(username);
        return todoRepository.findByCreatedBy(user)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    private User resolveUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /* =========================
       GET ONE (ownership enforced)
       ========================= */
    public TodoResponse getOne(Long id, User user) {

        Todo todo = todoRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        return map(todo);
    }

    /* =========================
       UPDATE (partial)
       ========================= */
    public TodoResponse update(Long id, UpdateTodoRequest req, User user) {

        Todo todo = todoRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (req.getTitle() != null) {
            todo.setTitle(req.getTitle());
        }

        if (req.getDescription() != null) {
            todo.setDescription(req.getDescription());
        }

        if (req.getStatus() != null) {
            todo.setStatus(req.getStatus());
        }

        if (req.getDueDate() != null) {
            todo.setDueDate(req.getDueDate());
        }

        todo.setUpdatedDate(LocalDateTime.now());

        Todo updated = todoRepository.save(todo);
        return map(updated);
    }

    /* =========================
       DELETE (HARD DELETE)
       ========================= */
    public void delete(Long id, User user) {

        Todo todo = todoRepository.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todoRepository.delete(todo);
    }

    /* =========================
       MAPPER (Entity → DTO)
       ========================= */
    private TodoResponse map(Todo t) {

        TodoResponse r = new TodoResponse();
        r.setId(t.getId());
        r.setTitle(t.getTitle());
        r.setDescription(t.getDescription());
        r.setStatus(t.getStatus());
        r.setDueDate(t.getDueDate());
        r.setCreatedDate(t.getCreatedDate());
        r.setUpdatedDate(t.getUpdatedDate());

        return r;
    }
}