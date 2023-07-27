import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "UCS-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

    imagenURL = '../../../assets/img/Codestart-removebg-preview.png';

    constructor(
      private router: Router
    ){}


    ngOnInit(){
    }

    loginToDashboard(){
      this.router.navigate(['dashboard']);
    }
}

