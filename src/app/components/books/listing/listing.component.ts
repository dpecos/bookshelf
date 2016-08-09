import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services';
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
  books: Book[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.getBooks();
  }

  private getBooks() {
    return this.booksService.list()
      .map(record => new Book(record))
      .subscribe(
      book => this.books.push(book),
      error => console.error(error)
      );
  }

}
