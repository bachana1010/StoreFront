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
       title: 'product'
     },
     children: [
       {
         path: 'goodsin',
         component: GoodsInComponent,
         data: {
           title: 'goodsin',
           canActivate: [AuthGuard], // Add AuthGuard to protect this route
           roles: ['operator'] // Define which roles can access this route
         }
       },
       {
         path: 'goodsout',
         component: GoodsOutComponent,
         data: {
           title: 'goodsout',
           canActivate: [AuthGuard], // Add AuthGuard to protect this route
           roles: ['operator'] // Define which roles can access this route
         }
       },
       {
         path: '',
         component: ListComponent,
         data: {
           title: 'list',
           canActivate: [AuthGuard], // Add AuthGuard to protect this route
           roles: ['operator', 'manager'] // Both operator and manager can access this route
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
