import { Component, input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ProductModel } from '../../../models/product-model';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [BadgeModule, ButtonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  product = input.required<ProductModel>();
}
