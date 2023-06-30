import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { AboutComponent } from './about/about.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule,TableModule,ButtonModule,FormModule,ButtonGroupModule,ListGroupModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BranchDataResolverService } from 'src/app/resolvers/branch-data-resolver.service';


@NgModule({
  declarations: [
    AboutComponent,
    AddBranchComponent,
    UpdateBranchComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
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
  ],
  providers: [BranchDataResolverService]  //resolveri
})
export class BranchModule { }
