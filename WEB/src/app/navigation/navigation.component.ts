import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Section {
  name: string;
  icon: string;
}
export interface Section2 {
  name: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    aprendizaje: Section[] = [
      {
        name: 'Datos',
        icon: 'star_border',
      },
      {
        name: 'Operadores',
        icon: 'star_border',
      },
      {
        name: 'Jerarquía de Operadores',
        icon: 'star_border',
      },
      {
        name: 'Evaluación de Expresiones',
        icon: 'star_border',
      },
    ];
    preferencias: Section2[] = [
      {
        name: 'Perfil',
      },
      {
        name: 'Configuración',
      },
    ];
    imagenURL = '../../../assets/img/CodeStart (3).png';
    imagenURL2 = '../../../assets/img/Codestart__2.png';
    imagenURLIcon = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpublicdomainvectors.org%2Fes%2Fvectoriales-gratuitas%2FIcono-de-Perfil-de-usuario%2F44927.html&psig=AOvVaw33gDiFmS2TxFs_bq38ptLU&ust=1690412303878000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMj45tj6qoADFQAAAAAdAAAAABAE';
}
