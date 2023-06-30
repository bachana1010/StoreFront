import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    console.log(111)
    if (token) {
      request = this.addToken(request, token);
      console.log(222)

    }
  
    return next.handle(request).pipe(catchError(error => {
      console.log(3)

      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
        console.log(4)

      } else {
        return throwError(error);
        console.log(5)

      }
    }));
  }
  
  private addToken(request: HttpRequest<any>, token: string) {
    console.log(5)

    return request.clone({

      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log(6)

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse: any) => {
          if (tokenResponse && tokenResponse.token) {
            this.authService.storeAuthToken(tokenResponse.token);
            this.refreshTokenSubject.next(tokenResponse.token);
            return next.handle(this.addToken(request, tokenResponse.token));
          }
  
          return throwError('Refresh token failed'); 
        }),
        catchError(() => {
          this.authService.logoutUser();
          return throwError('Error during token refresh, logging out.');
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
  
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          if (jwt) {
            return next.handle(this.addToken(request, jwt));
          } else {
            return throwError('Token is null');
          }
        })
      );
    }
  }
  
  
}
