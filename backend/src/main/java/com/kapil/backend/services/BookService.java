package com.kapil.backend.services;

import com.kapil.backend.models.Book;
import com.kapil.backend.repositery.BookRepositery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepositery bookRepository;

    public BookService(BookRepositery bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book create(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book getById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book update(Long id, Book updatedBook) {
        Book existing = getById(id);

        existing.setTitle(updatedBook.getTitle());
        existing.setIsbn(updatedBook.getIsbn());
        existing.setPublisher(updatedBook.getPublisher());
        existing.setPublishedYear(updatedBook.getPublishedYear());

        return bookRepository.save(existing);
    }

    public void delete(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(id);
    }

    public List<Book> searchByName(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
}
