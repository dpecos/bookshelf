import { AuthorsService } from '@services/authors-service';
import { BooksService } from '@services/books-service';
import { CategoriesService } from '@services/categories-service';
import { CollectionsService } from '@services/collections-service';
import { getLogger } from '@utils/logger';
import bodyParser from 'body-parser';
import express from 'express';
import { setupAuthorsAPI } from './authors-controller';
import { setupBooksAPI } from './books-controller';
import { setupCategoriesAPI } from './categories-controller';
import { setupCollectionsAPI } from './collections-controller';
import { errorHandler } from './middleware/errors';

export async function setupEndpoints(
  app: express.App,
  authorsService: AuthorsService,
  categoriesService: CategoriesService,
  collectionsService: CollectionsService,
  booksService: BooksService
) {
  const logger = getLogger('controller');

  app.use(bodyParser.json({ limit: '20mb' }));

  app.use('/api/authors', setupAuthorsAPI(authorsService));
  app.use('/api/categories', setupCategoriesAPI(categoriesService));
  app.use('/api/collections', setupCollectionsAPI(collectionsService));
  app.use('/api/books', setupBooksAPI(booksService));

  app.use(errorHandler());
}
