import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './base-model';
import { Book } from './book';

@Entity({ name: 'collections' })
export class Collection extends BaseModel {
  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  description: string;
}
