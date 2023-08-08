import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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
  idUser: number = 0;
  public currentQuestion: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  isClickEnabled: boolean  = true;

  stringCorrectAnswer: string = "";
  isIncorrectAnswer: boolean = false;

  fachevronleft = faChevronLeft;
  farefresh = faRefresh;
  fachevronrigth = faChevronRight;

  questionComboBox = new Array<Question>();
  answerComboBox = new Array<Answer>();

  selectedAnswer: Answer;
  selectedOptionIndex: number = -1;
  idModulo: number = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ucsService: UcsService,
    private userStore: UserStoreService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogExamComponent>
  ) { }

  async ngOnInit() {
    this.idModulo = this.data.idModule;
    await this.getAllQuestions(this.idModulo);
    this.getUserName();
    this.getAllAsnwer();
    this.startCounter();
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
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();
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
    this.isClickEnabled = false;
    var correctAnswer = this.answerComboBox.find(d=> d.idQuestion == this.currentQuestion+1 && d.isCorrect == true);
    if(correctAnswer)
      this.stringCorrectAnswer = correctAnswer.description;
    this.selectedOptionIndex = this.answerComboBox.indexOf(option);
    if (currentQno === this.questionComboBox.length) {
      this.stopCounter();
    }
    if (option.isCorrect) {
      this.correctAnswer++;
    } else {
        this.inCorrectAnswer++;
        this.isIncorrectAnswer = true;
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
    }, 60000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.isClickEnabled = true;
    this.isIncorrectAnswer = false;
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions(this.idModulo);
    this.correctAnswer = 0;
    this.inCorrectAnswer = 0;
    this.isQuizCompleted = false;
    this.counter = 60;
    this.currentQuestion = 0;
  }

  goToRevision(){
    this.isQuizCompleted = true;
  }

  finishQuiz(){
    this.ucsService.markPass(this.idModulo, this.idUser).subscribe();
    this.dialogRef.close();
  }

}
