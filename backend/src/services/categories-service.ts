import { Category } from '@repository/models/category';
import { Repository } from '@repository/repository';
import { getLogger } from '@utils/logger';
import winston from 'winston';

export class CategoriesService {
  logger: winston.Logger;

  constructor(private repository: Repository) {
    this.logger = getLogger('service:categories');
  }

  async getCategories(): Promise<Category[]> {
    return await this.repository.categories.list();
  }

  async getCategory(categoryId: string): Promise<Category> {
    if (!categoryId) {
      const msg = 'Category ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    return await this.repository.categories.get(categoryId);
  }

  async createCategory(category: Category): Promise<Category> {
    const newCategory = await this.repository.categories.create(category);
    this.logger.debug(`Category ${category.id} created successfully`);
    return newCategory;
  }

  async updateCategory(category: Category): Promise<void> {
    await this.repository.categories.update(category);
    this.logger.debug(`Category ${category.id} updated successfully`);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.repository.categories.delete(categoryId);
    this.logger.debug(`Category ${categoryId} deleted successfully`);
  }
}
