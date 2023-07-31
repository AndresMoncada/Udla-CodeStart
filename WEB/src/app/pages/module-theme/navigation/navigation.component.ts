import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UcsService } from '../../../services/ucs.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/Topic.model';
import { Concept } from 'src/app/models/Concept.model';
import { Example } from 'src/app/models/Example.model';
import { AuthService } from 'src/app/services/auth.service';

export interface Section {
  name: string;
  icon: string;
}
export interface Section2 {
  name: string;
}

@Component({
  selector: 'app-navigation-module',
  templateUrl:'./navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponentModule {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  subIndice: Section2[] = [
    {
      name: 'Aprende',
    },
    {
      name: 'Ejemplo',
    },
  ];
  imagenURL = '../../../assets/img/CodeStart (3).png';
  imagenURL2 = '../../../assets/img/Codestart__2.png';


  faStar = faStar;
  topicComboBox = new Array<Topic>();
  conceptComboBox = new Array<Concept>();
  examplesComboBox = new Array<Example>();

  idModule: number=1;

  constructor(private ucsService: UcsService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDataUrl();
    this.getAllTopics(this.idModule);
    this.getAllConcepts();
    this.getAllExamples();
  }

  getDataUrl(){
    this.idModule = this.route.snapshot.params["id"];
  }

  async getAllTopics(id:number){
    await this.ucsService.getTopicsById(id).subscribe(data =>{
      this.topicComboBox = data;
    });
  }

  getAllConcepts(){
    this.ucsService.getConceptsById().subscribe(data =>{
      this.conceptComboBox = data;
    });
  }

  getAllExamples(){
    this.ucsService.getExamplesById().subscribe(data =>{
      this.examplesComboBox = data;
    });
  }

  getFilteredExamples(idTopic: number): boolean {
    const filteredExamples = this.examplesComboBox.filter(example => example.idTopic === idTopic);
    return filteredExamples.length > 0;
  }

  scrollToCard(idTopic: number) {
    const element = document.getElementById(idTopic.toString());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth',block: 'center' });
    }
  }

  loginToDashboard(){
    this.router.navigate(['dashboard']);
  }

  exitApp() {
    this.auth.logOut();
  }
}
