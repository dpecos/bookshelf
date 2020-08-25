import { Book } from '@repository/models/book';
import { BooksService } from '@services/books-service';
import { getLogger } from '@utils/logger';
import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  convertBufferToDataURL,
  convertDataURLToBuffer,
} from '@utils/data-urls';

export function setupBooksAPI(booksService: BooksService): express.Router {
  const logger = getLogger('controller:books');

  const router = new express.Router();

  router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(await booksService.getBooks());
    })
  );

  router.get(
    '/:bookId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      try {
        const book = await booksService.getBook(req.params.bookId);

        let cover = convertBufferToDataURL(book.cover, 'image/jpeg');

        res.send({ ...book, cover });
      } catch (err) {
        res.status(404);
      }
    })
  );

  router.get(
    '/:bookId/cover',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      try {
        const cover = await booksService.getBookCover(req.params.bookId);
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

  router.put(
    '/:bookId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const book = req.body as Book;

      book.cover = convertDataURLToBuffer(req.body.cover);

      await booksService.updateBook(book);

      res.send(await booksService.getBook(book.id));
    })
  );

  router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      const book = req.body as Book;

      book.cover = convertDataURLToBuffer(req.body.cover);

      const newBook = await booksService.createBook(book);

      res.send(newBook);
    })
  );

  router.delete(
    '/:bookId',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      await booksService.deleteBook(req.params.bookId);

      res.send({});
    })
  );

  logger.info('API: Endpoints for books activated');

  return router;
}
