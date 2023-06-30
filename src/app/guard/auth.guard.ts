
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
        // Check if the token has expired
        // if (this.authService.isTokenExpired()) {
        //   // this.authService.clearExpiredToken();
        //   // Navigate to the login page or show a message
        //   this.router.navigate(['/login']);
        //   return false;
        // }

        // Check user role
        const currentUserRole = localStorage.getItem('UserRole'); // Get the role of current user
        const requiredRoles = route.data['UserRole'];

        if (requiredRoles) {
          const hasPermission = requiredRoles.includes(currentUserRole); 
          if (!hasPermission) {
            this.router.navigate(['/unauthorized']); 
            return false;
          }
        }
      
        return true;
      }
    }







  



