import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
