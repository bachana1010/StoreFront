import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard'; 

import { AboutComponent } from './about/about.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';
import { BranchDataResolverService } from '../../resolvers/branch-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: { title: 'branch' },
    children: [
      {
        path: '',
        component: AboutComponent,
        canActivate: [AuthGuard],
        data: { UserRole: ['administrator'] },
        resolve: { branches: BranchDataResolverService }
      },
      {
        path: 'add',
        component: AddBranchComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'add branch',
          UserRole: ['administrator']
        },
      },
      {
        path: 'update/:id',
        component: UpdateBranchComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'update branch',
          UserRole: ['administrator']
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
