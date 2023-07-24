import { Component, OnInit } from "@angular/core";
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: "UCS-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"]
})

export class LoginFormComponent implements OnInit{

    dialogForm: FormGroup;

    mensajeError: string = "Usuario o contraseña incorrecto"

    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private builder: FormBuilder,
        private modalService: NgbModal
    ){}

    public open(modal: any): void {

        this.modalService.open(modal);
    
      }
      
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