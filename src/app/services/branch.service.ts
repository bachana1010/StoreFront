import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddBranch } from '../interfaces/branch';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  endpoint = 'http://localhost:5043/api/Branch'

  constructor(private http: HttpClient) { }
  
  getBranches(): Observable<any> {
    return this.http.get(this.endpoint);
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
