import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProducts(queryParams?: any, limit?: number) {
    if (limit) queryParams.limit = limit;
    return this.http
      .get<Product[]>(`${this.apiRoot}/products`, { params: queryParams })
      .pipe(
        map((products) =>
          products.map((product) => {
            if (/[0-9]+%/.test(product.offertitle)) {
              product.actualPrice = product.price;
              const off = parseInt(product.offertitle.match(/[0-9]+/)[0], 10);
              product.price -= (product.price * off) / 100;
            }
            return product;
          })
        )
      );
  }

  getProduct(id: number) {
    return this.http
      .get<Product>(`${this.apiRoot}/listproductsbyid/${id}`)
      .pipe(
        map((res) => res[0]),
        map((product) => {
          if (/[0-9]+%/.test(product.offertitle)) {
            product.actualPrice = product.price;
            const off = parseInt(product.offertitle.match(/[0-9]+/)[0], 10);
            product.price -= (product.price * off) / 100;
          }
          return product;
        })
      );
  }
}
