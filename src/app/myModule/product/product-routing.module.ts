import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsInComponent } from './goods-in/goods-in.component';
import { GoodsOutComponent } from './goods-out/goods-out.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../../guard/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    data: { title: 'product' },
    children: [
      {
        path: 'goodsin',
        component: GoodsInComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'goodsin',
          UserRole: ['operator'] 
        }
      },
      {
        path: 'goodsout',
        component: GoodsOutComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'goodsout',
          UserRole: ['operator']
        }
      },
      {
        path: '',
        component: ListComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'list',
          UserRole: ['operator', 'manager'] 
        }
      },
    ]
  },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ProductRoutingModule { }
