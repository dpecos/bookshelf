import { CategoriesService } from '@services/categories-service';
import { CollectionsService } from '@services/collections-service';
import { getLogger } from '@utils/logger';
import bodyParser from 'body-parser';
import express from 'express';
import { setupCategoriesAPI } from './categories-controller';
import { setupCollectionsAPI } from './collections-controller';

export async function setupEndpoints(
  app: express.App,
  categoriesService: CategoriesService,
  collectionsService: CollectionsService
) {
  const logger = getLogger('controller');

  app.use(bodyParser.json());

  app.use('/api/categories', setupCategoriesAPI(categoriesService));
  app.use('/api/collections', setupCollectionsAPI(collectionsService));

  // app.use(errorHandler(logger));
}
