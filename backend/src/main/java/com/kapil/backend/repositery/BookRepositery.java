package com.kapil.backend.repositery;


import com.kapil.backend.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepositery extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

}
