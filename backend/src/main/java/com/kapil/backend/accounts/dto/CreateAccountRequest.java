package com.kapil.backend.accounts.dto;

import com.kapil.backend.accounts.models.enums.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public class CreateAccountRequest {
    @NotBlank
    private String name;

    @NotNull
    private AccountType accountType;

    @NotNull
    @PositiveOrZero
    private BigDecimal openingBalance;

    public @NotBlank String getName() {
        return name;
    }

    public @NotNull AccountType getAccountType() {
        return accountType;
    }

    public @NotNull @PositiveOrZero BigDecimal getOpeningBalance() {
        return openingBalance;
    }

    public void setAccountType(@NotNull AccountType accountType) {
        this.accountType = accountType;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }

    public void setOpeningBalance(@NotNull @PositiveOrZero BigDecimal openingBalance) {
        this.openingBalance = openingBalance;
    }
}
