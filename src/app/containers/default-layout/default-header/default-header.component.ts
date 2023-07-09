import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  userRole: 'manager' | 'operator' | 'administrator';  

  constructor(private classToggler: ClassToggleService) {
    super();
    this.userRole = localStorage.getItem('UserRole') as 'manager' | 'operator'  | 'administrator'; 
  }
}
