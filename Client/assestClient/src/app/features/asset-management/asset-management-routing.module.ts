import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetManagementComponent } from './asset-management.component';
import { AssetAddComponent } from './components/asset-add/asset-add.component';
import { AssetEditComponent } from './components/asset-edit/asset-edit.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';//remove once dev is completed

const routes: Routes = [{ path: '', component: AssetManagementComponent },
{ path: 'add', component:  AssetAddComponent },
{ path: 'edit/:id', component: AssetEditComponent },
{ path: 'list', component: AssetListComponent }];//for testing only...remove list component when dev is completed

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
