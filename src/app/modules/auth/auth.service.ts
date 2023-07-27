import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthDto } from './dto/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  public saveLoggedUser(user: AuthDto) {
    this.cookieService.set('token', user.token);
    this.cookieService.set('userId', user.userId);
    this.cookieService.set('email', user.email);
  }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  async login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    await this.http.post<any>(`${environment.apiUrl}/auth`, body).subscribe(
      (response) => {
        console.log(response);
        this.saveLoggedUser(response);
        return true;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
