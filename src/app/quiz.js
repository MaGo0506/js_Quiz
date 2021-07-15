/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.score = 0;
    this.maxScore = 100;
    this.questionContainer = document.querySelectorAll('.js-questionContainer');
    this.multiQuestionContainer = document.querySelectorAll('.js-multiQuestionContainer');
    this.multiAnswerText = document.querySelector('.js-multiAnswerText');
    this.answerText = document.querySelector('.js-answerText');
    this.inputQuestionContainer = document.querySelector('.js-inputQuestionContainer');
    this.inputAnswerText = document.querySelector('.js-inputAnswerText');
    this.mainResult = document.querySelector('.js-mainResult');
    this.passContainer = document.querySelector('.js-passContainer');
    this.failContainer = document.querySelector('.js-failContainer');
  }

  getQuestions() {
    return this.questions[this.index];
  }

  getOptions() {
    return this.questions[this.index].answers;
  }

  userAnswer(answers, target) {
    if (answers === 'true') {
      this.score += this.getQuestions().points;
      target.classList.add('correct');
    } else {
      target.classList.add('wrong');
      this.score += 0;
    }
  }

  disableBtns(buttons) {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].setAttribute('disabled', true);
    }
  }

  enableBtns(buttons) {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].removeAttribute('disabled');
    }
  }

  nextQuestion(question) {
    if (question.checked && this.getQuestions().isCheckInput === false) {
      this.questionContainer.forEach((quesContainer) => {
        quesContainer.classList.remove('wrong');
        quesContainer.classList.remove('correct');
        this.answerText.classList.remove('active');
      });
    } else if (question.checked && this.getQuestions().isCheckInput === true) {
      this.multiQuestionContainer.forEach((multiQues) => {
        multiQues.classList.remove('wrong');
        multiQues.classList.remove('correct');
        this.multiAnswerText.classList.remove('active');
      });
    } else if (this.getQuestions().inputQuestion === true) {
      this.inputQuestionContainer.classList.remove('wrong');
      this.inputQuestionContainer.classList.remove('correct');
      this.inputAnswerText.classList.remove('active');
    }
  }

  checkInputAnswer(input, target) {
    if (input === this.getQuestions().answer) {
      this.score += this.getQuestions().points;
      target.classList.add('correct');
    } else {
      this.score += 0;
      target.classList.add('wrong');
      this.inputAnswerText.classList.add('active');
      this.inputAnswerText.innerHTML = `The correct answer is: ${this.getQuestions().answer}`;
    }
  }

  userScore(targetPass, targetFail) {
    this.mainResult.classList.add('active');
    if (this.score > 75) {
      targetPass.innerHTML = `You have passed :) ! Congratulations you have scored ${this.score} out of ${this.maxScore}.`;
      this.passContainer.classList.add('active');
    } else {
      targetFail.innerHTML = `You have failed :( ! You have scored ${this.score} out of ${this.maxScore}, better luck next time!`;
      this.failContainer.classList.add('active');
    }
  }

  questionAnimation(target) {
    target.classList.add('slideUpBottom');
    setTimeout(() => {
      target.classList.remove('slideUpBottom');
      target.classList.remove('slideUp');
    }, 2000);
  }

  end() {
    return this.index === this.questions.length;
  }
}
