import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainPageComponent,
  },
  {
    path: 'cart',
    loadComponent: () => ShoppingCartComponent,
  },
];
