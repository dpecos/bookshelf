import { getLogger } from '@utils/logger';
import { getRepository } from 'typeorm';
import winston from 'winston';
import { Author } from './models/author';

export class AuthorsRepository {
  logger: winston.Logger;

  constructor() {
    this.logger = getLogger('repository:authors');
  }

  async retrieveAuthors(): Promise<Author[]> {
    const authorsRepository = getRepository(Author);
    return await authorsRepository.find({ order: { name: 'ASC' } });
  }

  async retrieveAuthor(authorId: string): Promise<Author> {
    try {
      const authorsRepository = getRepository(Author);
      return await authorsRepository.findOneOrFail({
        where: { id: authorId },
      });
    } catch (err) {
      const message = 'Error retrieving author';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async updateAuthor(author: Author): Promise<void> {
    try {
      const authorsRepository = getRepository(Author);
      await authorsRepository.update(author.id, author);
    } catch (err) {
      const message = 'Error updating author';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async createAuthor(author: Author): Promise<Author> {
    try {
      const authorsRepository = getRepository(Author);
      delete author.id;
      return await authorsRepository.save(author);
    } catch (err) {
      const message = 'Error creating author';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async deleteAuthor(authorId: string): Promise<void> {
    try {
      const authorsRepository = getRepository(Author);
      await authorsRepository.delete(authorId);
    } catch (err) {
      const message = 'Error deleting author';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
