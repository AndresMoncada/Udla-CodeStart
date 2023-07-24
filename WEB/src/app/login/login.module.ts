import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form/login-form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginFormComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule
    ]
})

export class LoginModule{}