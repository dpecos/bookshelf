import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => Author, (author) => author.books, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinTable({
    name: "book_authors", joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id'
    }, inverseJoinColumn: {
      name: 'authorId',
      referencedColumnName: 'id'
    }
  })
  authors: Author[];

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
  link: string;

  @Column({ nullable: true })
  abstract: string;

  @Column({ type: String, array: true })
  readingDates: string[];

  @Column({ type: 'bytea', nullable: true })
  cover: Buffer;

  @Column({ nullable: true })
  rating: number;

  @Column({ default: 'FINISHED', nullable: false, type: 'enum', enum: ['FINISHED', 'READING', 'WISHLIST', 'ABANDONED'] })
  status: 'FINISHED' | 'READING' | 'WISHLIST' | 'ABANDONED';
}
