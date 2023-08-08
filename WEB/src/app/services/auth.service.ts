import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environments";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.apiBaseUrl;
  private userPayload: any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userPayload = this.decodeToken();
    this.saveUserNameToLocalStorage();
  }

  logIn(logObj: any) {
    return this.http.post<any>(`${this.baseUrl}/User/authenticate`, logObj);
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/User/addUser`, userObj);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const actualToken = this.getToken();
    return jwtHelper.decodeToken(actualToken ?? "");
  }

  saveUserNameToLocalStorage() {
    const userName = this.getUserNameFromToken();
    if (userName) {
      localStorage.setItem('user_name', userName);
    }
  }

  getIdUserFromToken(){
    if (this.userPayload)
    return this.userPayload.name;
  }

  getUserNameFromToken() {
    if (this.userPayload)
      return this.userPayload.unique_name;
  }
}

