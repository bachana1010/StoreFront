import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { GoodsInComponent } from './goods-in/goods-in.component';
import { ListComponent } from './list/list.component';
import { GoodsOutComponent } from './goods-out/goods-out.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule,TableModule,ButtonModule,FormModule,ButtonGroupModule,ListGroupModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    GoodsInComponent,
    ListComponent,
    GoodsOutComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    TableModule,
    ButtonModule,
    FormModule,
    ButtonGroupModule,
    ListGroupModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ProductModule { }
