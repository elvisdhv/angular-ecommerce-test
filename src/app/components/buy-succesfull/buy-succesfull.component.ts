import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../../models/product-model';
import { ShoppingCartItemComponent } from '../shopping-cart/shopping-cart-item/shopping-cart-item.component';

@Component({
  selector: 'app-buy-succesfull',
  standalone: true,
  imports: [ShoppingCartItemComponent],
  templateUrl: './buy-succesfull.component.html',
  styleUrl: './buy-succesfull.component.scss',
})
export class BuySuccesfullComponent implements OnInit {
  router = inject(Router);
  selectedProducts = signal<ProductModel[]>([]);

  total = signal(0);
  ngOnInit(): void {
    this.total.set(history.state.total || 0);
    this.selectedProducts.set(history.state.products);
  }
  backToShop() {
    this.router.navigate([''], { replaceUrl: true });
  }
}
