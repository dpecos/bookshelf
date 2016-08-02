import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from '../models';

@Injectable()
export class CategoriesService {

  constructor(private http: Http) { }

  private extractCategories(res: Response): Observable<Category[]> {
    let body = res.json();
    return body || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }

  private retrieveCategories() {
    return this.http.get("http://apps.danielpecos.com/bookshelf/categories.json")
      //.catch(this.handleError);

  }

  list() {
    return this.retrieveCategories()
      .flatMap(this.extractCategories);
  }

}
