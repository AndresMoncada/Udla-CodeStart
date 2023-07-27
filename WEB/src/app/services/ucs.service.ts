import { environment } from "src/environments/environments";
import { Module } from "../dashboard/models/Module.model";
import { HttpClient } from "@angular/common/http"; 7
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Topic } from "../pages/module-theme/models/Topic.model";
import { Concept } from "../pages/module-theme/models/Concept.model";
import { Example } from "../pages/module-theme/models/Example.model";

@Injectable({
  providedIn: 'root'
})

export class UcsService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.baseUrl}/Moddle/getAllModules`);
  }

  getTopicsById(idMoodle: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/Topic/getTopicsById/${idMoodle}`);
  }

  getConceptsById(): Observable<Concept[]> {
    return this.http.get<Concept[]>(`${this.baseUrl}/Concept/getConceptsById`);
  }

  getExamplesById(): Observable<Example[]> {
    return this.http.get<Example[]>(`${this.baseUrl}/Example/getExamples`);
  }
}
