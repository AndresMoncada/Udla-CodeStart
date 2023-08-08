import { environment } from "src/environments/environments";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Topic } from 'src/app/models/Topic.model';
import { Concept } from 'src/app/models/Concept.model';
import { Example } from 'src/app/models/Example.model';
import { Module } from "../models/Module.model";
import { Question } from "../models/Question.model";
import { Answer } from "../models/Answer.mode";

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

  getAllQuestionsById(idMoodle: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/Exam/getQuestionById/${idMoodle}`);
  }

  getAllAnswerById(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseUrl}/Exam/getAnswers`);
  }

  getUserTopic(idTopic: number, idUser: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/Exam/getCheckTopic/${idTopic}/${idUser}`);
  }

  getCountTopic(idTopic: string, idUser: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/Exam/getCountTopic/${idTopic}/${idUser}`);
  }

  getIdUser(userName: string): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/User/getIdUser/${userName}`);
  }

  markAsView(idTopic: string, idUser: number) {
    const requestBody = {
      idTopic: idTopic,
      idUser: idUser
    };
    return this.http.post<any>(`${this.baseUrl}/User/markAsView`, requestBody);
  }

  unmarkAsView(idTopic: string, idUser: number) {
    const requestBody = {
      idTopic: idTopic,
      idUser: idUser
    };
    return this.http.post<any>(`${this.baseUrl}/User/unmarkAsView`, requestBody);
  }
}
