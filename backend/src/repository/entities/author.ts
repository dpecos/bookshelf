import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Book } from './book';

@Entity({ name: 'authors' })
export class Author extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  biography: string;

  @Column({ nullable: true })
  link: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
