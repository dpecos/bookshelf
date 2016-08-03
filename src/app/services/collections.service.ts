import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Collection } from '../models';

@Injectable()
export class CollectionsService {

  constructor(private http: Http) { }

  private extractCollections(res: Response): Observable<Collection[]> {
    let body = res.json();
    return body || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }

  private retrieveCollections() {
    return this.http.get("http://apps.danielpecos.com/bookshelf/collections.json")
      //.catch(this.handleError);

  }

  list() {
    return this.retrieveCollections()
      .flatMap(this.extractCollections);
  }

}
