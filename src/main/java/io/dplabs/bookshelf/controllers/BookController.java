package io.dplabs.bookshelf.controllers;

import io.dplabs.bookshelf.models.Book;
import io.dplabs.bookshelf.repositories.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Controller()
public class BookController {

    @Autowired
    private BooksRepository booksRepository;

    @GetMapping("/")
    public String bookList(Model model) {
        var books = booksRepository.findAllByOrderByReadingDateDesc();
        model.addAttribute("books", books);
        return "book_list";
    }

    @GetMapping("/detailed")
    public String bookDetailedList(Model model) {
        var books = booksRepository.findAllByOrderByReadingDateDesc();
        model.addAttribute("books", books);
        return "book_detailed_list";
    }

    @GetMapping(value = "/book/{id}/cover")
    public ResponseEntity<Resource> bookCover(@PathVariable Long id) {

        Optional<Book> book = booksRepository.findById(id);

        if (book.isPresent()) {
            return ResponseEntity.ok().body(new ByteArrayResource(book.get().getCover()));
        }
        return null;
    }

    @GetMapping(value = "/book/{id}")
    public String bookDetails(@PathVariable Long id, Model model) {
        Optional<Book> book = booksRepository.findById(id);
        model.addAttribute("book", book.get());
        return "book_details";
    }
}
