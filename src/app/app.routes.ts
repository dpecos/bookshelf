import { provideRouter, RouterConfig } from '@angular/router';
import { ListingComponent } from './books'

const routes: RouterConfig = [
  { path: 'books', component: ListingComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
