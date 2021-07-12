/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.questionContainer = document.querySelectorAll('.js-questionContainer');
  }

  getQuestions() {
    console.log(this.questions[this.index]);
    return this.questions[this.index];
  }

  userAnswer(answers, target) {
    if (answers === this.getQuestions().answer) {
      this.score += this.getQuestions().points;
      for (let index = 0; index < this.questionContainer.length; index += 1) {
        target.classList.add('correct');
      }
      console.log(this.score);
    } else {
      target.classList.add('wrong');
      this.score += 0;
    }
  }

  nextQuestion() {
    this.index += 1;
    this.questionContainer.forEach((element) => {
      element.classList.remove('wrong');
      element.classList.remove('correct');
    });
  }

  end() {
    return this.index === this.questions.length;
  }
}
