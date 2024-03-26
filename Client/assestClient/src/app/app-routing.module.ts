import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/app/core/components/login/login.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { LoginGuard } from "./core/guards/login.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    pathMatch: "full",
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'response',
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: '**', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
