import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { ControlEvent, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ProductModel } from '../../models/product-model';
import { GlobalMessageServiceService } from '../../services/global-message-service.service';
import { ShopState } from '../../states/shop.state';
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
  shopState = inject(ShopState);
  messageService = inject(GlobalMessageServiceService);
  searchFormControl = new FormControl('');
  private productsBySearchFilter = signal<ProductModel[]>([]);
  productsByCategoryFilter = computed<ProductModel[]>(() => {
    if (this.selectedCategory() === this.shopState.categories()[0]) {
      return this.productsBySearchFilter();
    }
    return this.productsBySearchFilter().filter((p) => p.category == this.selectedCategory());
  });
  selectedCategory = model(this.shopState.categoriesList()[0]);
  constructor() {
    effect(() => {
      this.productsBySearchFilter.set(this.shopState.products());
    });
  }
  ngOnInit(): void {
    this.searchFormControl.events.subscribe((e: ControlEvent<string>) => {
      this.productsBySearchFilter.set(
        this.shopState
          .products()
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
