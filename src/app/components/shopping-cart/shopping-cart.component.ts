import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShopStateService } from '../../services/shop-state.service';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  protected shopStateService = inject(ShopStateService);
  private router = inject(Router);
  return() {
    this.router.navigate(['']);
  }
  goToFinishBuy() {
    this.router.navigate(['buy']);
  }
}
