package com.kapil.backend.repositery;


import com.kapil.backend.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepositery extends JpaRepository<Author, Long> {
}
