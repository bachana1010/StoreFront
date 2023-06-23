import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddUsers,updateUsers } from '../interfaces/users';
import { managerGoodSinApi,managerGoodSin,PaginatedManagerGoodSin } from '../interfaces/managerlist';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<any> {
  //   return this.http.get(this.endpoint + 'Api/Product');
  // }




  getProducts(pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSin> {
    const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedManagerGoodSin>(`${this.endpoint}Api/Product`, { params: params });
}



}


