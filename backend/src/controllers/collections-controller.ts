import { Collection } from '@repository/models/collection';
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

  router.get(
    '/:collectionId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await collectionsService.getCollection(req.params.collectionId));
    })
  );

  router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const collection = req.body as Collection;

      const newCollection = await collectionsService.createCollection(
        collection
      );

      res.send(newCollection);
    })
  );

  router.put(
    '/:collectionId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const collection = req.body as Collection;

      await collectionsService.updateCollection(collection);

      res.send(await collectionsService.getCollection(collection.id));
    })
  );

  router.delete(
    '/:collectionId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const collection = req.body as Collection;

      await collectionsService.deleteCollection(req.params.collectionId);

      res.send({});
    })
  );

  logger.info('API: Endpoints for collections activated');

  return router;
}
