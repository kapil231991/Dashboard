package com.kapil.backend.services;
import com.kapil.backend.models.Author;
import com.kapil.backend.repositery.AuthorRepositery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepositery authorRepository;

    public AuthorService(AuthorRepositery authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Author create(Author author) {


        if (author.getBooks() != null) {
            author.getBooks().forEach(book -> book.setAuthor(author));
        }

        return authorRepository.save(author);
    }

    public List<Author> getAll() {
        return authorRepository.findAll();
    }

    public Author getById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));
    }

    public Author update(Long id, Author updatedAuthor) {
        Author existing = getById(id);

        existing.setName(updatedAuthor.getName());
        existing.setEmail(updatedAuthor.getEmail());
        existing.setCountry(updatedAuthor.getCountry());

        return authorRepository.save(existing);
    }

    public void delete(Long id) {
        if (!authorRepository.existsById(id)) {
            throw new RuntimeException("Author not found");
        }
        authorRepository.deleteById(id);
    }
}
