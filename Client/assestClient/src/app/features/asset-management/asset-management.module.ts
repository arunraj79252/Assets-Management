import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast'
import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetManagementComponent } from './asset-management.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetAddComponent } from './components/asset-add/asset-add.component';
import { AssetEditComponent } from './components/asset-edit/asset-edit.component';


@NgModule({
  declarations: [
    AssetManagementComponent,
    AssetListComponent,
    AssetAddComponent,
    AssetEditComponent,
    
  ],
  imports: [
    CommonModule,
    AssetManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AssetManagementModule { }
