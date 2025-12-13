import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product-model';
import { StoreApiService } from './store-api-service.service';

@Injectable({
  providedIn: 'root',
})
export class ShopStateService {
  private router = inject(Router);
  private apiService = inject(StoreApiService);
  private products = signal<ProductModel[]>([]);
  private categories = signal<string[]>([]);
  private selectedProducts = signal<ProductModel[]>([]);
  private username = signal('Sin Nombre de Usuario');
  private userPassword = signal('nopassword');
  public getUsername = computed(() => this.username());
  public getUserPassword = computed(() => this.userPassword());
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
      const firstproductById = p.findIndex((product) => product.id === productId);
      p.splice(firstproductById, 1);
      return p;
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
  public finishBuy() {
    this.selectedProducts.set([]);
  }
}
