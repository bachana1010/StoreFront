import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddUsers,updateUsers } from '../interfaces/users';
import {  UserFilter } from '../interfaces/userfilter';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface UserResponse {
  users: any[];
  totalCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  getUsers(filter: UserFilter, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    if (filter.username) {
      params = params.set('username', filter.username);
    }
  
    if (filter.email) {
      params = params.set('email', filter.email);
    }
  
    if (filter.role) {
      params = params.set('role', filter.role);
    }
  
    return this.http.get<UserResponse>(this.endpoint + 'api/User', { params: params })
    .pipe(
      tap(response => {
        if (!response || (response && response.users && response.users.length === 0)) {
          throw new Error('No results found');
        }
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    );

  }
  
  
  

  AddUser(task: AddUsers): Observable<any> {
    return this.http.post(this.endpoint + 'api/User', task);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}api/User/${id}`);
  }
  

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}api/User/${id}`);
  }

  
  updateUser(id: string | number, userData: updateUsers): Observable<any> {
    return this.http.put<any>(`${this.endpoint}api/User/${id}`, userData);
  }
  
}


