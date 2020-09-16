import { Author } from '@repository/entities/author';
import { AuthorsService } from '@services/authors-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';

export function setupAuthorsAPI(
  authorsService: AuthorsService
): express.Router {
  const logger = getLogger('controller:authors');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await authorsService.getAuthors());
    })
  );

  router.get(
    '/:authorId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await authorsService.getAuthor(req.params.authorId));
    })
  );

  router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = req.body as Author;

      const newAuthor = await authorsService.createAuthor(author);

      res.send(newAuthor);
    })
  );

  router.put(
    '/:authorId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = req.body as Author;

      await authorsService.updateAuthor(author);

      res.send(await authorsService.getAuthor(author.id));
    })
  );

  router.delete(
    '/:authorId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = req.body as Author;

      await authorsService.deleteAuthor(req.params.authorId);

      res.send({});
    })
  );

  logger.info('API: Endpoints for authors activated');

  return router;
}
