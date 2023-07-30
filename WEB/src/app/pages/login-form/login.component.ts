import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AuthForm } from "src/app/models/Auth.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "UCS-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  imagenURL = '../../../assets/img/Codestart-removebg-preview.png';
  form: FormGroup;
  formDataModel: AuthForm = new AuthForm();


  constructor(
    private router: Router,
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.builder.group(
      {
        userName: [this.formDataModel.userName, Validators.required],
        password: [this.formDataModel.password, Validators.required]
      });
  }

  loginToDashboard() {
    if (this.form.valid) {
      this.auth.logIn(this.form.value).subscribe({
        next: (res) => {
          this.form.reset();
          this.toast.success({detail:"Proceso exitoso", summary:"El registro fue exitoso", duration: 5000});
          this.auth.storeToken(res.token);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.error({detail:"Algo ha ido mal", summary:"Hay un error en el inicio de sesión", duration: 5000});
        }
      });
    }else{
      this.toast.error({detail:"Formulario inválido", summary:"Por favor completa los campos", duration: 5000});
    }
  }
}

