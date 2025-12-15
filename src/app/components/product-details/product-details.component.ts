import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product-model';
import { GlobalMessageServiceService } from '../../services/global-message-service.service';
import { ShopStateService } from '../../services/shop-state.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  messageService = inject(GlobalMessageServiceService);
  activatedRoute = inject(ActivatedRoute);
  shopService = inject(ShopStateService);
  router = inject(Router);
  product = signal<ProductModel | null>(null);
  constructor() {
    effect(() => {
      if (this.product() == null) {
        this.router.navigate([''], { replaceUrl: true });
      }
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((pm) => {
      const id = parseInt(pm.get('id') || '-1');
      this.product.set(this.shopService.getProductById(id));
    });
  }
  addToCart() {
    if (this.product() != null) {
      this.shopService.addProductToCart(this.product()!);
      this.messageService.setMessage('Producto añadido al carrito');
    }
  }
}
