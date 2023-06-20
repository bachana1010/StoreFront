import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BranchService } from '../services/branch.service';  // import the BranchService

@Injectable({
  providedIn: 'root'
})
export class BranchDataResolverService implements Resolve<any> {

  constructor(private branchService: BranchService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.branchService.getBranches();  
  }
}
