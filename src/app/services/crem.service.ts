import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CremService {
  constructor(private http: HttpClient) {}
  getUsers(offset: number, limit: number): Observable<any> {
    console.log(limit);

    return this.http.get(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    );
  }

  searchByPriceRange(price_min: number, price_max: number): Observable<any> {
    return this.http.get(
      `https://api.escuelajs.co/api/v1/products?price_min=${price_min}&price_max=${price_max}`
    );
  }

  getProductById(id: number) {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`);
  }

  login(param: any) {
    return this.http.post('https://api.escuelajs.co/api/v1/auth/login', param);
  }
  storeTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(
      `https://api.escuelajs.co/api/v1/auth/refresh-token`,
      {
        refreshToken,
      }
    );
  }
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
}
