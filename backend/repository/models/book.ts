import { Category } from './category';
import { Collection } from './collection';

export class Book {
  title: string;
  title_vo: string;
  language: string;
  language_vo: string;
  author: string;
  category: Category;
  collection: Collection;
  year: number;
  pages: number;
  editorial: string;
  isbn: string;
  url: string;
  abstract: string;
  read: string[];
}
