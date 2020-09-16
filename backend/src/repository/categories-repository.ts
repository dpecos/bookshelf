import { getLogger } from '@utils/logger';
import { getRepository } from 'typeorm';
import winston from 'winston';
import { Category } from './models/category';

export class CategoriesRepository {
  logger: winston.Logger;

  constructor() {
    this.logger = getLogger('repository:categories');
  }

  async retrieveCategories(): Promise<Category[]> {
    const categoriesRepository = getRepository(Category);
    return await categoriesRepository.find({ order: { name: 'ASC' } });
  }

  async retrieveCategory(categoryId: string): Promise<Category> {
    try {
      const categoriesRepository = getRepository(Category);
      return await categoriesRepository.findOneOrFail({
        where: { id: categoryId },
      });
    } catch (err) {
      const message = 'Error retrieving category';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async updateCategory(category: Category): Promise<void> {
    try {
      const categoriesRepository = getRepository(Category);
      await categoriesRepository.update(category.id, category);
    } catch (err) {
      const message = 'Error updating category';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async createCategory(category: Category): Promise<Category> {
    try {
      const categoriesRepository = getRepository(Category);
      delete category.id;
      return await categoriesRepository.save(category);
    } catch (err) {
      const message = 'Error creating category';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      const categoriesRepository = getRepository(Category);
      await categoriesRepository.delete(categoryId);
    } catch (err) {
      const message = 'Error deleting category';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
