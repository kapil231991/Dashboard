package com.kapil.backend.accounts.repositery;

import com.kapil.backend.accounts.models.Account;
import com.kapil.backend.accounts.models.enums.AccountStatus;
import com.kapil.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByCreatedByAndStatus(User user, AccountStatus status);

    Optional<Account> findByIdAndCreatedBy(Long id, User user);
}
