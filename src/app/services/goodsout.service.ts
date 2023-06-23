
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { managerGoodSinApi,managerGoodSin,PaginatedManagerGoodSin } from '../interfaces/managerlist';

export interface GoodsOut {
  barcode: string;

  quantity: number;
}

export type GoodsinAddApiResponse = GoodsOut[];


@Injectable({
  providedIn: 'root'
})
export class GoodsOutService {
  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  addGoodsOut(goodsOut: GoodsOut): Observable<any> {
    return this.http.post(this.endpoint + 'api/GoodsOut', goodsOut, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    // directly returning the error response
    return throwError(error.error);
};



  getGoodSOut(pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedManagerGoodSin> {
    const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedManagerGoodSin>(`${this.endpoint}Api/GoodsOut`, { params: params });
}


}


