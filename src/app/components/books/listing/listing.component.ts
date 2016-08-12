import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BooksService, EventBusService } from '../../../services';
import { Book } from '../../../models';
import { TitleFilterPipe } from '../../../shared/pipes/title-filter.pipe';

@Component({
  moduleId: module.id,
  selector: 'book-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.css'],
  providers: [BooksService],
  pipes: [TitleFilterPipe]
})
export class ListingComponent implements OnInit {
  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  books: Observable<Book[]> = this.booksSubject.asObservable();
  query: string;

  constructor(private booksService: BooksService, private eventBus: EventBusService, route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getBooks();
    this.eventBus.listen('filter')
      .subscribe(queryEv => {
        this.query = queryEv.value;
      });
  }

  private getBooks() {
    this.booksService.list()
      .subscribe(book => this.booksSubject.getValue().push(book));
  }

}
