import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserFilter } from '../interfaces/userfilter';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const pageNumber = Number(route.queryParams['pageNumber']) || 1;
    const pageSize = Number(route.queryParams['pageSize']) || 5;
    const filter: UserFilter = {
      username: route.queryParams['username'] || '',
      email: route.queryParams['email'] || '',
      role: route.queryParams['role'] || ''
    };

    return this.userService.getUsers(filter, pageNumber, pageSize);  
  }
}
