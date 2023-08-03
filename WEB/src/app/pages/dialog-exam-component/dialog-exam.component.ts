import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Answer } from "src/app/models/Answer.mode";
import { Question } from "src/app/models/Question.model";
import { DialogFile } from "src/app/models/dialogFile.mode";
import { AuthService } from "src/app/services/auth.service";
import { UcsService } from "src/app/services/ucs.service";

@Component({
  selector: "dialog-exam",
  templateUrl: "./dialog-exam.component.html",
  styleUrls: ["./dialog-exam.component.css"]
})

export class DialogExamComponent implements OnInit {

  questionComboBox = new Array<Question>();
  answerComboBox = new Array<Answer>();

  selectedAnswer: Answer;
  idModulo: number = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ucsService: UcsService
  ) { }

  ngOnInit() {
    this.idModulo = this.data.idModule;
    this.getAllQuestions(this.idModulo);
    this.getAllAsnwer();
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
}
