import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Collection } from './models/collection';

export class CollectionsRepository extends BaseRepository<Collection> {
  constructor() {
    super(getRepository(Collection), 'collection');
  }
}
