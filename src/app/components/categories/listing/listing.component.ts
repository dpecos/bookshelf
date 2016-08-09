import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services';
import { Category } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'category-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.css'],
  providers: [CategoriesService]
})
export class ListingComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    return this.categoriesService.list()
      .map(record => new Category(record))
      .subscribe(
      category => this.categories.push(category),
      error => console.error(error)
      );
  }

}
