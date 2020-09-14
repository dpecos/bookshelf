import { Book } from './book';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.authorEntity)
  books: Book[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  modified: Date;
}
