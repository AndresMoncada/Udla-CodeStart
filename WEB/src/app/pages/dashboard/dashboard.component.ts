import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Module } from "src/app/models/Module.model";
import { UcsService } from "src/app/services/ucs.service";

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

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
  faUser = faUser;
  moodleComboBox = new Array<Module>();

  constructor(private ucsService: UcsService
    , private router: Router) { }

  ngOnInit() {
    this.getAllMoodles();
  }

  async getAllMoodles() {
    await this.ucsService.getAllModules().subscribe(data => {
      this.moodleComboBox = data;
    });
  }
  goToModule(direct: string) {
    this.router.navigate([direct]);
  }
  exitApp() {
    this.router.navigate(['login']);
  }
}
