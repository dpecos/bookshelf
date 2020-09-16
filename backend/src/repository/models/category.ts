import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base-model';
import { Book } from './book';

@Entity({ name: 'categories' })
export class Category extends BaseModel {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
