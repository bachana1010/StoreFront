
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // assuming you have an AuthService where you store the user's authentication state

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserRole = localStorage.getItem('UserRole'); // Get the role of current user
  
    if (!currentUserRole) { // if no role found, user is not logged in
      this.router.navigate(['/signin']);
      return false;
    }
  
    // get the roles required from route data
    const requiredRoles = route.data['UserRole'];
  
    // check if route is restricted by role
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


