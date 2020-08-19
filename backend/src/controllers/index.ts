import { CategoriesService } from '@services/categories-service';
import { getLogger } from '@utils/logger';
import bodyParser from 'body-parser';
import express from 'express';
import winston from 'winston';
import { setupCategoriesAPI } from './categories-controller';

export async function setupEndpoints(
  app: express.App,
  categoriesService: CategoriesService
) {
  const logger = getLogger('controller');

  app.use(bodyParser.json());

  app.use('/api/categories', setupCategoriesAPI(categoriesService));

  // app.use(errorHandler(logger));
}
