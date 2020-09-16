import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Author } from './entities/author';

export class AuthorsRepository extends BaseRepository<Author> {
  constructor() {
    super(getRepository(Author), 'author');
  }

  async list(): Promise<Author[]> {
    return this.query(null, { name: 'ASC' });
  }
}
