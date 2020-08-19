import { loadConfig } from '@utils/config';
import { getLogger } from '@utils/logger';
import { Connection, createConnection } from 'typeorm';
import winston from 'winston';
import { Book } from './models/book';
import { Category } from './models/category';
import { Collection } from './models/collection';

export class Repository {
  connection: Connection;
  logger: winston.Logger;

  constructor() {
    this.logger = getLogger('repository');
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
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.close();
      this.logger.warn('Database disconnected');
    }
  }

  // async saveTester(tester: Tester): Promise<Tester> {
  //   const testerRepository = this.connection.getRepository(Tester);

  //   return await testerRepository.save(tester);
  // }

  // async retrieveTesterProfile(
  //   app: string,
  //   platformId: string
  // ): Promise<Tester> {
  //   const testerRepository = this.connection.getRepository(Tester);

  //   return await testerRepository.findOne({ app, platformId });
  // }

  async retrieveCategories(): Promise<Category[]> {
    const categoriesRepository = this.connection.getRepository(Category);
    return await categoriesRepository.find();
  }

  async retrieveCollections(): Promise<Collection[]> {
    const collectionsRepository = this.connection.getRepository(Collection);
    return await collectionsRepository.find();
  }

  async retrieveBooks(): Promise<Book[]> {
    const booksRepository = this.connection.getRepository(Book);
    return await booksRepository.find();
  }

  async retrieveBook(bookId: string): Promise<Book> {
    try {
      const booksRepository = this.connection.getRepository(Book);
      return await booksRepository.findOneOrFail({ where: { id: bookId } });
    } catch (err) {
      const message = 'Error retrieving book';
      this.logger.error(`${message}: ${err}`);
      throw new Error(message);
    }
  }
}
