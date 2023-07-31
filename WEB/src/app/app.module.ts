import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-form/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogExamComponent } from './pages/dialog-exam-component/dialog-exam.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponentModule } from './pages/module-theme/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationModuleOperadorComponent } from './pages/module-theme copy/navigation/navigation.component';
import { NavigationModuleJerarquiaComponent } from './pages/module-theme copy 2/navigation/navigation.component';
import { NavigationModuleEvaluacionComponent } from './pages/module-theme copy 3/navigation/navigation.component';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DialogExamComponent,
    NavigationComponentModule,
    NavigationModuleOperadorComponent,
    NavigationModuleJerarquiaComponent,
    NavigationModuleEvaluacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
