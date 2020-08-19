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
        category: book.category,
        collection: book.collection,
        created: book.created,
        modified: book.modified,
      };
    });
  }
}
