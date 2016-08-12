import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Book } from '../models';

@Injectable()
export class BooksService {

  constructor(private http: Http) { }

  list() {
    return this.http.get("http://apps.danielpecos.com/bookshelf/books.json")
      .flatMap((data) => data.json())
      .map(record => new Book(record));
  }

}
