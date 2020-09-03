import { loadConfig } from '@utils/config';
import { getLogger } from '@utils/logger';
import { Connection, createConnection } from 'typeorm';
import winston from 'winston';
import { BooksRepository } from './books-repository';
import { CategoriesRepository } from './categories-repository';
import { CollectionsRepository } from './collections-repository';
import { Book } from './models/book';
import { Category } from './models/category';
import { Collection } from './models/collection';

export class Repository {
  connection: Connection;
  logger: winston.Logger;

  books: BooksRepository;
  categories: CategoriesRepository;
  collections: CollectionsRepository;

  constructor() {
    this.logger = getLogger('repository:database');
  }

  async connect() {
    const config = loadConfig();
    try {
      this.connection = await createConnection({
        type: 'postgres',
        host: config.db.host,
        port: parseInt(config.db.port),
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        entities: [Category, Collection, Book],
        synchronize: true,
        logging: config.db.log,
        maxQueryExecutionTime: 1000,
        migrations: ['repository/migrations/*.ts'],
        poolErrorHandler: (err) => {
          this.logger.error(`Database error: ${err}`);
          process.exit(-1);
        },
      });

      await this.connection.runMigrations();

      this.logger.info(`Database initialized`);
    } catch (err) {
      this.logger.error(`Database initialization failed: ${err}`);
      err.handled = true;
      throw err;
    }

    this.books = new BooksRepository(this.connection);
    this.categories = new CategoriesRepository(this.connection);
    this.collections = new CollectionsRepository(this.connection);
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.close();
      this.logger.warn('Database disconnected');
    }
  }
}
