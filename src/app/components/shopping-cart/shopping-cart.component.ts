import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShopState } from '../../states/shop.state';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  protected shopState = inject(ShopState);
  private router = inject(Router);
  return() {
    this.router.navigate(['']);
  }
  goToFinishBuy() {
    this.router.navigate(['buy']);
  }
}
