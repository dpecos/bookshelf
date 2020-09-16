import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base-model';
import { Book } from './book';

@Entity({ name: 'authors' })
export class Author extends BaseModel {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
