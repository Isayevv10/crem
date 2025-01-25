import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CremService {
  constructor(private http: HttpClient) {}

  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

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
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(
      `https://api.escuelajs.co/api/v1/auth/refresh-token`,
      {
        refreshToken,
      }
    );
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
