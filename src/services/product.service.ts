import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddUsers,updateUsers } from 'src/interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.endpoint + 'Api/Product');
  }
}
