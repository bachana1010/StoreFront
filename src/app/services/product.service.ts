import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductFilter } from '../interfaces/products';

interface ProductResponse {
  products: any[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint = 'http://localhost:5043/'

  constructor(private http: HttpClient) { }

  getProducts(filter: ProductFilter, pageNumber: number = 1, pageSize: number = 5): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    if (filter.priceOperator) {
      params = params.set('priceOperator', filter.priceOperator);
    }

    if (filter.priceValue) {
      params = params.set('priceValue', filter.priceValue.toString());
    }

    if (filter.quantityOperator) {
      params = params.set('quantityOperator', filter.quantityOperator);
    }

    if (filter.quantityValue) {
      params = params.set('quantityValue', filter.quantityValue.toString());
    }

    return this.http.get<ProductResponse>(this.endpoint + 'api/Product', { params: params })
      .pipe(
        tap(response => {
          if (!response || (response && response.products && response.products.length === 0)) {
            throw new Error('No results found');
          }
        }),
        catchError(error => {
          console.error(error, "es erori");
          return throwError(error);
        })
      );

      
      
  }
  getdashboard(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}api/Product/dashboard`);
  }

}
