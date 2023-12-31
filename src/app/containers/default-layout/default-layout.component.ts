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
      const userRole = localStorage.getItem('UserRole');

      switch(userRole) {
        case 'administrator':
          this.navItems = adminNavItems;
          break;
        case 'operator':
          this.navItems = operatorNavItems;
          break;
        case 'manager':
          this.navItems = managerNavItems;
          break;
        default:
          console.warn(`Unknown user role: ${userRole}`);
      }
    } else {
      this.navItems = loggedOutNavItems;
    }
  }
}
