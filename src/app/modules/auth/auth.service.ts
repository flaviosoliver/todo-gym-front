import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthDto } from './dto/auth.dto';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../shared/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly tokenService: TokenService
  ) {}

  public saveLoggedUser(user: AuthDto) {
    this.tokenService.setToken(user.token);
    this.cookieService.set('userId', user.userId);
    this.cookieService.set('email', user.email);
  }

  public getUserId(): string {
    return this.cookieService.get('userId');
  }

  public getEmail(): string {
    return this.cookieService.get('email');
  }

  public clearUserId(): void {
    return this.cookieService.set('userId', '');
  }

  public clearEmail(): void {
    return this.cookieService.set('email', '');
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    if (!token || token.length === 0) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    const expired = date!.valueOf() < new Date().valueOf();

    return expired;
  }

  isLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      return !this.isTokenExpired(token);
    }
    return false;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const body = {
        email: email,
        password: password,
      };
      const result = await this.http
        .post<AuthDto>(`${environment.apiUrl}/auth`, body)
        .toPromise();

      if (result && result.token) {
        this.saveLoggedUser(result);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
