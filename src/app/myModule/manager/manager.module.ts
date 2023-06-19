import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { BalanceComponent } from './balance/balance.component';
import { GoodsinListComponent } from './goodsin-list/goodsin-list.component';
import { GoodsOutListComponent } from './goods-out-list/goods-out-list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule,TableModule,ButtonModule,FormModule,ButtonGroupModule,ListGroupModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    BalanceComponent,
    GoodsinListComponent,
    GoodsOutListComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
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
    MatSnackBarModule,
    ToastrModule
  ]
})
export class ManagerModule { }
