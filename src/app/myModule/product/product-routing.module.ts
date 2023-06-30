import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsInComponent } from './goods-in/goods-in.component';
import { GoodsOutComponent } from './goods-out/goods-out.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../../guard/auth.guard'; 

const routes: Routes = [
   {
     path: '',
     data: {
       title: 'product'
     },
     children: [
       {
         path: 'goodsin',
         component: GoodsInComponent,
         data: {
           title: 'goodsin',
           canActivate: [AuthGuard], 
           roles: ['operator'] 
         }
       },
       {
         path: 'goodsout',
         component: GoodsOutComponent,
         data: {
           title: 'goodsout',
           canActivate: [AuthGuard], 
           roles: ['operator']
         }
       },
       {
         path: '',
         component: ListComponent,
         data: {
           title: 'list',
           canActivate: [AuthGuard], 
           roles: ['operator', 'manager'] 
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
