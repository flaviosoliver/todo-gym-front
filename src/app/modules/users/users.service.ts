import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { environment } from 'src/environments/environment';
import { User } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable, delay, mergeMap, retryWhen, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

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

  getUser(id: string): Observable<User> {
    const result = this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            mergeMap((error, count) => {
              if (count < this.maxRetries && this.shouldRetry(error)) {
                return Observable.create((observer: { next: () => any }) =>
                  observer.next()
                );
              }
              return throwError(error);
            }),
            delay(this.retryDelay)
          )
        )
      );

    console.log(result);

    return result;
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

  private shouldRetry(error: any): boolean {
    if (error.status === 401) {
      return true;
    }

    if (error.status >= 500 && error.status < 600) {
      return true;
    }

    if (error.message.includes('temporary')) {
      return true;
    }

    return false;
  }
}
