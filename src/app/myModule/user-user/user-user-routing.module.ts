import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from '../../guard/auth.guard'; // import the AuthGuard
import { UserDataResolverService } from '../../resolvers/user-data-resolver.service';  // import the UserDataResolverService

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
      UserRole: ['administrator'] // Here you define which roles can access the Administrator routes
    },
    children: [
      {
        path: '',
        component: AboutComponent,
        data: {
          title: 'about user',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
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
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'update/:id',
        component: UpdateUserComponent,
        data: {
          title: 'update user',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'delete',
        component: DeleteUserComponent,
        data: {
          title: 'delete user',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      }      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUserRoutingModule { }
