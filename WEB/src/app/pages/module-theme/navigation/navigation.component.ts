import { Component, HostListener, NgModule, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UcsService } from '../../../services/ucs.service';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/Topic.model';
import { Concept } from 'src/app/models/Concept.model';
import { Example } from 'src/app/models/Example.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExamComponent } from '../../dialog-exam-component/dialog-exam.component';
import { Module } from 'src/app/models/Module.model';
import { UserStoreService } from 'src/app/services/userStore.service';

export interface Section {
  name: string;
  icon: string;
}
export interface Section2 {
  name: string;
}

@Component({
  selector: 'app-navigation-module',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponentModule {

  imagenURL = '../../../assets/img/CodeStart (3).png';
  imagenURL2 = '../../../assets/img/Codestart__2.png';

  userName: string = "No toma";
  idUser: number = 0;
  public currentPos: number = 0;

  faStar = faStar;
  fachevronleft = faChevronLeft;
  fachevronrigth = faChevronRight;

  topicComboBox = new Array<Topic>();
  conceptComboBox = new Array<Concept>();
  examplesComboBox = new Array<Example>();
  moodleComboBox = new Array<Module>();

  currentIndex = 0;
  currentTopic: Topic;

  completedTopic: boolean = false;
  countTopic: number = 0;

  opened: boolean = false;
  idModule: number = 1;

  constructor(private ucsService: UcsService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userStore: UserStoreService) { }

  async ngOnInit() {
    await this.getDataUrl();
    await this.getAllTopics(this.idModule);
    this.getUserName();
    this.getAllConcepts();
    this.getAllExamples();
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  async getUserName() {
    await this.userStore.getUserNameFromStore().subscribe(async (data) => {
      let userInfo = await this.auth.getUserNameFromToken();
      this.userName = data || userInfo;
      this.getIdUser(this.userName);
    })
  }

  async getIdUser(userName: string) {
    this.ucsService.getIdUser(userName).subscribe(async (data) => {
      this.idUser = data;
      this.getCountTopic(this.idUser);
    })
  }

  getDataUrl() {
    this.idModule = this.route.snapshot.params["id"];
  }

  async getAllTopics(id: number) {
    await this.ucsService.getTopicsById(id).subscribe(data => {
      this.topicComboBox = data;
    });
  }

  async getAllConcepts() {
    await this.ucsService.getConceptsById().subscribe(data => {
      this.conceptComboBox = data;
    });
  }

  goToModule(direct: string, idModulo: number) {
    this.router.navigate(['Module', idModulo]);
  }
  getAllExamples() {
    this.ucsService.getExamplesById().subscribe(data => {
      this.examplesComboBox = data;
    });
  }

  getUserTopic(idTopic: number) {
    this.ucsService.getUserTopic(idTopic, this.idUser).subscribe(data => {
      this.completedTopic = data;
    });
  }

  async getCountTopic(idUser: number) {
    const idTopicArray: number[] = this.topicComboBox.map(topic => topic.idTopic);
    const idTopicString = idTopicArray.join(',');
    await this.ucsService.getCountTopic(idTopicString, idUser).subscribe(data => {
      this.countTopic = data;
      this.completedTopic = this.countTopic == this.topicComboBox.length;
    });
  }

  getFilteredExamplesBool(idTopic: number): boolean {
    const filteredExamples = this.examplesComboBox.filter(example => example.idTopic === idTopic);
    return filteredExamples.length > 0;
  }

  getFilteredExamples(idTopic: number): any {
    const filteredExamples = this.examplesComboBox.filter(example => example.idTopic === idTopic);
    return filteredExamples;
  }

  getFilteredConcepts(idTopic: number): any {
    const filteredConcepts = this.conceptComboBox.filter(concept => concept.idTopic === idTopic);
    return filteredConcepts;
  }

  scrollToCard(idTopicOrder: number) {
    this.currentPos = idTopicOrder - 1;
  }

  loginToDashboard() {
    this.router.navigate(['dashboard']);
  }

  exitApp() {
    this.auth.logOut();
  }

  openExamModule() {
    let width: string = 1000 + "px";
    const dialogRef = this.dialog.open(DialogExamComponent, {
      disableClose: false,
      backdropClass: 'for-dialog-class',
      // width: width,
      // height: heigth,
      data: {
        widthHeader: width,
        templateNumber: 1,
        backgroundColor: "green",
        idModule: this.idModule
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      // if (result) {
      //   this.servicioAlistamientoParam = result.parametersPorRadicar;
      //   this.filterHasValue = this.checkIfParameterHasValue();
      //   if (this.filterHasValue || (!this.filterHasValue && hasValue)) {
      //     this.getServicioResumen();
      //   }
      // }
    });

  }

  nextQuestion() {
    this.currentPos++;
  }

  previousQuestion() {
    this.currentPos--;
  }

  handleCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    const idTopicArray: number[] = this.topicComboBox.map(topic => topic.idTopic);
    const idTopicString = idTopicArray.join(',');
    if (isChecked) {
      this.ucsService.markAsView(idTopicString, this.idUser).subscribe();
      this.getCountTopic(this.idUser);
      this.completedTopic = true;
    } else {
      this.ucsService.unmarkAsView(idTopicString, this.idUser).subscribe();
      this.getCountTopic(this.idUser);
      this.completedTopic = false;
    }
  }


}
