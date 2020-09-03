import { BookFilter } from '@controllers/filters/books-filter';
import { Book } from '@repository/models/book';
import { Repository } from '@repository/repository';
import { getLogger } from '@utils/logger';
import winston from 'winston';

export class BooksService {
  logger: winston.Logger;

  constructor(private repository: Repository) {
    this.logger = getLogger('service:books');
  }

  async getBooks(filter: BookFilter): Promise<any> {
    const books = await this.repository.books.retrieveBooks(filter);
    return books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        titleOV: book.titleOV,
        language: book.language,
        author: book.author,
        year: book.year,
        category: book.category,
        collection: book.collection,
        collectionNumber: book.collectionNumber,
        created: book.created,
        modified: book.modified,
      };
    });
  }

  async getDetailedBooks(filter: BookFilter): Promise<any> {
    const books = await this.repository.books.retrieveBooks(filter);
    return books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        titleOV: book.titleOV,
        language: book.language,
        author: book.author,
        year: book.year,
        category: book.category,
        collection: book.collection,
        collectionNumber: book.collectionNumber,
        pages: book.pages,
        editorial: book.editorial,
        isbn: book.isbn,
        url: book.url,
        created: book.created,
        modified: book.modified,
      };
    });
  }

  async getBook(bookId: string): Promise<Book> {
    if (!bookId) {
      const msg = 'Book ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    const book = await this.repository.books.retrieveBook(bookId);
    return book;
  }

  async getBookCover(bookId: string): Promise<Buffer> {
    if (!bookId) {
      const msg = 'Book ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    const book = await this.repository.books.retrieveBook(bookId);
    return book.cover;
  }

  async updateBook(book: Book): Promise<void> {
    await this.repository.books.updateBook(book);
    this.logger.debug(`Book ${book.id} updated successfully`);
  }

  async createBook(book: Book): Promise<Book> {
    const newBook = await this.repository.books.createBook(book);
    this.logger.debug(`Book ${book.id} created successfully`);
    return newBook;
  }

  async deleteBook(bookId: string): Promise<void> {
    await this.repository.books.deleteBook(bookId);
    this.logger.debug(`Book ${bookId} deleted successfully`);
  }
}
