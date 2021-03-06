import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Category } from './entities/category';

export class CategoriesRepository extends BaseRepository<Category> {
  constructor() {
    super(getRepository(Category), 'category');
  }

  async list(): Promise<Category[]> {
    return this.query(null, { name: 'ASC' });
  }
}
