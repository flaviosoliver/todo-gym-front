import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthDto } from './dto/auth.dto';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../shared/service/token.service';
import { Observable } from 'rxjs';

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
    this.tokenService.setToken('access_token', user.accessToken);
    this.tokenService.setToken('refresh_token', user.refreshToken.refreshToken);
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

  isLoggedIn(): boolean {
    const accessToken = this.tokenService.getToken('access_token');
    if (accessToken != null && accessToken != '') {
      return true;
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
        .post<AuthDto>(`${environment.apiUrl}/auth/login`, body)
        .toPromise();

      if (result && result.accessToken) {
        this.saveLoggedUser(result);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout() {
    return await this.http.post(`${environment.apiUrl}/auth/logout`, {});
  }

  refreshToken(): Observable<any> {
    const accessToken = this.tokenService.getToken('access_token');
    console.log(accessToken);
    const refreshToken = this.tokenService.getToken('refresh_token');
    console.log(refreshToken);

    const body: AuthDto = {
      accessToken: accessToken!,
      userId: this.getUserId(),
      email: this.getEmail(),
      refreshToken: {
        refreshToken: refreshToken!,
        expiresIn: 0,
      },
    };

    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${refreshToken}`),
    };

    return this.http.post<any>(
      `${environment.apiUrl}/auth/refreshtoken`,
      body,
      header
    );
  }
}
