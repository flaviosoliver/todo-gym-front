import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly cookieService: CookieService) {}

  private token: string | null = '';

  setToken(typeToken: string, token: string): void {
    this.cookieService.set(typeToken, token);
  }

  getToken(typeToken: string): string | null {
    this.token = this.cookieService.get(typeToken);
    return this.token;
  }

  clearTokens(): void {
    this.cookieService.set('access_token', '');
    this.cookieService.set('refresh_token', '');
  }

  updateTokens(tokens: any): void {
    this.cookieService.set('access_token', tokens.accessToken);
    this.cookieService.set('refresh_token', tokens.refreshToken.refreshToken);
  }
}
