import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { managerGoodSinApi, managerGoodSin, PaginatedManagerGoodSin } from '../interfaces/managerlist';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {GoodsinFilter } from '../../app/interfaces/goodsin1';


// export interface GoodsinFilter {
//   quantity?: number;
//   entryDate?: string;
// }

@Injectable({
  providedIn: 'root'
})
export class GoodsinService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  addGoodsin(task: any): Observable<any> {
    return this.http.post(this.endpoint + 'api/GoodSin', task);    
  }

  getBarcode(barcodetext: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}api/GoodSin/${barcodetext}`);
  }

  getGoodSin(filter: GoodsinFilter, pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSin> {
    console.log("goodsini")
    let params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
  
    if (filter.quantity) {
      params = params.set('quantity', filter.quantity.toString());
    }

    if (filter.quantityOperator) {
      params = params.set('quantityOperator', filter.quantityOperator);
    }

    if (filter.entryDate) {
      params = params.set('entryDate', filter.entryDate);
    }

    if (filter.dateFrom) {
      params = params.set('dateFrom', filter.dateFrom);
    }

    if (filter.dateTo) {
      params = params.set('dateTo', filter.dateTo);
    }
  
    return this.http.get<PaginatedManagerGoodSin>(`${this.endpoint}Api/GoodSin`, { params: params })
      .pipe(
        tap(response => {
          if (!response || (response && response.data && response.data.length === 0)) {
            throw new Error('No results found');
          }
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }
  
  
}
