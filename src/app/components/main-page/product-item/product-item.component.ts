import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ClickActionDirective } from '../../../directives/click-action.directive';
import { ProductModel } from '../../../models/product-model';
import { GlobalMessageServiceService } from '../../../services/global-message-service.service';
import { ShopState } from '../../../states/shop.state';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [BadgeModule, ButtonModule, ClickActionDirective],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  private router = inject(Router);
  private shopState = inject(ShopState);
  private messageService = inject(GlobalMessageServiceService);
  product = input.required<ProductModel>();

  addToCart() {
    this.shopState.addProductToCart(this.product());
    this.messageService.setMessage('Producto añadido al carrito');
  }
  goToDetails() {
    this.router.navigate(['/details', this.product().id]);
  }
}
