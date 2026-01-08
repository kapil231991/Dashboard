package com.kapil.backend.repositery;


import com.kapil.backend.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepositery extends JpaRepository<Book, Long> {
}
