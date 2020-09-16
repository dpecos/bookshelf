import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Collection } from './entities/collection';

export class CollectionsRepository extends BaseRepository<Collection> {
  constructor() {
    super(getRepository(Collection), 'collection');
  }

  async list(): Promise<Collection[]> {
    return this.query(null, { name: 'ASC' });
  }
}
