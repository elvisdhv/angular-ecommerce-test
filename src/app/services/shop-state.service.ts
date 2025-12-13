import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { StoreApiService } from './store-api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ShopStateService {
  private apiService = inject(StoreApiService);
  private products = signal<ProductModel[]>([]);
  private categories = signal<string[]>([]);
  private selectedProducts = signal<ProductModel[]>([]);
  public getProducts = computed(() => this.products());
  public getCategories = computed(() => this.categories());
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
  public initProducts() {
    this.apiService.getAllProducts().subscribe((products) => {
      this.products.set(products);
      const categorySet = new Set<string>();
      for (const product of products) {
        categorySet.add(product.category);
      }
      this.categories.set(Array.from(categorySet.values()));
    });
  }
}
