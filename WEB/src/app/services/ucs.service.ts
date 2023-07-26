import { environment } from "src/environments/environments";
import { Module } from "../dashboard/models/Module.model";
import { HttpClient } from "@angular/common/http";7
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UcsService{
    private baseUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ){}

    getAllModules(): Observable<Module[]>{
        return this.http.get<Module[]>(`${this.baseUrl}/Moddle/getAllModules`);
    }
}
