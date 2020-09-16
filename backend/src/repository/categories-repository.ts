import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Category } from './models/category';

export class CategoriesRepository extends BaseRepository<Category> {
  constructor() {
    super(getRepository(Category), 'category');
  }
}
