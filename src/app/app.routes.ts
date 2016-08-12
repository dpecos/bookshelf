import { provideRouter, RouterConfig } from '@angular/router';
import { BookListingComponent, CategoryListingComponent, CollectionListingComponent } from './components';

const routes: RouterConfig = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListingComponent },
  { path: 'categories', component: CategoryListingComponent },
  { path: 'collections', component: CollectionListingComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
