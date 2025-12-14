import { Routes } from '@angular/router';
import { BuySuccesfullComponent } from './components/buy-succesfull/buy-succesfull.component';
import { BuyComponent } from './components/buy/buy.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { canBuyGuard } from './guards/can-buy.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => MainPageComponent,
  },
  {
    path: 'cart',
    canActivate: [canBuyGuard],
    loadComponent: () => ShoppingCartComponent,
  },
  { path: 'buy', canActivate: [canBuyGuard], loadComponent: () => BuyComponent },
  { path: 'buy-succesfull', loadComponent: () => BuySuccesfullComponent },
  {
    path: 'details/:id',
    loadComponent: () => ProductDetailsComponent,
  },
];
