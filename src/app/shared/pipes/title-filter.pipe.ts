import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../../models';

@Pipe({
  name: 'titleFilter',
  pure: false
})
export class TitleFilterPipe implements PipeTransform {

  transform(books: Book[], title: string): any {
    if (books == null || title == null || title === '') {
      return books;
    }
    return books.filter((book) => book.title.toLowerCase().indexOf(title) >= 0);
  }

}
