import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsInComponent } from './goods-in/goods-in.component';
import { GoodsOutComponent } from './goods-out/goods-out.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'product',
    },
    children: [
      {
        path: 'goodsin',
        component: GoodsInComponent,
        data: {
          title: 'goodsin',
        },
      },
      {
        path: 'goodsout',
        component: GoodsOutComponent,
        data: {
          title: 'goodsout',
        },
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'update user',
        },
      },
      
          
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
