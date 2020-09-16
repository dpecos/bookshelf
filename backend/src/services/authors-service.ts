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
    return await this.repository.authors.list();
  }

  async getAuthor(authorId: string): Promise<Author> {
    if (!authorId) {
      const msg = 'Author ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    return await this.repository.authors.get(authorId);
  }

  async createAuthor(author: Author): Promise<Author> {
    const newAuthor = await this.repository.authors.create(author);
    this.logger.debug(`Author ${author.id} created successfully`);
    return newAuthor;
  }

  async updateAuthor(author: Author): Promise<void> {
    await this.repository.authors.update(author);
    this.logger.debug(`Author ${author.id} updated successfully`);
  }

  async deleteAuthor(authorId: string): Promise<void> {
    await this.repository.authors.delete(authorId);
    this.logger.debug(`Author ${authorId} deleted successfully`);
  }
}
