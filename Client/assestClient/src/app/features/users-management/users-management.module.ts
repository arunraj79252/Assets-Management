import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast'
import { NgxPaginationModule } from 'ngx-pagination';
// import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    // UserDetailComponent,
    
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule ,
    ToastModule

  ]
})
export class UsersManagementModule { }
