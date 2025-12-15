import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShopStateService } from '../services/shop-state.service';

export const notLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const shopService = inject(ShopStateService);
  const isLogged = shopService.getUsername().length > 0;
  if (!isLogged) {
    router.navigate(['login'], { replaceUrl: true });
  }
  return isLogged;
};
