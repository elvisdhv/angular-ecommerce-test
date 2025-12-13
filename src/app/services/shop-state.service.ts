import { computed, Injectable, signal } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ShopStateService {
  private selectedProducts = signal<ProductModel[]>([]);
  public getSelectedProducts = computed(() => this.selectedProducts());
  public addProductToCart(product: ProductModel) {
    this.selectedProducts.update((p) => {
      p.push(product);
      return p;
    });
  }
  public removeProductFromCart(productId: number) {
    this.selectedProducts.update((p) => {
      return p.filter((product) => product.id != productId);
    });
  }
}
