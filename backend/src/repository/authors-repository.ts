import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Author } from './models/author';

export class AuthorsRepository extends BaseRepository<Author> {
  constructor() {
    super(getRepository(Author), 'author');
  }

  async list(): Promise<Author[]> {
    return this.query(null, { name: 'ASC' });
  }
}
