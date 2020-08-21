import { Book } from '@repository/models/book';
import { Repository } from '@repository/repository';
import { getLogger } from '@utils/logger';
import winston from 'winston';

export class BooksService {
  logger: winston.Logger;

  constructor(private repository: Repository) {
    this.logger = getLogger('service:books');
  }

  async getBooks(): Promise<any> {
    const books = await this.repository.retrieveBooks();
    return books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        year: book.year,
        category: book.category,
        collection: book.collection,
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

    const book = await this.repository.retrieveBook(bookId);
    delete book.cover;
    return book;
  }

  async getBookCover(bookId: string): Promise<Buffer> {
    if (!bookId) {
      const msg = 'Book ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    const book = await this.repository.retrieveBook(bookId);
    return book.cover;
  }

  async updateBook(book: Book): Promise<void> {
    await this.repository.updateBook(book);
  }
}
