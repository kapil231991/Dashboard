package com.kapil.backend.accounts.models;

import com.kapil.backend.accounts.models.enums.AccountStatus;
import com.kapil.backend.accounts.models.enums.AccountType;
import com.kapil.backend.models.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType accountType; // CC | DD | OD

    @Column(nullable = false)
    private BigDecimal openingBalance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountStatus status = AccountStatus.ACTIVE;

    @ManyToOne(optional = false)
    private User createdBy;

    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getOpeningBalance() {
        return openingBalance;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public void setOpeningBalance(BigDecimal openingBalance) {
        this.openingBalance = openingBalance;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
