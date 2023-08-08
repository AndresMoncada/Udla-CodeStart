import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Answer } from "src/app/models/Answer.mode";
import { Question } from "src/app/models/Question.model";
import { DialogFile } from "src/app/models/dialogFile.mode";
import { AuthService } from "src/app/services/auth.service";
import { UcsService } from "src/app/services/ucs.service";
import { interval } from 'rxjs';
import { UserStoreService } from "src/app/services/userStore.service";
import { faChevronLeft, faChevronRight, faRefresh } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "dialog-exam",
  templateUrl: "./dialog-exam.component.html",
  styleUrls: ["./dialog-exam.component.css"]
})

export class DialogExamComponent implements OnInit {

  public userName: string = "";
  public currentQuestion: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;

  fachevronleft = faChevronLeft;
  farefresh = faRefresh;
  fachevronrigth = faChevronRight;

  questionComboBox = new Array<Question>();
  answerComboBox = new Array<Answer>();

  selectedAnswer: Answer;
  idModulo: number = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ucsService: UcsService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.idModulo = this.data.idModule;
    this.getAllQuestions(this.idModulo);
    this.getAllAsnwer();
    this.startCounter();
  }

  async getUserName() {
    this.userStore.getUserNameFromStore().subscribe(async (data) => {
      let userInfo = await this.auth.getUserNameFromToken();
      this.userName = data || userInfo;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  async getAllQuestions(id: number) {
    await this.ucsService.getAllQuestionsById(id).subscribe(data => {
      this.questionComboBox = data;
    });
  }

  async getAllAsnwer() {
    await this.ucsService.getAllAnswerById().subscribe(data => {
      this.answerComboBox = data;
    });
  }

  answer(currentQno: number, option: any) {

    if (currentQno === this.questionComboBox.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.correctAnswer++;
      setTimeout(() => {
        // this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        // this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions(this.idModulo);
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }


  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionComboBox.length) * 100).toString();
    return this.progress;
  }
}
