import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShopState } from '../states/shop.state';

export const canBuyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const shopState = inject(ShopState);
  const can = shopState.selectedProducts().length > 0;
  if (!can) {
    router.createUrlTree(['']);
  }
  return can;
};
