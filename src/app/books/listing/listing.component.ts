import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services';
import { Book } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'app-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.css'],
  providers: [BooksService]
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
