import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetCategoryRoutingModule } from './asset-category-routing.module';
import { AssetCategoryComponent } from './asset-category.component';

import { CategoryAddComponent } from './components/category-add/category-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';


@NgModule({
  declarations: [
    AssetCategoryComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryEditComponent
  ],
  
  imports: [
    CommonModule,
    AssetCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AssetCategoryModule { 
   
}


