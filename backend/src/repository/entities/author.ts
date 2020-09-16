import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Book } from './book';

@Entity({ name: 'authors' })
export class Author extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
