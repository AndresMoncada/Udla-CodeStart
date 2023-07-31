import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthForm } from "src/app/models/Auth.model";
import { AuthService } from "src/app/services/auth.service";
import ValidateForm from "src/app/helper/validatorForm";
import { NotificationService } from "src/app/services/notification.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "UCS-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  imagenURL = '../../../assets/img/Codestart-removebg-preview.png';
  form: FormGroup;
  signUpForm: FormGroup;
  formDataModel: AuthForm = new AuthForm();

  mostrarRegistro = true;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private auth: AuthService,
    private notifyService : NotificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
    this.redirectToDashboard();
  }

  initForm() {
    this.form = this.builder.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });

    this.signUpForm = this.builder.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required]
      });
  }

  redirectToDashboard(){
    if(this.auth.isLoggedIn()){
      this.router.navigate(['dashboard']);
    }
  }

  mostrarContenedor(contenedor: string) {
    if (contenedor === 'registro') {
      this.mostrarRegistro = true;
    } else if (contenedor === 'inicioSesion') {
      this.mostrarRegistro = false;
    }
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  loginToDashboard() {
    if (this.form.valid) {
      this.auth.logIn(this.form.value).subscribe({
        next: (res) => {
          this.form.reset();
          this.notifyService.success("Ahora puede disfrutar de la página", "Inicio de sesión exitoso");
          this.auth.storeToken(res.token);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.notifyService.error(err.error.message, "Parece que algo va mal");
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.form);
      this.notifyService.error("Algunos campos no están completos", "Parece que algo va mal");
    }
  }

  register() {
    if (this.signUpForm.valid) {
      let signUpObj = {
        ...this.signUpForm.value,
        token: ''
      }
      this.auth.signUp(signUpObj).subscribe({
        next: (res) => {
          this.signUpForm.reset();
          this.mostrarRegistro = false;
          this.notifyService.success("Ahora puede iniciar sesión", res.message);
        },
        error: (err) => {
          this.notifyService.error(err.error.message, "Parece que algo va mal");
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      this.notifyService.error("Algunos campos no están completos", "Parece que algo va mal");
    }
  }

}

