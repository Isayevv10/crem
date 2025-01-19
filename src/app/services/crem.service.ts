import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CremService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('https://api.escuelajs.co/api/v1/products');
  }

  searchByPriceRange(price_min: number, price_max: number): Observable<any> {
    return this.http.get(
      `https://api.escuelajs.co/api/v1/products?price_min=${price_min}&price_max=${price_max}`
    );
  }

  getProductById(id: number) {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
