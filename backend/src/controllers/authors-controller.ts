import { Author } from '@repository/entities/author';
import { AuthorsService } from '@services/authors-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  convertBufferToDataURL,
  convertDataURLToBuffer,
} from '@utils/data-urls';

export function setupAuthorsAPI(
  authorsService: AuthorsService
): express.Router {
  const logger = getLogger('controller:authors');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(
        (await authorsService.getAuthors()).map((author) => {
          return {
            id: author.id,
            name: author.name,
            year: author.year,
            nationality: author.nationality,
            link: author.link,
            created: author.created,
            modified: author.modified,
          };
        })
      );
    })
  );

  router.get(
    '/:authorId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = await authorsService.getAuthor(req.params.authorId);

      let photo = convertBufferToDataURL(author.photo, 'image/jpeg');

      res.send({ ...author, photo });
    })
  );

  router.get(
    '/:authorId/photo',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      try {
        const cover = await authorsService.getAuthorPhoto(req.params.authorId);
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': cover.length,
        });
        res.end(cover);
      } catch (err) {
        res.status(404).send();
      }
    })
  );

  router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = req.body as Author;

      author.photo = convertDataURLToBuffer(req.body.photo);

      const newAuthor = await authorsService.createAuthor(author);

      res.send(newAuthor);
    })
  );

  router.put(
    '/:authorId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const author = req.body as Author;

      author.photo = convertDataURLToBuffer(req.body.photo);

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
