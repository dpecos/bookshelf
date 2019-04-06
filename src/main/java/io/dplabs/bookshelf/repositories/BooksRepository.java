package io.dplabs.bookshelf.repositories;

import io.dplabs.bookshelf.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends CrudRepository<Book, Long> {
    List<Book> findAllByOrderByReadingDateDesc();
}
