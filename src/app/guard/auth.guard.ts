
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
    export class AuthGuard implements CanActivate {
      constructor(private authService: AuthService, private router: Router) {}

      canActivate(
        
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        
      ): boolean {
        // if (this.authService.isTokenExpired()) {
        //   // this.authService.clearExpiredToken();
        //   // Navigate to the login page or show a message
        //   this.router.navigate(['/login']);
        //   return false;
        // }
        console.log('AuthGuard canActivate triggered');


        const currentUserRole = localStorage.getItem('UserRole');
        const requiredRoles = route.data['UserRole'];
        console.log('Route: ', route);
        console.log('Route data: ', route.data);
        console.log('User role from local storage: ', currentUserRole);
        
        if (requiredRoles) {
          const hasPermission = requiredRoles.includes(currentUserRole); 
          if (!hasPermission) {
            this.router.navigate(['signin/unauthorized']); 
            return false;
          }
        }
      
        return true;
      }
    }







  



