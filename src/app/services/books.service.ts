import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Book } from '../models';

@Injectable()
export class BooksService {

  constructor(private http: Http) { }

  private extractBooks(res: Response): Observable<Book[]> {
    let body = res.json();
    return body || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }

  private retrieveBooks() {
    return this.http.get("http://apps.danielpecos.com/bookshelf/books.json")
      //.catch(this.handleError);

  }

  list() {
    return this.retrieveBooks()
      .flatMap(this.extractBooks);
  }

}
