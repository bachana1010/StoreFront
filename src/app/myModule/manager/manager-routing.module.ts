import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { GoodsOutListComponent } from './goods-out-list/goods-out-list.component';
import { GoodsinListComponent } from './goodsin-list/goodsin-list.component';
import { AuthGuard } from '../../guard/auth.guard'; // import the AuthGuard

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard], // Add AuthGuard to protect this route

    data: {
      UserRole: ['manager'] // Here you define which roles can access the manager routes
    },
    children: [
      {
        path: 'list',
        component: BalanceComponent,
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'goodsout',
        component: GoodsOutListComponent,
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      },
      {
        path: 'goodsIn',
        component: GoodsinListComponent,
        canActivate: [AuthGuard], // Add AuthGuard to protect this route
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
