import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AssetCategoryComponent } from './asset-category.component'; 
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: '', 
  component: AssetCategoryComponent,
  canActivate: [AuthGuard],
 },
 { path: 'add',
   component:  CategoryAddComponent
 },
 { path: 'edit',
   component:  CategoryEditComponent
 },
 { path: 'list',
  component: CategoryListComponent 
 }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetCategoryRoutingModule { }



