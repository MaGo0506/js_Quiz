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

  /**
   * Getting the current questions properties
   */
  getQuestions() {
    return this.questions[this.index];
  }

  /**
   * Getting the current chekbox and radio buttons options
   */
  getOptions() {
    return this.questions[this.index].answers;
  }

  /**
   *  Here we are checking if the answer is true and displaying,
   *  green or red on the option to display if it is correct or not
   * @param {*} answers - the answer we are checking if it is true
   * @param {*} target - the class that we want to change the color to correct or wrong
   */
  userAnswer(answers, target) {
    if (answers === 'true') {
      this.score += this.getQuestions().points;
      target.classList.add('correct');
    } else {
      target.classList.add('wrong');
      this.score += 0;
    }
  }

  /**
   * Disabling inputs when we confirm our answer
   * @param {*} buttons - the inputs we want to disable
   */
  disableBtns(buttons) {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].setAttribute('disabled', true);
    }
  }

  /**
   * Enabling inputs when we go to next question
   * @param {*} buttons - the inputs we are enabling
   */
  enableBtns(buttons) {
    for (let index = 0; index < buttons.length; index += 1) {
      buttons[index].removeAttribute('disabled');
    }
  }

  /**
   * When we go to next question removes all status classes
   * @param {*} question - the input we are checking if it is checked
   */
  nextQuestion(question) {
    if (question.checked && !this.getQuestions().isCheckInput) {
      if (this.questionContainer) {
        this.questionContainer.forEach((quesContainer) => {
          quesContainer.classList.remove('wrong');
          quesContainer.classList.remove('correct');
          this.answerText.classList.remove('active');
        });
      }
    } else if (question.checked && this.getQuestions().isCheckInput) {
      this.multiQuestionContainer.forEach((multiQues) => {
        multiQues.classList.remove('wrong');
        multiQues.classList.remove('correct');
        this.multiAnswerText.classList.remove('active');
      });
    } else if (this.getQuestions().inputQuestion) {
      if (this.inputQuestionContainer && this.inputAnswerText) {
        this.inputQuestionContainer.classList.remove('wrong');
        this.inputQuestionContainer.classList.remove('correct');
        this.inputAnswerText.classList.remove('active');
      }
    }
  }

  /**
   * We are checking if the input matches the answer in our question array
   * @param {*} input - the input we are checking
   * @param {*} target - the target wich class we are affecting
   */
  checkInputAnswer(input, target) {
    if (input === this.getQuestions().answer) {
      this.score += this.getQuestions().points;
      target.classList.add('correct');
    } else {
      this.score += 0;
      target.classList.add('wrong');
      if (this.inputAnswerText) {
        this.inputAnswerText.classList.add('active');
        this.inputAnswerText.innerHTML = `The correct answer is: ${this.getQuestions().answer}`;
      }
    }
  }

  /**
   * We are getting the user final score and checking if he passed or not
   * @param {*} targetPass - the text we dispplay if user passes
   * @param {*} targetFail - the text we display if the user fails
   */
  userScore(targetPass, targetFail) {
    if (this.mainResult) {
      this.mainResult.classList.add('active');
    }
    if (this.score > 75 && this.passContainer) {
      targetPass.innerHTML = `You have passed :) ! Congratulations you have scored ${this.score} out of ${this.maxScore}.`;
      this.passContainer.classList.add('active');
    } else if (this.failContainer) {
      targetFail.innerHTML = `You have failed :( ! You have scored ${this.score} out of ${this.maxScore}, better luck next time!`;
      this.failContainer.classList.add('active');
    }
  }

  /**
   * We are giving out questions animation to slide from bottom
   * @param {*} target - the target we are animating
   */
  questionAnimation(target) {
    target.classList.add('slideUpBottom');
    setTimeout(() => {
      target.classList.remove('slideUpBottom');
      target.classList.remove('slideUp');
    }, 2000);
  }

  /**
   * Checking if the user is at the final question
   */
  end() {
    return this.index === this.questions.length;
  }
}
