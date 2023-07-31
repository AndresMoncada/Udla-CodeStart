import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-form/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationComponentModule } from './pages/module-theme/navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Module/:id",
    component: NavigationComponentModule,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
