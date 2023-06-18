
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}


