import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserStoreService {

  private userName$ = new BehaviorSubject<string>("");
  constructor() { }

  public getUserNameFromStore() {
    return this.userName$.asObservable();
  }

  public setUserNameForStore(userName: string) {
    this.userName$.next(userName);
  }
}

