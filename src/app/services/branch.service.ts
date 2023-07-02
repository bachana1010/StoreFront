import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddBranch } from '../interfaces/branch';
import { BranchFilter } from '../interfaces/branchfilter';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface BranchResponse {
  branches: any[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  endpoint = 'http://localhost:5043/api/Branch'

  constructor(private http: HttpClient) { }

  getBranches(filter: BranchFilter, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
      if (filter.BrancheName) {
        params = params.set('BrancheName', filter.BrancheName);
      }
      
      if (filter.Username) {
        params = params.set('Username', filter.Username);
      }
      
  
      return this.http.get<BranchResponse>(this.endpoint, { params: params })
      .pipe(
        tap(response => {
          if (!response) {
            throw new Error('No response from server');
          }
        }),
        catchError(error => {
          console.error(error);
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
