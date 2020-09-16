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
    return await this.repository.collections.list();
  }

  async getCollection(collectionId: string): Promise<Collection> {
    if (!collectionId) {
      const msg = 'Collection ID not specified';
      this.logger.error(msg);
      throw new Error(msg);
    }

    return await this.repository.collections.get(collectionId);
  }

  async createCollection(collection: Collection): Promise<Collection> {
    const newCollection = await this.repository.collections.create(collection);
    this.logger.debug(`Collection ${collection.id} created successfully`);
    return newCollection;
  }

  async updateCollection(collection: Collection): Promise<void> {
    await this.repository.collections.update(collection);
    this.logger.debug(`Collection ${collection.id} updated successfully`);
  }

  async deleteCollection(collectionId: string): Promise<void> {
    await this.repository.collections.delete(collectionId);
    this.logger.debug(`Collection ${collectionId} deleted successfully`);
  }
}
