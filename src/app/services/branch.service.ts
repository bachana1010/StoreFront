import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AddBranch } from '../interfaces/branch';
import { BranchFilter } from '../interfaces/branchfilter';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  endpoint = 'http://localhost:5043/api/Branch/'
  

  constructor(private http: HttpClient) { }
  getBranches(filter: BranchFilter, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      console.log(filter)

    if (filter.BrancheName) {
      params = params.set('BrancheName', filter.BrancheName);
      console.log(filter)
    }
  
    if (filter.addedByUserName) {
      params = params.set('addedByUserName', filter.addedByUserName);
      console.log(filter)

    }
  
    return this.http.get<any>(this.endpoint, { params: params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(`Error fetching data: ${error.statusText}, Full error: `, error);
          return throwError(error);
        })
      );
  }
  

  deleteBranch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }

  AddBranch(branchname: AddBranch): Observable<any> {
    return this.http.post(this.endpoint, branchname);
  }
  
  updateBranch(id: string | number, branchData: AddBranch): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${id}`, branchData);
  }
  
  getBranchById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }
}
