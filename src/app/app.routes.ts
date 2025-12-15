import { Routes } from '@angular/router';
import { BuySuccesfullComponent } from './components/buy-succesfull/buy-succesfull.component';
import { BuyComponent } from './components/buy/buy.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { canBuyGuard } from './guards/can-buy.guard';
import { notLoggedGuard } from './guards/not-logged.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainPageComponent,
    canActivate: [notLoggedGuard],
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent,
  },
  {
    path: 'cart',
    canActivate: [canBuyGuard, notLoggedGuard],
    loadComponent: () => ShoppingCartComponent,
  },
  { path: 'buy', canActivate: [canBuyGuard, notLoggedGuard], loadComponent: () => BuyComponent },
  {
    path: 'buy-succesfull',
    canActivate: [notLoggedGuard],
    loadComponent: () => BuySuccesfullComponent,
  },
  {
    path: 'details/:id',
    canActivate: [notLoggedGuard],
    loadComponent: () => ProductDetailsComponent,
  },
];
