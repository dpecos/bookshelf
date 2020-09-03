import { getLogger } from '@utils/logger';
import { Connection } from 'typeorm';
import winston from 'winston';
import { Collection } from './models/collection';

export class CollectionsRepository {
  logger: winston.Logger;

  constructor(private connection: Connection) {
    this.logger = getLogger('repository:collections');
  }

  async retrieveCollections(): Promise<Collection[]> {
    const collectionsRepository = this.connection.getRepository(Collection);
    return await collectionsRepository.find({ order: { name: 'ASC' } });
  }

  async retrieveCollection(collectionId: string): Promise<Collection> {
    try {
      const collectionsRepository = this.connection.getRepository(Collection);
      return await collectionsRepository.findOneOrFail({
        where: { id: collectionId },
      });
    } catch (err) {
      const message = 'Error retrieving collection';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async updateCollection(collection: Collection): Promise<void> {
    try {
      const collectionsRepository = this.connection.getRepository(Collection);
      await collectionsRepository.update(collection.id, collection);
    } catch (err) {
      const message = 'Error updating collection';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async createCollection(collection: Collection): Promise<Collection> {
    try {
      const collectionsRepository = this.connection.getRepository(Collection);
      delete collection.id;
      return await collectionsRepository.save(collection);
    } catch (err) {
      const message = 'Error creating collection';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async deleteCollection(collectionId: string): Promise<void> {
    try {
      const collectionsRepository = this.connection.getRepository(Collection);
      await collectionsRepository.delete(collectionId);
    } catch (err) {
      const message = 'Error deleting collection';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
