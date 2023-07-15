import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserUserRoutingModule } from './user-user-routing.module';
import { AboutComponent } from './about/about.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule,TableModule,ButtonModule,FormModule,ButtonGroupModule,ListGroupModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDataResolverService } from '../../resolvers/user-data-resolver.service';  


@NgModule({
  declarations: [
    AboutComponent,
    AddUserComponent,
    UpdateUserComponent    

  ],
  imports: [
    CommonModule,
    UserUserRoutingModule,
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
  providers: [UserDataResolverService] //  resolver

})
export class UserUserModule { }
