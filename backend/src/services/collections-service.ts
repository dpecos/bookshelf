import { Category } from '@repository/models/category';
import { Collection } from '@repository/models/collection';
import { Repository } from '@repository/repository';
import { getLogger } from '@utils/logger';
import winston from 'winston';

export class CollectionsService {
  logger: winston.Logger;

  constructor(private repository: Repository) {
    this.logger = getLogger('service:collections');
  }

  async getCollections(): Promise<Collection[]> {
    return await this.repository.retrieveCollections();
  }
}
