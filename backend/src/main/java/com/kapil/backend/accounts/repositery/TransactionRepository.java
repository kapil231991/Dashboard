package com.kapil.backend.accounts.repositery;


import com.kapil.backend.accounts.models.Account;
import com.kapil.backend.accounts.models.Transaction;
import com.kapil.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // All transactions of a user (safety net)
    List<Transaction> findByCreatedBy(User user);

    // All transactions for a specific account (user-scoped via service)
    List<Transaction> findByAccount(Account account);

    // By account within date range
    List<Transaction> findByAccountAndCreatedDateBetween(
            Account account,
            LocalDateTime from,
            LocalDateTime to
    );

    // User-wide date filter (for dashboards later)
    List<Transaction> findByCreatedByAndCreatedDateBetween(
            User user,
            LocalDateTime from,
            LocalDateTime to
    );


}
