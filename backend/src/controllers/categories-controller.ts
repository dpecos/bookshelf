import { CategoriesService } from '@services/categories-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';

export function setupCategoriesAPI(
  categoriesService: CategoriesService
): express.Router {
  const logger = getLogger('controller:cateogries');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await categoriesService.getCategories());
    })
  );

  logger.info('API: Endpoints for categories activated');

  return router;
}
