import { CategoriesService } from '@services/categories-service';
import { CollectionsService } from '@services/collections-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';

export function setupCollectionsAPI(
  collectionsService: CollectionsService
): express.Router {
  const logger = getLogger('controller:collections');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await collectionsService.getCollections());
    })
  );

  logger.info('API: Endpoints for collections activated');

  return router;
}
