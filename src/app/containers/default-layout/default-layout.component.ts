import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { adminNavItems, operatorNavItems, managerNavItems, loggedOutNavItems } from './_nav';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  public navItems!: INavData[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      // Get user role from localStorage
      const userRole = localStorage.getItem('UserRole');

      switch(userRole) {
        case 'Administrator':
          this.navItems = adminNavItems;
          break;
        case 'operator':
          this.navItems = operatorNavItems;
          break;
        case 'manager':
          this.navItems = managerNavItems;
          break;
        default:
          // Handle unknown role
          console.warn(`Unknown user role: ${userRole}`);
      }
    } else {
      // If user is not logged in, show Login and Registration options
      this.navItems = loggedOutNavItems;
    }
  }
}
