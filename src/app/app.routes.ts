import { provideRouter, RouterConfig } from '@angular/router';
import { BookListingComponent, CategoryListingComponent } from './views';

const routes: RouterConfig = [
  { path: 'books', component: BookListingComponent },
  { path: 'categories', component: CategoryListingComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
