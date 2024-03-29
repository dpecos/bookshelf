import { BookFilter } from '@repository/filters/books-filter';
import { getRepository } from 'typeorm';
import { BaseRepository } from './base-repository';
import { Book } from './entities/book';

export class BooksRepository extends BaseRepository<Book> {
  constructor() {
    super(getRepository(Book), 'book');
  }

  async list(filter: BookFilter): Promise<Book[]> {
    let where: any = {};
    let order: any = { readingDates: 'DESC' };

    if (filter?.author) {
      const books = await this.repository
        .createQueryBuilder('books')
        .innerJoinAndSelect('books.authors', 'author')
        .where('author.id = :id', { id: filter.author })
        .orderBy('books.year', 'ASC')
        .getMany()

      return this.repository.findByIds(books.map(b => b.id))
    } else {
      if (filter.category) {
        where.category = { id: filter.category };
        order = { title: 'ASC' };
      }
      if (filter.collection) {
        where.collection = { id: filter.collection };
        order = { collectionNumber: 'ASC', year: 'ASC' };
      }

      return this.query(where, order);
    }
  }
}
