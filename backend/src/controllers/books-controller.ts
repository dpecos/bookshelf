import { BooksService } from '@services/books-service';
import { CategoriesService } from '@services/categories-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';

export function setupBooksAPI(booksService: BooksService): express.Router {
  const logger = getLogger('controller:books');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await booksService.getBooks());
    })
  );

  logger.info('API: Endpoints for books activated');

  return router;
}
