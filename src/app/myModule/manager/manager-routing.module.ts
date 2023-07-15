import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { GoodsOutListComponent } from './goods-out-list/goods-out-list.component';
import { GoodsinListComponent } from './goodsin-list/goodsin-list.component';
import { AuthGuard } from '../../guard/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: { UserRole: ['manager'] },
    children: [
      {
        path: 'list',
        component: BalanceComponent
      },
      {
        path: 'goodsout',
        component: GoodsOutListComponent
      },
      {
        path: 'goodsIn',
        component: GoodsinListComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
