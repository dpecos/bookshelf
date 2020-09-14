import { setupCORS } from '@controllers/middleware/cors';
import { Repository } from '@repository/repository';
import { AuthorsService } from '@services/authors-service';
import { BooksService } from '@services/books-service';
import { CategoriesService } from '@services/categories-service';
import { CollectionsService } from '@services/collections-service';
import { loadConfig } from '@utils/config';
import { getLogger } from '@utils/logger';
import express from 'express';
import http from 'http';
import { setupEndpoints } from './controllers';

export async function startServer(port?: number): Promise<http.Server> {
  const logger = getLogger();

  try {
    const config = loadConfig();

    const app = express();

    logger.info('--- bookshelf ---');

    setupCORS(app);

    let repository: Repository = null;
    if (config.db) {
      repository = new Repository();
      await repository.connect();
    }

    const authorsService = new AuthorsService(repository);
    const categoriesService = new CategoriesService(repository);
    const collectionsService = new CollectionsService(repository);
    const booksService = new BooksService(repository);

    await setupEndpoints(
      app,
      authorsService,
      categoriesService,
      collectionsService,
      booksService
    );

    const server = http.createServer(app);

    await server.listen(port || parseInt(config.web.port));

    logger.info(`*** bookshelf listening on port ${config.web.port} ***`);

    server.on('close', () => {
      repository.disconnect();
    });

    return server;
  } catch (err) {
    if (!err.handled) {
      logger.error(`Uncaught error: ${err}`);
      console.error(err);
    }
  }
}

const parent = module.parent;
const parentFilename = (parent && parent.filename) || '';
const IS_TEST = parentFilename.endsWith('.test.ts');

if (!IS_TEST) {
  (async () => {
    await startServer();
  })();
}
