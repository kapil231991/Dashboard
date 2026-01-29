package com.kapil.backend.accounts.controllers;

import com.kapil.backend.accounts.dto.CreateTransactionRequest;
import com.kapil.backend.accounts.dto.TransactionResponse;
import com.kapil.backend.accounts.services.TransactionService;
import com.kapil.backend.security.user.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public TransactionResponse create(@RequestBody @Valid CreateTransactionRequest req,
                                      @AuthenticationPrincipal CustomUserDetails user) {
        return transactionService.create(req, user.getUser());
    }

    @GetMapping
    public List<TransactionResponse> getAll(
            @RequestParam(required = false) Long accountId,
            @AuthenticationPrincipal CustomUserDetails user) {

        if (accountId != null) {
            return transactionService.getByAccount(accountId, user.getUser());
        }
        return transactionService.getAll(user.getUser());
    }

    @GetMapping("/{id}")
    public TransactionResponse getOne(@PathVariable Long id,
                                      @AuthenticationPrincipal CustomUserDetails user) {
        System.out.println("Coming here");
        return transactionService.getOne(id, user.getUser());
    }

    @PutMapping("/{id}")
    public TransactionResponse update(@PathVariable Long id,
                                      @RequestBody @Valid CreateTransactionRequest req,
                                      @AuthenticationPrincipal CustomUserDetails user) {
        return transactionService.update(id, req, user.getUser());
    }
}
