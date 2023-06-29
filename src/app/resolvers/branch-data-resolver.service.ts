import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BranchService } from '../services/branch.service';
import { BranchFilter } from '../interfaces/branchfilter';

@Injectable({
  providedIn: 'root'
})
export class BranchDataResolverService implements Resolve<any> {

  constructor(private branchService: BranchService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const pageNumber = Number(route.queryParams['pageNumber']) || 1;
    const pageSize = Number(route.queryParams['pageSize']) || 5;
    const filter: BranchFilter = {
      BrancheName: route.queryParams['BrancheName'] || '',
      Username: route.queryParams['Username'] || ''
    };

    return this.branchService.getBranches(filter, pageNumber, pageSize);  
  }
}
