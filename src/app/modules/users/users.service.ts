import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { environment } from 'src/environments/environment';
import { User } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async getUser(id: string) {
    try {
      const result = await this.http
        .get<User>(`${environment.apiUrl}/users/${id}`)
        .toPromise();

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      const result = await this.http
        .patch<UpdateUserDto>(`${environment.apiUrl}/users/${id}/update`, user)
        .toPromise();

      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
