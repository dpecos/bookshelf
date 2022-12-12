import { Connection, createConnection, getConnection } from 'typeorm';
import winston from 'winston';
import { loadConfig } from '@utils/config';
import { getLogger } from '@utils/logger';
import { AuthorsRepository } from './authors-repository';
import { BooksRepository } from './books-repository';
import { CategoriesRepository } from './categories-repository';
import { CollectionsRepository } from './collections-repository';
import { Author } from './entities/author';
import { Book } from './entities/book';
import { Category } from './entities/category';
import { Collection } from './entities/collection';

export class Repository {
  logger: winston.Logger;

  books: BooksRepository;
  categories: CategoriesRepository;
  collections: CollectionsRepository;
  authors: AuthorsRepository;

  constructor() {
    this.logger = getLogger('repository:database');
  }

  async connect() {
    const config = loadConfig();
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: config.db.host,
        port: parseInt(config.db.port),
        username: config.db.username,
        password: config.db.password,
        database: config.db.database,
        entities: [Category, Collection, Book, Author],
        synchronize: true,
        logging: config.db.log,
        maxQueryExecutionTime: 1000,
        migrations: ['repository/migrations/*.ts'],
        poolErrorHandler: (err) => {
          this.logger.error(`Database error: ${err}`);
          process.exit(-1);
        },
      });

      await connection.runMigrations();

      this.logger.info(`Database initialized`);
    } catch (err) {
      this.logger.error(`Database initialization failed: ${err}`);
      err.handled = true;
      throw err;
    }

    this.books = new BooksRepository();
    this.categories = new CategoriesRepository();
    this.collections = new CollectionsRepository();
    this.authors = new AuthorsRepository();
  }

  async disconnect() {
    await getConnection().close();
    this.logger.warn('Database disconnected');
  }
}
