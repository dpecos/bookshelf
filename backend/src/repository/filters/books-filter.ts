import { BaseFilter } from './base-filter';

export class BookFilter extends BaseFilter {
  author: string;
  category: string;
  collection: string;
}
