import { Book } from '@repository/entities/book';
import { BookFilter } from '@repository/filters/books-filter';
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
      res.send(
        (await booksService.getBooks(req.query as BookFilter)).map((book) => {
          return {
            id: book.id,
            title: book.title,
            titleOV: book.titleOV,
            language: book.language,
            author: {
              id: book.author.id,
              name: book.author.name,
            },
            year: book.year,
            category: book.category,
            collection: book.collection,
            collectionNumber: book.collectionNumber,
            created: book.created,
            modified: book.modified,
          };
        })
      );
    })
  );

  router.get(
    '/detailed',
    asyncHandler(async (req: express.Request, res: express.Response) => {
      res.send(
        (await booksService.getBooks(req.query as BookFilter)).map((book) => {
          return {
            id: book.id,
            title: book.title,
            titleOV: book.titleOV,
            language: book.language,
            author: {
              id: book.author.id,
              name: book.author.name,
            },
            year: book.year,
            category: book.category,
            collection: book.collection,
            collectionNumber: book.collectionNumber,
            pages: book.pages,
            editorial: book.editorial,
            isbn: book.isbn,
            link: book.link,
            created: book.created,
            modified: book.modified,
          };
        })
      );
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
        res.status(404).send();
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
