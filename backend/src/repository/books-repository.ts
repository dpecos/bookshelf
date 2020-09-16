import { BookFilter } from '@controllers/filters/books-filter';
import { getLogger } from '@utils/logger';
import { getRepository } from 'typeorm';
import winston from 'winston';
import { Book } from './models/book';

export class BooksRepository {
  logger: winston.Logger;

  constructor() {
    this.logger = getLogger('repository:books');
  }

  async retrieveBooks(filter: BookFilter): Promise<Book[]> {
    const booksRepository = getRepository(Book);

    let where: any = {};
    let order: any = { readingDates: 'DESC' };

    if (filter?.author) {
      where.author = { id: filter.author };
      order = { year: 'ASC' };
    }
    if (filter.category) {
      where.category = { id: filter.category };
      order = { title: 'ASC' };
    }
    if (filter.collection) {
      where.collection = { id: filter.collection };
      order = { collectionNumber: 'ASC', year: 'ASC' };
    }

    return await booksRepository.find({
      where,
      order,
    });
  }

  async retrieveBook(bookId: string): Promise<Book> {
    try {
      const booksRepository = getRepository(Book);
      return await booksRepository.findOneOrFail({ where: { id: bookId } });
    } catch (err) {
      const message = 'Error retrieving book';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async updateBook(book: Book): Promise<void> {
    try {
      const booksRepository = getRepository(Book);
      await booksRepository.update(book.id, book);
    } catch (err) {
      const message = 'Error updating book';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async createBook(book: Book): Promise<Book> {
    try {
      const booksRepository = getRepository(Book);
      delete book.id;
      return await booksRepository.save(book);
    } catch (err) {
      const message = 'Error creating book';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async deleteBook(bookId: string): Promise<void> {
    try {
      const booksRepository = getRepository(Book);
      await booksRepository.delete(bookId);
    } catch (err) {
      const message = 'Error deleting book';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
