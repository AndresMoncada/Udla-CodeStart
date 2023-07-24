import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "UCS-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"]
})

export class LoginFormComponent implements OnInit{

    dialogForm: FormGroup;

    mensajeError: string = "Usuario o contraseña incorrecto"


    constructor(
        private builder: FormBuilder,
    ){}

    ngOnInit()
    {
        this.initForm();
    }

    initForm(){
        this.dialogForm = this.builder.group({
            user: "",
            password:""
        })
    }
}