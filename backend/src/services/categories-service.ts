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
    return await this.repository.categories.retrieveCategories();
  }

  async getCategory(categoryId: string): Promise<Category> {
    if (!categoryId) {
      const msg = 'Category ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    return await this.repository.categories.retrieveCategory(categoryId);
  }

  async createCategory(category: Category): Promise<Category> {
    const newCategory = await this.repository.categories.createCategory(
      category
    );
    this.logger.debug(`Category ${category.id} created successfully`);
    return newCategory;
  }

  async updateCategory(category: Category): Promise<void> {
    await this.repository.categories.updateCategory(category);
    this.logger.debug(`Category ${category.id} updated successfully`);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.repository.categories.deleteCategory(categoryId);
    this.logger.debug(`Category ${categoryId} deleted successfully`);
  }
}
