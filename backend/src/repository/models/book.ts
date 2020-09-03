import { Category } from './category';
import { Collection } from './collection';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  titleOV: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  languageOV: string;

  @Column()
  author: string;

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
  collectionNumber: number;

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

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  modified: Date;
}
