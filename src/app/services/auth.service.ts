import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://localhost:5043/';
  public logoutEvent = new BehaviorSubject(false); 

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  registerUser(user: any ): Observable<any>{
    console.log('Sending request to:', this.endpoint + 'api/auth/register');
    return this.http.post(this.endpoint + "api/auth/register", user)
  }

  loginUser(user: any): Observable<any>{
    console.log('Sending request to:', this.endpoint + 'api/auth/login');
    return this.http.post(this.endpoint + "api/auth/login", user);
  }

  // refreshToken(): Observable<TokenResponse> {
  //   console.log('Sending request to:', this.endpoint + 'api/auth/refresh');
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   return this.http.post<TokenResponse>(this.endpoint + "api/auth/refresh", { refreshToken });
  // }

  logoutUser(){
    localStorage.removeItem("Authorization");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("username");


    // localStorage.removeItem("refreshToken"); 
    localStorage.removeItem("ID"); 

    this.router.navigate(["login"]);
 }

  loggedIn(){
    return !!localStorage.getItem('Authorization');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('Authorization');
  }

  storeAuthToken(token: string): void {
    localStorage.setItem('Authorization', token);
  }

  isTokenExpired(): boolean {
    const token = this.getAuthToken();

    if (!token) {
      return true;
    }

    const decodedToken = jwt_decode<JwtPayload>(token);
    const currentTimestamp = new Date().getTime() / 1000; 
    if (decodedToken.exp < currentTimestamp) {
      return true;
    }
    return false;
  }

  // clearExpiredToken() {
  //   if (this.isTokenExpired()) {
  //     this.storeAuthToken('11111');
  //   }
  // }
}
