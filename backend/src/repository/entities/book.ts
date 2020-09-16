import { Column, Entity, ManyToOne } from 'typeorm';
import { Author } from './author';
import { BaseEntity } from './base-entity';
import { Category } from './category';
import { Collection } from './collection';

@Entity({ name: 'books' })
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  titleOV: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  languageOV: string;

  @ManyToOne(() => Author, (author) => author.books, {
    cascade: false,
    nullable: false,
    eager: true,
  })
  author: Author;

  @ManyToOne(() => Category, (category) => category.books, {
    cascade: false,
    nullable: false,
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Collection, (collection) => collection.books, {
    cascade: false,
    eager: true,
  })
  collection: Collection;

  @Column({ nullable: true })
  collectionNumber: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  pages: number;

  @Column({ nullable: true })
  editorial: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  abstract: string;

  @Column({ type: String, array: true })
  readingDates: string[];

  @Column({ type: 'bytea', nullable: true })
  cover: Buffer;
}
