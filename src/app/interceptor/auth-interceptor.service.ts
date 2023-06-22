import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
  exp: number;
  // include other properties as needed
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('Authorization');

    if (token) {
      const decodedToken = jwt_decode<JwtPayload>(token);
      const currentTimestamp = new Date().getTime() / 1000; // convert to seconds

      if (decodedToken.exp < currentTimestamp) {
        // The token has expired, clear it from local storage and maybe redirect to login
        localStorage.removeItem('Authorization');
      } else {
        const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(clonedRequest);
      }
    }

    return next.handle(request);
  }
}
