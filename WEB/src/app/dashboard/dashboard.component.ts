import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UcsService } from '../services/ucs.service';
import { Module } from './models/Module.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent2 implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { id: 1, title: 'DATOS', src:"https://i.pinimg.com/564x/16/31/ae/1631aef567d90de0244bbfb5e141a5a5.jpg", cols: 1, rows: 1 },
        { id: 2, title: 'OPERADORES', src:"https://i0.wp.com/lopezdoriga.com/wp-content/uploads/2017/01/vestibulando-prova-matematica-sites-gratuitos-noticias.jpg", cols: 1, rows: 1 },
        { id: 3, title: 'JERARQUÍA DE OPERADORES', src:"https://i.pinimg.com/564x/d0/36/bd/d036bde6abcfab71d6fd3ba55d55d88d.jpg", cols: 1, rows: 1 },
        { id: 4, title: 'EVALUACIÓN DE EXPRESIONES', src:"https://i.pinimg.com/564x/16/31/ae/1631aef567d90de0244bbfb5e141a5a5.jpg", cols: 1, rows: 1 }
      ];
    })
  );

  moodleComboBox = new Array<Module>();

  constructor(private ucsService: UcsService){}

  ngOnInit(){
    this.getAllMoodles(); 
  }

  async getAllMoodles(){
    await this.ucsService.getAllModules().subscribe(data =>{
      this.moodleComboBox = data;
    });
  }
}
