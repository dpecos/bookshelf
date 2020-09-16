import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Book } from './book';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
