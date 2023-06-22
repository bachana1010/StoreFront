import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
  exp: number;
  // include other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://localhost:5043/'
  public logoutEvent = new BehaviorSubject(false); // Add this line

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

  
  logoutUser(){
    localStorage.removeItem("Authorization")
    localStorage.removeItem("ID"); 

    this.router.navigate(["login"])
 }

  loggedIn(){
    return !!localStorage.getItem('Authorization')
  }

  // Add these methods
  isTokenExpired(): boolean {
    const token = localStorage.getItem('Authorization');

    if (!token) {
      return true;
    }

    const decodedToken = jwt_decode<JwtPayload>(token);
    const currentTimestamp = new Date().getTime() / 1000; // convert to seconds

    if (decodedToken.exp < currentTimestamp) {
      // The token has expired
      return true;
    }

    // The token is valid
    return false;
  }

  clearExpiredToken() {
    if (this.isTokenExpired()) {
      localStorage.removeItem('Authorization');
    }
  }
}
