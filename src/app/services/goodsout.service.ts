import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { GoodsoutFilter } from '../interfaces/goodsout';
import { managerGoodSOut, PaginatedManagerGoodSOut } from '../interfaces/managerlist';

@Injectable({
  providedIn: 'root'
})
export class GoodsOutService {
  endpoint = 'http://localhost:5043/';

  constructor(private http: HttpClient) { }

  addGoodsOut(goodsOut: managerGoodSOut): Observable<any> {
    return this.http.post(`${this.endpoint}Api/GoodsOut`, goodsOut, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getGoodSOut(filter: GoodsoutFilter, pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSOut> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

      if (filter.quantityValue) {
        params = params.set('quantityValue', filter.quantityValue.toString());
      }

    if (filter.quantityOperator) {
      params = params.set('quantityOperator', filter.quantityOperator);
    }
    

    if (filter.dateFrom) {
      params = params.set('dateFrom', filter.dateFrom);
    }

    if (filter.dateTo) {
      params = params.set('dateTo', filter.dateTo);
    }

    if (filter.outDate) {
      params = params.set('outDate', filter.outDate);
    }

    return this.http.get<PaginatedManagerGoodSOut>(`${this.endpoint}Api/GoodsOut`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError(error);
  }
}
