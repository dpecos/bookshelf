import { BaseFilter } from '@repository/filters/base-filter';
import { getLogger } from '@utils/logger';
import { Repository } from 'typeorm';
import winston from 'winston';
import { BaseEntity } from './entities/base-entity';

export abstract class BaseRepository<T extends BaseEntity> {
  logger: winston.Logger;
  plural: string;

  constructor(protected repository: Repository<T>, private name: string) {
    this.plural = name.endsWith('y')
      ? `${name.substring(0, name.length - 1)}ies`
      : `${name}s`;
    this.logger = getLogger(`repository:${this.plural}`);
    this.logger.debug(`Repository for ${this.plural} created`);
  }

  async list(filter?: BaseFilter): Promise<T[]> {
    return this.query(null, null);
  }

  protected async query(where: any, order: any): Promise<T[]> {
    try {
      const filter = {};
      if (where) {
        filter['where'] = where;
      }
      if (order) {
        filter['order'] = order;
      }
      return await this.repository.find(filter);
    } catch (err) {
      const message = `Error querying ${this.plural}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async get(id: string): Promise<T> {
    try {
      return await this.repository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      const message = `Error fetching ${this.name}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async update(model: T): Promise<void> {
    try {
      await this.repository.save(model as any)
    } catch (err) {
      const message = `Error updating ${this.name}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async create(model: T): Promise<T> {
    try {
      delete model.id;
      return await this.repository.save(model as any);
    } catch (err) {
      const message = `Error creating ${this.name}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (err) {
      const message = `Error deleting ${this.name}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
