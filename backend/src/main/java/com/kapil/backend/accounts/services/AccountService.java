package com.kapil.backend.accounts.services;

import com.kapil.backend.accounts.dto.AccountResponse;
import com.kapil.backend.accounts.dto.CreateAccountRequest;
import com.kapil.backend.accounts.dto.UpdateAccountRequest;
import com.kapil.backend.accounts.models.Account;
import com.kapil.backend.accounts.models.enums.AccountStatus;
import com.kapil.backend.accounts.models.enums.TransactionType;
import com.kapil.backend.accounts.repositery.AccountRepository;
import com.kapil.backend.accounts.repositery.TransactionRepository;
import com.kapil.backend.models.User;
import com.kapil.backend.repositery.UserRepositery;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepositery userRepository;
    private final TransactionRepository transactionRepository;

    public AccountService(AccountRepository accountRepository,
                          UserRepositery userRepository,
                          TransactionRepository transactionRepository
                          ) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    private User resolveUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public AccountResponse create(CreateAccountRequest req, String username) {
        User user = resolveUser(username);

        Account acc = new Account();
        acc.setName(req.getName());
        acc.setAccountType(req.getAccountType());
        acc.setOpeningBalance(req.getOpeningBalance());
        acc.setCreatedBy(user);

        Account saved = accountRepository.save(acc);
        return map(saved);
    }

    public List<AccountResponse> getAll(String username) {
        User user = resolveUser(username);

        return accountRepository
                .findByCreatedByAndStatus(user, AccountStatus.ACTIVE)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public AccountResponse getOne(Long id, String username) {
        User user = resolveUser(username);

        Account acc = accountRepository
                .findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return map(acc);
    }

    public AccountResponse update(Long id, UpdateAccountRequest req, String username) {
        User user = resolveUser(username);

        Account acc = accountRepository
                .findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (req.getName() != null) acc.setName(req.getName());
        if (req.getAccountType() != null) acc.setAccountType(req.getAccountType());
        if (req.getStatus() != null) acc.setStatus(req.getStatus());

        return map(accountRepository.save(acc));
    }

    public void delete(Long id, String username) {
        User user = resolveUser(username);

        Account acc = accountRepository
                .findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        acc.setStatus(AccountStatus.ARCHIVED);
        accountRepository.save(acc);
    }

    private AccountResponse map(Account a) {
        AccountResponse r = new AccountResponse();
        r.setId(a.getId());
        r.setName(a.getName());
        r.setAccountType(a.getAccountType());
        r.setOpeningBalance(a.getOpeningBalance());
        r.setStatus(a.getStatus());
        r.setCreatedDate(a.getCreatedDate());

        BigDecimal totalCr =
                transactionRepository.sumByAccountAndType(a, TransactionType.CR);

        BigDecimal totalDr =
                transactionRepository.sumByAccountAndType(a, TransactionType.DR);

        BigDecimal currentBalance =
                a.getOpeningBalance()
                        .add(totalCr)
                        .subtract(totalDr);

        r.setCurrentBalance(currentBalance);

        return r;
    }
}
