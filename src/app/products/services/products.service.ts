import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.baseApi + 'products')
  }

  getCategories() {
    return this.http.get(environment.baseApi + 'products/categories')
  }

  getProductsByCategory(category: string) {
    return this.http.get(environment.baseApi + 'products/category/' + category)
  }

  getProductById(id: number) {
    return this.http.get(environment.baseApi + 'products/' + id)
  }

  createProduct(product: any) {
    return this.http.post(environment.baseApi + 'products', product)
  }
}
