
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // assuming you have an AuthService where you store the user's authentication state

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
        if (this.authService.isTokenExpired()) {
          this.authService.clearExpiredToken();
          // Navigate to the login page or show a message
          this.router.navigate(['/login']);
          return false;
        }

        // Check user role
        const currentUserRole = localStorage.getItem('UserRole'); // Get the role of current user
        const requiredRoles = route.data['UserRole'];

        if (requiredRoles) {
          const hasPermission = requiredRoles.includes(currentUserRole); // check if user's role is one of the required roles
          if (!hasPermission) {
            this.router.navigate(['/unauthorized']); // if user does not have required roles, navigate to an unauthorized page
            return false;
          }
        }
      
        return true;
      }
    }







  



