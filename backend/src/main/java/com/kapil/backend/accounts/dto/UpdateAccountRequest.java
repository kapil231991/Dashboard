package com.kapil.backend.accounts.dto;

import com.kapil.backend.accounts.models.enums.AccountStatus;
import com.kapil.backend.accounts.models.enums.AccountType;

public class UpdateAccountRequest {
    private String name;
    private AccountType accountType;
    private AccountStatus status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }
}
