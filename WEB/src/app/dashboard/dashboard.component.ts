import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UcsService } from '../services/ucs.service';
import { Module } from './models/Module.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent2 implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  moodleComboBox = new Array<Module>();

  constructor(private ucsService: UcsService,
      private router: Router
    ){}

  ngOnInit(){
    this.getAllMoodles();
  }

  goToModule(direct: string){
      this.router.navigate([direct]);
  }
  async getAllMoodles(){
    await this.ucsService.getAllModules().subscribe(data =>{
      this.moodleComboBox = data;
    });
  }
}
