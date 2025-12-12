import { Component, inject, OnInit, signal } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ProductModel } from '../../models/product-model';
import { StoreApiService } from '../../services/store-api-service.service';
import { ProductItemComponent } from './product-item/product-item.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [DividerModule, ProductItemComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  apiService = inject(StoreApiService);
  categories = signal<string[]>([]);
  products = signal<ProductModel[]>([]);
  ngOnInit(): void {
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
