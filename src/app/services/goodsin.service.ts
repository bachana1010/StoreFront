import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { PaginatedGoodsin } from '../../app/interfaces/goodsin1';
import { managerGoodSinApi,managerGoodSin,PaginatedManagerGoodSin } from '../interfaces/managerlist';

export interface GoodsinAdd {
  barcode: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}




export type GoodsinAddApiResponse = GoodsinAdd[];


@Injectable({
  providedIn: 'root'
})
export class GoodsinService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  addGoodsin(task: GoodsinAdd): Observable<any> {
    return this.http.post(this.endpoint + 'api/GoodSin', task);    
  }

  getBarcode(barcodetext: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}api/GoodSin/${barcodetext}`);
  }

  getGoodSin(pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSin> {
    const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedManagerGoodSin>(`${this.endpoint}Api/GoodSin`, { params: params });
}

   
}
