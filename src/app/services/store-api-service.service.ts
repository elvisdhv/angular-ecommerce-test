import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  http = inject(HttpClient);
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('products');
  }
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`products/${id}`);
  }
}
