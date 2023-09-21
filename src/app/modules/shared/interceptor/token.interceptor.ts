import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';
import { TokenService } from '../service/token.service';
import { AuthService } from '../../auth/auth.service';
import { AuthDto } from '../../auth/dto/auth.dto';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    const accessToken = this.tokenService.getToken('access_token');

    if (
      accessToken !== null &&
      accessToken !== undefined &&
      accessToken !== '' &&
      !this.isRefreshing
    ) {
      authReq = this.addTokenHeader(request, accessToken);
    }

    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          if (err.error.message === 'Token Expired') {
            const refreshToken = this.tokenService.getToken('refresh_token');
            if (refreshToken !== null && !this.isRefreshing) {
              const isRefreshTokenExpired =
                this.tokenService.isTokenExpired(refreshToken);

              if (isRefreshTokenExpired) {
                this.tokenService.clearTokens();
                this.authService.clearUserId();
                this.authService.clearEmail();
                window.location.reload();
                return throwError('Refresh token expired');
              } else {
                return this.generateNewTokens(request, next);
              }
            } else {
              this.tokenService.clearTokens();
              this.authService.clearUserId();
              this.authService.clearEmail();
              window.location.reload();
              return throwError('Refresh token missing');
            }
          }
        }
        return throwError(() => {
          console.log(err);
          new Error(err);
        });
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private generateNewTokens(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap((res: any) => {
        this.tokenService.setToken('access_token', res.accessToken);
        this.tokenService.setToken(
          'refresh_token',
          res.refreshToken.refreshToken
        );

        this.isRefreshing = false;
        this.refreshTokenSubject.next(res.refreshToken.refreshToken);

        return next.handle(this.addTokenHeader(request, res.accessToken));
      })
    );
  }
}
