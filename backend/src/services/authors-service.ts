import { Author } from '@repository/models/author';
import { Repository } from '@repository/repository';
import { getLogger } from '@utils/logger';
import winston from 'winston';

export class AuthorsService {
  logger: winston.Logger;

  constructor(private repository: Repository) {
    this.logger = getLogger('service:authors');
  }

  async getAuthors(): Promise<Author[]> {
    return await this.repository.authors.retrieveAuthors();
  }

  async getAuthor(authorId: string): Promise<Author> {
    if (!authorId) {
      const msg = 'Author ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    return await this.repository.authors.retrieveAuthor(authorId);
  }

  async createAuthor(author: Author): Promise<Author> {
    const newAuthor = await this.repository.authors.createAuthor(author);
    this.logger.debug(`Author ${author.id} created successfully`);
    return newAuthor;
  }

  async updateAuthor(author: Author): Promise<void> {
    await this.repository.authors.updateAuthor(author);
    this.logger.debug(`Author ${author.id} updated successfully`);
  }

  async deleteAuthor(authorId: string): Promise<void> {
    await this.repository.authors.deleteAuthor(authorId);
    this.logger.debug(`Author ${authorId} deleted successfully`);
  }
}
