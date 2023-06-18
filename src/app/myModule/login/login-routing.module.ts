import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../login/sign-in/sign-in.component';
import { LogoutComponent } from '../login/logout/logout.component'; // make sure to import LogoutComponent

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
