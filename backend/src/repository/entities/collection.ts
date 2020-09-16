import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Book } from './book';

@Entity({ name: 'collections' })
export class Collection extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  description: string;
}
