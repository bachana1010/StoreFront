import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';  // import the UserService

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const pageNumber = Number(route.queryParams['pageNumber']) || 1;
    const pageSize = Number(route.queryParams['pageSize']) || 5;
    return this.userService.getUsers(pageNumber, pageSize);  
  }
}
