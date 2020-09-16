import { BaseFilter } from '@repository/filters/base-filter';
import { getLogger } from '@utils/logger';
import { Repository } from 'typeorm';
import winston from 'winston';
import { BaseModel } from './models/base-model';

export abstract class BaseRepository<T extends BaseModel> {
  logger: winston.Logger;

  constructor(private repository: Repository<T>, private name: string) {
    const plural = name.endsWith('y')
      ? `${name.substring(0, name.length - 1)}ies`
      : `${name}s`;
    this.logger = getLogger(`repository:${plural}`);
    this.logger.debug(`Repository for ${plural} created`);
  }

  async list(filter?: BaseFilter): Promise<T[]> {
    return this.query(null, null);
  }

  protected async query(where: any, order: any): Promise<T[]> {
    return await this.repository.find({ where, order });
  }

  async get(id: string): Promise<T> {
    try {
      return await this.repository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      const message = `Error retrieving ${this.name}`;
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }

  async update(model: T): Promise<void> {
    try {
      await this.repository.update(model.id, model as any);
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
