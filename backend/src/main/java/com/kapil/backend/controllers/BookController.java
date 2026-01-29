package com.kapil.backend.controllers;

import com.kapil.backend.models.Book;
import com.kapil.backend.services.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public Book create(@RequestBody Book book) {
        return bookService.create(book);
    }

    @GetMapping
    public List<Book> getAll() {
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable Long id) {
        return bookService.getById(id);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book book) {
        return bookService.update(id, book);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookService.delete(id);
    }

    @GetMapping("/search")
    public List<Book> searchByName(@RequestParam String name) {
        return bookService.searchByName(name);
    }
}
