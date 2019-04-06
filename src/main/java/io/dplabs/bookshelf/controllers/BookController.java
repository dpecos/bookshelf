package io.dplabs.bookshelf.controllers;

import io.dplabs.bookshelf.models.Book;
import io.dplabs.bookshelf.models.Category;
import io.dplabs.bookshelf.models.Collection;
import io.dplabs.bookshelf.repositories.BooksRepository;
import io.dplabs.bookshelf.repositories.CategoriesRepository;
import io.dplabs.bookshelf.repositories.CollectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Controller()
public class BookController {

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private CategoriesRepository categoriesRepository;

    @Autowired
    private CollectionsRepository collectionsRepository;



    @GetMapping("/")
    public String root() {
        return "redirect:/books";
    }

    @GetMapping("/books")
    public String bookList(Model model) {
        var books = booksRepository.findAllByOrderByReadingDateDesc();
        model.addAttribute("books", books);
        return "book_list";
    }

    @GetMapping("/books/detailed")
    public String bookDetailedList(Model model) {
        Iterable<Book> books = booksRepository.findAllByOrderByReadingDateDesc();
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

    @GetMapping(value = "/book/{id}/edit")
    public String bookEdit(@PathVariable Long id, Model model) {
        Optional<Book> book = booksRepository.findById(id);
        Iterable<Category> categories = categoriesRepository.findAll();
        Iterable<Collection> collections = collectionsRepository.findAll();

        model.addAttribute("book", book.get());
        model.addAttribute("categories", categories);
        model.addAttribute("collections", collections);

        return "book_edit";
    }

    @PostMapping(value = "/book/{id}")
    public String bookUpdate(@PathVariable Long id, @ModelAttribute Book book, @RequestParam("book_cover") MultipartFile coverFile) throws Exception {
        if (id != book.getId()) {
            throw new Exception("Trying to edit a book with an incorrect endpoint");
        }

        if (!coverFile.isEmpty()) {
            byte[] bytes = coverFile.getBytes();
            book.setCover(bytes);
        } else {
            Optional<Book> originalBook = booksRepository.findById(id);
            if (originalBook.isPresent()) {
                book.setCover(originalBook.get().getCover());
            }
        }

        booksRepository.save(book);
        return "redirect:/book/" + id;
    }
}
