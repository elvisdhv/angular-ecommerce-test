import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ShopStateService } from '../../services/shop-state.service';
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
  router = inject(Router);
  apiService = inject(StoreApiService);
  shopService = inject(ShopStateService);
  ngOnInit(): void {
    this.shopService.initProducts();
  }

  openCart() {
    this.router.navigate(['cart']);
  }
}
