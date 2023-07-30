import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private readonly authService: AuthService
  ) {}

  async createUser(user: CreateUserDto) {
    try {
      const result = await this.http
        .post<CreateUserDto>(`${environment.apiUrl}/users`, user)
        .toPromise();
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
