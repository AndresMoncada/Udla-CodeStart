import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-form/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationComponentModule } from './pages/module-theme/navigation/navigation.component';
import { NavigationModuleOperadorComponent } from './pages/module-theme copy/navigation/navigation.component';
import { NavigationModuleJerarquiaComponent } from './pages/module-theme copy 2/navigation/navigation.component';
import { NavigationModuleEvaluacionComponent } from './pages/module-theme copy 3/navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Datos",
    component: NavigationComponentModule,
    canActivate:[AuthGuard]
  },
  {
    path: "Operadores",
    component: NavigationModuleOperadorComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Jerarquía de operadores",
    component: NavigationModuleJerarquiaComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "Evaluación de expresiones",
    component: NavigationModuleEvaluacionComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
