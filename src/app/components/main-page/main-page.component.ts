import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { ControlEvent, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ProductModel } from '../../models/product-model';
import { GlobalMessageServiceService } from '../../services/global-message-service.service';
import { ShopStateService } from '../../services/shop-state.service';
import { StoreApiService } from '../../services/store-api-service.service';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DividerModule, ProductItemComponent, ReactiveFormsModule, NgClass],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  router = inject(Router);
  apiService = inject(StoreApiService);
  shopService = inject(ShopStateService);
  messageService = inject(GlobalMessageServiceService);
  searchFormControl = new FormControl('');
  private productsBySearchFilter = signal<ProductModel[]>([]);
  productsByCategoryFilter = computed<ProductModel[]>(() => {
    if (this.selectedCategory() === this.shopService.getCategories()[0]) {
      return this.productsBySearchFilter();
    }
    return this.productsBySearchFilter().filter((p) => p.category == this.selectedCategory());
  });
  selectedCategory = model(this.shopService.getCategories()[0]);
  constructor() {
    effect(() => {
      this.productsBySearchFilter.set(this.shopService.getProducts());
    });
  }
  ngOnInit(): void {
    this.shopService.initProducts();
    this.searchFormControl.events.subscribe((e: ControlEvent<string>) => {
      this.productsBySearchFilter.set(
        this.shopService
          .getProducts()
          .filter((p) => p.title.toLowerCase().includes((e.source.value as string).toLowerCase()))
      );
    });
  }

  openCart() {
    this.router.navigate(['cart']).then((res) => {
      if (!res) {
        this.messageService.setMessage('No hay productos en el carrito');
      }
    });
  }
  changeCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
