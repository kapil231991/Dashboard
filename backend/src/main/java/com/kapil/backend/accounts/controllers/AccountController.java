package com.kapil.backend.accounts.controllers;

import com.kapil.backend.accounts.dto.AccountResponse;
import com.kapil.backend.accounts.dto.CreateAccountRequest;
import com.kapil.backend.accounts.dto.UpdateAccountRequest;
import com.kapil.backend.accounts.services.AccountService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public AccountResponse create(@RequestBody @Valid CreateAccountRequest req,
                                  @AuthenticationPrincipal UserDetails principal) {
        return accountService.create(req, principal.getUsername());
    }

    @GetMapping
    public List<AccountResponse> all(@AuthenticationPrincipal UserDetails principal) {
        return accountService.getAll(principal.getUsername());
    }

    @GetMapping("/{id}")
    public AccountResponse one(@PathVariable Long id,
                               @AuthenticationPrincipal UserDetails principal) {
        return accountService.getOne(id, principal.getUsername());
    }

    @PutMapping("/{id}")
    public AccountResponse update(@PathVariable Long id,
                                  @RequestBody UpdateAccountRequest req,
                                  @AuthenticationPrincipal UserDetails principal) {
        return accountService.update(id, req, principal.getUsername());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,
                       @AuthenticationPrincipal UserDetails principal) {
        accountService.delete(id, principal.getUsername());
    }
}
