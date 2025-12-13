import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShopStateService } from '../services/shop-state.service';

export const canBuyGuard: CanActivateFn = (route, state) => {
  const shopService = inject(ShopStateService);
  const router = inject(Router);
  const can = shopService.getSelectedProducts().length > 0;
  if (!can) {
    router.createUrlTree(['']);
  }
  return can;
};
