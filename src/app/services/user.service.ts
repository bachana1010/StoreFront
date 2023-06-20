import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddUsers,updateUsers } from '../interfaces/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      
    return this.http.get(this.endpoint + 'api/User', { params: params });
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


