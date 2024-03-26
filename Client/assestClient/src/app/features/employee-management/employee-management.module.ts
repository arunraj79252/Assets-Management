import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeManagementComponent } from './employee-management.component';


@NgModule({
  declarations: [
    EmployeeManagementComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
