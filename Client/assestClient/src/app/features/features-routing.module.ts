import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./asset-management/asset-management.module').then(
        (m) => m.AssetManagementModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./asset-category/asset-category.module').then(
        (m) => m.AssetCategoryModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./users-management/users-management.module').then(
        (m) => m.UsersManagementModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee-management/employee-management.module').then(
        (m) => m.EmployeeManagementModule
      ),
      canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
