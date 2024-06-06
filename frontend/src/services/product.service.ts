import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../_model/product';
import { Rental } from '../_model/rental';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  apiUrl = "http://localhost:3000";
  httpClient = inject(HttpClient);

  private products : Array<Product> = [];
  
  constructor() {}

  getProductById(id: string): Product | null {
    for (let product of this.products) {
      if (product._id === id) {
        return product;
      }
    }
    return null;
  }  
  
  getProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl + '/products');
  }
  getProduct(id: string) {
    return this.httpClient.get<Product>(this.apiUrl + '/products/'+ id);
  }

  addProduct(model: Product) {
    return this.httpClient.post(this.apiUrl + '/products', model);
  }

  updateProduct(id: string, model: Product) {
    return this.httpClient.put(this.apiUrl + '/products/' + id, model);
  }
  updateProductStatusOnly(productId: string, newStatus: string): Observable<Product> {
    return this.httpClient.put<Product>(`${this.apiUrl}/products/${productId}/status`, { status: newStatus });
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.apiUrl + '/products/' + id);
  }
  getDelayedRentals(rentDuration: number): Observable<Rental[]> {
    return this.httpClient.post<Rental[]>(`${this.apiUrl}/delays`, { rentDuration });
  }

}