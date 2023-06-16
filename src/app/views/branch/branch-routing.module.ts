import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'branch',
    },
    children: [
      {
        path: '',
        component: AboutComponent,
        data: {
          title: 'about branch',
        },
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
