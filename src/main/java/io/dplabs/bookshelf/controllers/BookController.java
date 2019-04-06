package io.dplabs.bookshelf.controllers;

import io.dplabs.bookshelf.repositories.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BookController {

    @Autowired
    private BooksRepository booksRepository;

    @GetMapping("/")
    public String bookIndex(Model model) {
        var books = booksRepository.findAll();
        model.addAttribute("books", books);
        return "book_list";
    }
}
