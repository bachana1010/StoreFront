import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsInComponent } from './goods-in/goods-in.component';
import { GoodsOutComponent } from './goods-out/goods-out.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../../guard/auth.guard'; // import the AuthGuard

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'product',
      canActivate: [AuthGuard], // Add AuthGuard to protect this route

      UserRole: ['operator'] // Here you define which roles can access the operator routes
    },
    children: [
      {
        path: 'goodsin',
        component: GoodsInComponent,
        data: {
          title: 'goodsin',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'goodsout',
        component: GoodsOutComponent,
        data: {
          title: 'goodsout',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'update user',
        },
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
