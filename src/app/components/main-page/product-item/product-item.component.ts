import { Component, inject, input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ProductModel } from '../../../models/product-model';
import { ShopStateService } from '../../../services/shop-state.service';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [BadgeModule, ButtonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  shopStateService = inject(ShopStateService);
  product = input.required<ProductModel>();
  addToCart() {
    this.shopStateService.addProductToCart(this.product());
  }
}
