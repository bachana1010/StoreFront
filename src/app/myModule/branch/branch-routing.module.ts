import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard'; // update this path to the actual location of your AuthGuard file

import { AboutComponent } from './about/about.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';
import { BranchDataResolverService } from '../../resolvers/branch-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard], // Add this line
    data: {
      title: 'branch',
      UserRole: ['administrator'] // specify that only the 'Administrator' role is allowed
    },
    children: [
      {
        path: '',
        component: AboutComponent,
        resolve: {
          branches: BranchDataResolverService
        }
      },
      {
        path: 'add',
        component: AddBranchComponent,
        data: {
          title: 'add branch',
        },
      },
      {
        path: 'update/:id',
        component: UpdateBranchComponent,
        data: {
          title: 'update branch',
        },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
