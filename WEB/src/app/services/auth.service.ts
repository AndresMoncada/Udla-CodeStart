import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logIn(userObj: any){
    return this.http.post<any>(`${this.baseUrl}/User/authenticate`, userObj);
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}/User/register`, userObj);
  }

  storeToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
