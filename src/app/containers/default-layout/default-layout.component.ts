import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { loggedInNavItems, loggedOutNavItems } from './_nav';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems!: INavData[];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.navItems = loggedInNavItems;
    } else {
      this.navItems = loggedOutNavItems;
    }
  }
}
