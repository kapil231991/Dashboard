package com.kapil.backend.accounts.services;

import com.kapil.backend.accounts.dto.CreateTransactionRequest;
import com.kapil.backend.accounts.dto.TransactionResponse;
import com.kapil.backend.accounts.models.*;
import com.kapil.backend.accounts.models.enums.AccountStatus;
import com.kapil.backend.accounts.repositery.AccountRepository;
import com.kapil.backend.accounts.repositery.TagRepository;
import com.kapil.backend.accounts.repositery.TransactionRepository;
import com.kapil.backend.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              AccountRepository accountRepository,
                              TagRepository tagRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.tagRepository = tagRepository;
    }

    public TransactionResponse create(CreateTransactionRequest req, User user) {

        // 1. Load account
        Account account = accountRepository.findById(req.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getCreatedBy().getUserId() != user.getUserId()) {
            throw new RuntimeException("Forbidden: account does not belong to user");
        }
        // 3. Account status check
        if (account.getStatus() != AccountStatus.ACTIVE) {
            throw new RuntimeException("Account is not active");
        }

        // 4. Create transaction
        Transaction tx = new Transaction();
        tx.setAccount(account);
        tx.setCreatedBy(user);
        tx.setName(req.getName());
        tx.setDescription(req.getDescription());
        tx.setAmount(req.getAmount());
        tx.setTransactionType(req.getTransactionType());

        // 5. Resolve tags (if provided)
        if (req.getTagIds() != null && !req.getTagIds().isEmpty()) {
            Set<Tag> tags = tagRepository.findAllById(req.getTagIds())
                    .stream()
                    .collect(Collectors.toSet());

            if (tags.size() != req.getTagIds().size()) {
                throw new RuntimeException("One or more tags are invalid");
            }

            tx.setTags(tags);
        }

        // 6. Persist
        Transaction saved = transactionRepository.save(tx);

        // 7. Map to response
        return map(saved);
    }

    private TransactionResponse map(Transaction t) {
        TransactionResponse r = new TransactionResponse();
        r.setId(t.getId());
        r.setAccountId(t.getAccount().getId());
        r.setAccountName(t.getAccount().getName());
        r.setName(t.getName());
        r.setDescription(t.getDescription());
        r.setAmount(t.getAmount());
        r.setTransactionType(t.getTransactionType());
        r.setCreatedDate(t.getCreatedDate());

        if (t.getTags() != null && !t.getTags().isEmpty()) {
            r.setTags(
                    t.getTags()
                            .stream()
                            .map(Tag::getTagName)
                            .collect(Collectors.toSet())
            );
        }

        return r;
    }

    public List<TransactionResponse> getAll(User user) {
        return transactionRepository.findByCreatedBy(user)
                .stream()
                .map(this::map)
                .toList();
    }

    public List<TransactionResponse> getByAccount(Long accountId, User user) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getCreatedBy().getUserId() != user.getUserId()) {
            throw new RuntimeException("Forbidden");
        }

        return transactionRepository.findByAccount(account)
                .stream()
                .map(this::map)
                .toList();
    }

    public TransactionResponse getOne(Long id, User user) {

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Ownership check
        if (tx.getCreatedBy().getUserId() != user.getUserId()) {
            throw new RuntimeException("Forbidden");
        }

        return map(tx);
    }


    public TransactionResponse update(Long id,
                                      CreateTransactionRequest req,
                                      User user) {

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Ownership check
        if (tx.getCreatedBy().getUserId() != user.getUserId()) {
            throw new RuntimeException("Forbidden");
        }

        // Account cannot be changed during update (important rule)
        if (!tx.getAccount().getId().equals(req.getAccountId())) {
            throw new RuntimeException("Changing account is not allowed");
        }

        tx.setName(req.getName());
        tx.setDescription(req.getDescription());
        tx.setAmount(req.getAmount());
        tx.setTransactionType(req.getTransactionType());

        // Update tags
        if (req.getTagIds() != null) {
            Set<Tag> tags = tagRepository.findAllById(req.getTagIds())
                    .stream()
                    .collect(Collectors.toSet());

            if (tags.size() != req.getTagIds().size()) {
                throw new RuntimeException("One or more tags are invalid");
            }

            tx.setTags(tags);
        }

        Transaction saved = transactionRepository.save(tx);
        return map(saved);
    }

    public void delete(Long id, User user) {

        Transaction tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        // Ownership check
        if (tx.getCreatedBy().getUserId() != user.getUserId()) {
            throw new RuntimeException("Forbidden");
        }

        transactionRepository.delete(tx);
    }



}
