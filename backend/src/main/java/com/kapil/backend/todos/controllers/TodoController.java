package com.kapil.backend.todos.controllers;

import com.kapil.backend.security.user.CustomUserDetails;
import com.kapil.backend.todos.dto.CreateTodoRequest;
import com.kapil.backend.todos.dto.TodoResponse;
import com.kapil.backend.todos.dto.UpdateTodoRequest;
import com.kapil.backend.todos.services.TodoService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    /* =========================
       CREATE TODO
       ========================= */
    @PostMapping
    public TodoResponse create(@RequestBody @Valid CreateTodoRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return todoService.create(req, user.getUser());
    }

    /* =========================
       GET ALL TODOS
       ========================= */
    @GetMapping
    public List<TodoResponse> getAll(
            @AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails principal) {

        return todoService.getAll(principal.getUsername());
    }

    /* =========================
       GET ONE TODO
       ========================= */
    @GetMapping("/{id}")
    public TodoResponse getOne(@PathVariable Long id,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return todoService.getOne(id, user.getUser());
    }

    /* =========================
       UPDATE TODO
       ========================= */
    @PutMapping("/{id}")
    public TodoResponse update(@PathVariable Long id,
                               @RequestBody UpdateTodoRequest req,
                               @AuthenticationPrincipal CustomUserDetails user) {
        return todoService.update(id, req, user.getUser());
    }

    /* =========================
       DELETE TODO (HARD DELETE)
       ========================= */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal CustomUserDetails user) {
        todoService.delete(id, user.getUser());
    }
}
