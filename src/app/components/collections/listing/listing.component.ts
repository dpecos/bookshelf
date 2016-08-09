import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../../services';
import { Collection } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'Collection-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.css'],
  providers: [CollectionsService]
})
export class ListingComponent implements OnInit {
  Collections: Collection[] = [];

  constructor(private CollectionsService: CollectionsService) { }

  ngOnInit() {
    return this.CollectionsService.list()
      .map(record => new Collection(record))
      .subscribe(
      Collection => this.Collections.push(Collection),
      error => console.error(error)
      );
  }

}
