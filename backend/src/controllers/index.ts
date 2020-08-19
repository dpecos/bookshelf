import { BooksService } from '@services/books-service';
import { CategoriesService } from '@services/categories-service';
import { CollectionsService } from '@services/collections-service';
import { getLogger } from '@utils/logger';
import bodyParser from 'body-parser';
import express from 'express';
import { setupBooksAPI } from './books-controller';
import { setupCategoriesAPI } from './categories-controller';
import { setupCollectionsAPI } from './collections-controller';
import { errorHandler } from './middleware/errors';

export async function setupEndpoints(
  app: express.App,
  categoriesService: CategoriesService,
  collectionsService: CollectionsService,
  booksService: BooksService
) {
  const logger = getLogger('controller');

  app.use(bodyParser.json());

  app.use('/api/categories', setupCategoriesAPI(categoriesService));
  app.use('/api/collections', setupCollectionsAPI(collectionsService));
  app.use('/api/books', setupBooksAPI(booksService));

  app.use(errorHandler());
}
