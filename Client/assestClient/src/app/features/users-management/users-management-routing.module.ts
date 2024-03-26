import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    pathMatch: "full",
    component: UserAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update',
    pathMatch: "full",
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    pathMatch: "full",
    component: UserListComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
