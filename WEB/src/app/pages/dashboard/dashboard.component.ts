import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faBars, faStar, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Module } from "src/app/models/Module.model";
import { UcsService } from "src/app/services/ucs.service";
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/userStore.service';

export interface Section {
  name: string;
}
@Component({
  selector: "UCS-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);

  opened: boolean = false;

  preferencias: Section[] = [
    {
      name: 'Perfil',
    },
    {
      name: 'Configuración',
    },
  ];
  imagenURL = '../../../assets/img/CodeStart (3).png';
  imagenURL2 = '../../../assets/img/Codestart__2.png';

  faStar = faStar;
  faUser = faUserCircle;
  faBars = faBars;
  moodleComboBox = new Array<Module>();
  infoMoodle: boolean[] = [];

  userName: string = "";
  idUser: number = 0;

  constructor(private ucsService: UcsService
    , private router: Router
    , private auth: AuthService
    , private userStore: UserStoreService
    , ) { }

  async ngOnInit() {
    this.getUserName();
    await this.getAllMoodles();
  }

  async getUserName() {
    this.userStore.getUserNameFromStore().subscribe(async (data) => {
      let userInfo = localStorage.getItem('user_name');
      if (userInfo !== null) {
        this.userName = data || userInfo;
        this.getIdUser(this.userName);
      }
    })
  }

  async getIdUser(userName: string) {
    this.ucsService.getIdUser(userName).subscribe(async (data) => {
      this.idUser = data;
      this.getInfoMoodle(this.idUser);
    })
  }

  async getAllMoodles() {
    this.ucsService.getAllModules().subscribe(data => {
      this.moodleComboBox = data;
    });
  }

  async getInfoMoodle(idUser: number) {
    this.ucsService.getInfoModules(idUser).subscribe(data => {
      this.infoMoodle = data;
      console.log(this.infoMoodle);
    });
  }

  loginToDashboard() {
    this.router.navigate(['dashboard']);
  }
  goToModule(direct: string, idModulo: number) {
    this.router.navigate(['Module', idModulo]);
  }
  exitApp() {
    this.auth.logOut();
  }

}
