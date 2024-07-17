import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersService } from './users.service';
import { UserFormComponent } from './user-form/user-form.component';
import { DataTableComponent } from '../data-table/data-table.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    DataTableComponent,
  ],
  providers: [
    UsersService
  ],
})
export class UsersModule { }
