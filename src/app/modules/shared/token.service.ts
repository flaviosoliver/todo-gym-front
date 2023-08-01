import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly cookieService: CookieService) {}

  private token: string | null = '';

  setToken(token: string): void {
    this.cookieService.set('token', token);
  }

  getToken(): string | null {
    this.token = this.cookieService.get('token');
    return this.token;
  }

  clearToken(): void {
    return this.cookieService.set('token', '');
  }
}
