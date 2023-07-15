import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from '../../guard/auth.guard'; 
import { UserDataResolverService } from '../../resolvers/user-data-resolver.service';  

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
      UserRole: ['administrator'] 
    },
    children: [
      {
        path: '',
        component: AboutComponent,
        data: {
          title: 'about user',
        },
        canActivate: [AuthGuard], 
        resolve: {
          users: UserDataResolverService
        }
      },
      {
        path: 'add',
        component: AddUserComponent,
        data: {
          title: 'add user',
        },
        canActivate: [AuthGuard], 
      },
      {
        path: 'update/:id',
        component: UpdateUserComponent,
        data: {
          title: 'update user',
        },
        canActivate: [AuthGuard], 
      },
     
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUserRoutingModule { }
