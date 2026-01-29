package com.kapil.backend.accounts.dto;


import com.kapil.backend.accounts.models.enums.TransactionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.Set;

public class CreateTransactionRequest {

    @NotNull
    private Long accountId;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotNull
    private TransactionType transactionType; // CR | DR

    private String name;
    private String description;

    // Tag IDs coming from client
    private Set<Long> tagIds;

    // ---- Getters & Setters ----

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(Set<Long> tagIds) {
        this.tagIds = tagIds;
    }
}
