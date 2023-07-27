import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-form/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavigationComponentModule } from './pages/module-theme/navigation/navigation.component';
import { NavigationModuleOperadorComponent } from './pages/module-theme copy/navigation/navigation.component';
import { NavigationModuleJerarquiaComponent } from './pages/module-theme copy 2/navigation/navigation.component';
import { NavigationModuleEvaluacionComponent } from './pages/module-theme copy 3/navigation/navigation.component';


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
    component: DashboardComponent
  },
  {
    path: "Datos",
    component: NavigationComponentModule
  },
  {
    path: "Operadores",
    component: NavigationModuleOperadorComponent
  },
  {
    path: "Jerarquía de operadores",
    component: NavigationModuleJerarquiaComponent
  },
  {
    path: "Evaluación de expresiones",
    component: NavigationModuleEvaluacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
