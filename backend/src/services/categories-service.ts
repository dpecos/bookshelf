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
    return await this.repository.retrieveCategories();
  }
}
