import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { managerGoodSOutApi, managerGoodSOut,PaginatedManagerGoodSOut } from '../interfaces/managerlist';
import { GoodsinFilter } from '../interfaces/managerlist';

@Injectable({
  providedIn: 'root'
})
export class GoodsOutService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  addGoodsOut(goodsOut: managerGoodSOut): Observable<any> {
    return this.http.post(this.endpoint + 'api/GoodsOut', goodsOut, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError(error.error);
  };

  getGoodSOut(filter: GoodsinFilter, pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSOut> {
    let params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

    if (filter.quantity) {
      params = params.set('quantity', filter.quantity.toString());
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

    return this.http.get<PaginatedManagerGoodSOut>(`${this.endpoint}Api/GoodsOut`, { params: params })
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
