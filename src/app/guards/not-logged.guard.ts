import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShopState } from '../states/shop.state';

export const notLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const shopState = inject(ShopState);
  const isLogged = shopState.username().length > 0;
  if (!isLogged) {
    router.navigate(['login'], { replaceUrl: true });
  }
  return isLogged;
};
