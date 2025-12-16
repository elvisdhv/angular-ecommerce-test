import { Component, inject, input } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ShopState } from '../../../states/shop.state';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart-item.component.html',
  styleUrl: './shopping-cart-item.component.scss',
})
export class ShoppingCartItemComponent {
  product = input.required<ProductModel>();
  deleteButton = input(true);
  protected shopState = inject(ShopState);
}
