// shop.state.ts
import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { StoreApiService } from '../services/store-api-service.service';

const initialState = {
  products: [] as ProductModel[],
  categories: [] as string[],
  selectedProducts: [] as ProductModel[],
  username: '',
  userPassword: '',
};

export const ShopState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, categories, selectedProducts }) => ({
    categoriesList: () => ['Todos', ...categories()],
  })),
  withMethods((store) => {
    const api = inject(StoreApiService);

    return {
      addProductToCart(product: ProductModel) {
        patchState(store, (state) => ({
          selectedProducts: [...state.selectedProducts, product],
        }));
      },

      removeProductFromCart(productId: number) {
        patchState(store, (state) => ({
          selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
        }));
      },

      finishBuy() {
        patchState(store, { selectedProducts: [] });
      },

      login(username: string, password: string) {
        patchState(store, { username, userPassword: password });
      },

      getProductById(id: number): ProductModel | undefined {
        return store.products().find((p) => p.id === id);
      },

      loadProducts: rxMethod<void>(
        pipe(
          switchMap(() => api.getAllProducts()),
          tap({
            next: (products) => {
              const categorySet = new Set(products.map((p) => p.category));
              patchState(store, {
                products,
                categories: Array.from(categorySet),
              });
            },
            error: (err) => console.error('Error cargando productos', err),
          })
        )
      ),
    };
  }),

  withHooks({
    onInit({ loadProducts }) {
      loadProducts();
    },
  })
);
