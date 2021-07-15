/* eslint-disable linebreak-style */
/* eslint-disable one-var */

import '../scss/style.scss';
import { pageLoader } from './app/webpage-loader';
import { Quiz } from './app/quiz';
import { questions } from './app/questions';

pageLoader();

(function () {
  const question = document.querySelector('.js-question'),
    questionText = document.querySelectorAll('.js-questionText'),
    radioBtns = document.querySelectorAll('.js-radioBtn'),
    confirmBtnHolder = document.querySelector('.js-confirmBtnHolder'),
    oneAnswerQuestions = document.querySelector('.js-oneAnswerQuestions'),
    multiAnsQuestion = document.querySelector('.js-multiAnsQuestion'),
    multiOption = document.querySelectorAll('.js-multiOption'),
    multiQuestion = document.querySelector('.js-multiQuestion'),
    checkBox = document.querySelectorAll('.js-checkBox'),
    mainStartQuiz = document.querySelector('.js-mainStartQuiz'),
    nextBtn = document.querySelector('.js-nextBtn'),
    category = document.querySelector('.js-category'),
    multiCategory = document.querySelector('.js-multiCategory'),
    inputQuestions = document.querySelector('.js-inputQuestions'),
    inputQuestion = document.querySelector('.js-inputQuestion'),
    inputCategory = document.querySelector('.js-inputCategory'),
    answerInput = document.querySelector('.js-answerInput'),
    mainHeader = document.querySelector('.js-mainHeader'),
    confirmBtn = document.querySelector('.js-confirmBtn'),
    quiz = new Quiz(questions);

  /**
   * We are formating the text entered so it matches the answer
   * @param {*} string - The string we want to adjust
   */
  function formatString(string) {
    return string
      .replace(/(\B)[^ ]*/g, (match) => (match.toLowerCase()))
      .replace(/^[^ ]/g, (match) => (match.toUpperCase()));
  }

  /**
   * Here we are creating out result elements
   * and appending them to pass or fail parent
   */
  function quizResults() {
    const quizPass = document.createElement('h1');
    const quizFail = document.createElement('h1');
    if (quiz) {
      quiz.passContainer.appendChild(quizPass);
      quiz.failContainer.appendChild(quizFail);
    }
    if (confirmBtnHolder && inputQuestions) {
      confirmBtnHolder.classList.remove('active');
      inputQuestions.classList.remove('active');
    }
    quiz.userScore(quizPass, quizFail);
  }

  /**
   * We are running the quiz and updating if is a
   * radioBtn question, checkBox question or input question,
   */
  function runQuiz() {
    if (!quiz.end()) {
      const currentQuestion = quiz.getQuestions();
      const quesOptions = quiz.getOptions();

      if (!currentQuestion.inputQuestion) {
        if (question && category) {
          question.innerHTML = currentQuestion.text;
          category.innerHTML = `Category: ${currentQuestion.category}`;
        }
        if (quesOptions) {
          for (let index = 0; index < quesOptions.length; index += 1) {
            if (questionText && radioBtns) {
              questionText[index].innerHTML = quesOptions[index].option;
              radioBtns[index].setAttribute('value', questionText[index].innerHTML);
              radioBtns[index].setAttribute('correct', quesOptions[index].correct);
            }
          }
        }
        if (currentQuestion.isCheckInput) {
          if (oneAnswerQuestions && multiAnsQuestion) {
            oneAnswerQuestions.classList.remove('active');
            multiAnsQuestion.classList.add('active');
          }
          if (multiQuestion) {
            multiQuestion.innerHTML = `${currentQuestion.text} *select two answers`;
            multiCategory.innerHTML = `Category: ${currentQuestion.category}`;
          }
          if (multiOption && checkBox) {
            for (let i = 0; i < multiOption.length; i += 1) {
              multiOption[i].innerHTML = quesOptions[i].option;
              checkBox[i].setAttribute('value', multiOption[i].innerHTML);
              checkBox[i].setAttribute('correct', quesOptions[i].correct);
            }
          }
        }
      } else if (currentQuestion.inputQuestion) {
        if (multiAnsQuestion && inputQuestion) {
          multiAnsQuestion.classList.remove('active');
          inputQuestions.classList.add('active');
          inputQuestion.innerHTML = currentQuestion.text;
        }
        if (inputCategory && answerInput) {
          inputCategory.innerHTML = `Category: ${currentQuestion.category}`;
          answerInput.setAttribute('data', currentQuestion.answer);
        }
      }
    } else {
      quizResults();
    }
  }

  /**
   * When clicked confirm to check if our selected answer is correct
   * @param {*} current - the current question properties
   */
  function confirmRadio(current) {
    if (!current.isCheckInput && !current.inputQuestion) {
      if (oneAnswerQuestions && multiAnsQuestion) {
        oneAnswerQuestions.classList.add('slideUp');
        multiAnsQuestion.classList.add('slideUpBottom');
      }
      if (quiz && radioBtns) {
        quiz.questionAnimation(multiAnsQuestion);
        radioBtns.forEach((radioBtn) => {
          if (radioBtn.checked === true) {
            quiz.disableBtns(radioBtns);
            quiz.userAnswer(radioBtn.getAttribute('correct'), radioBtn.parentNode);
          }
        });
      }
    }
  }

  /**
   * When clicked confirm to check if our selected answers are correct
   * @param {*} current - the current question properties
   */
  function confirmCheckBox(current) {
    if (current.isCheckInput && !current.inputQuestion) {
      if (multiAnsQuestion && inputQuestions) {
        multiAnsQuestion.classList.add('slideUp');
        inputQuestions.classList.add('slideUpBottom');
      }
      if (quiz && checkBox) {
        quiz.questionAnimation(inputQuestions);
        checkBox.forEach((box) => {
          if (box.checked === true) {
            quiz.disableBtns(checkBox);
            quiz.userAnswer(box.getAttribute('correct'), box.parentNode);
          }
        });
      }
    }
  }

  /**
   * When clicked confirm to check if our input matches the answer
   * @param {*} current - the current question properties
   */
  function confirmInput(current) {
    if (current.inputQuestion) {
      if (inputQuestion && answerInput) {
        inputQuestions.classList.add('slideUp');
        answerInput.setAttribute('disabled', true);
        quiz.checkInputAnswer(formatString(answerInput.value), answerInput.parentNode);
      }
    }
  }

  /**
   * When clicked next question it changes to the next one
   * @param {*} current - the current question properties
   */
  function nextRadioQuestion(current) {
    if (!current.isCheckInput && !current.inputQuestion) {
      if (quiz && radioBtns) {
        quiz.questionAnimation(oneAnswerQuestions);
        for (let index = 0; index < radioBtns.length; index += 1) {
          quiz.nextQuestion(radioBtns[index]);
          radioBtns[index].checked = false;
          quiz.enableBtns(radioBtns);
        }
      }
    }
  }

  /**
   * When clicked next question it changes to the next one
   * @param {*} current - the current question properties
   */
  function nextCheckBox(current) {
    if (current.isCheckInput && !current.inputQuestion) {
      if (quiz && checkBox) {
        quiz.questionAnimation(multiAnsQuestion);
        for (let i = 0; i < checkBox.length; i += 1) {
          quiz.nextQuestion(checkBox[i]);
          checkBox[i].checked = false;
          quiz.enableBtns(checkBox);
        }
      }
    }
  }

  /**
   * When clicked next question it changes to the next one
   * @param {*} current - the current question properties
   */
  function nextInputQuestion(current) {
    if (current.inputQuestion) {
      if (quiz && answerInput) {
        quiz.questionAnimation(inputQuestions);
        answerInput.removeAttribute('disabled');
        quiz.nextQuestion(answerInput);
        answerInput.value = '';
      }
    }
  }

  /**
   * Making our doucument clickable
   * and adjusting confirm button and next button
   * for the animations
   */
  document.body.addEventListener('click', (e) => {
    const targetBlock = e.target;
    const currentQuestion = quiz.getQuestions();
    if (targetBlock.classList.contains('js-confirmBtn')) {
      setTimeout(() => {
        if (nextBtn) {
          nextBtn.classList.add('active');
        }
      }, 3000);
      if (confirmBtn) {
        confirmBtn.classList.remove('active');
      }
      confirmRadio(currentQuestion);
      confirmCheckBox(currentQuestion);
      confirmInput(currentQuestion);
    }

    if (targetBlock === nextBtn) {
      if (nextBtn && confirmBtn) {
        nextBtn.classList.remove('active');
        confirmBtn.classList.remove('active');
        setTimeout(() => {
          confirmBtn.classList.add('active');
        }, 2000);
      }
      nextRadioQuestion(currentQuestion);
      nextCheckBox(currentQuestion);
      nextInputQuestion(currentQuestion);
      quiz.index += 1;
      runQuiz();
    }

    /**
    * When start quiz clicked hide certain elements
    * and display questions
    */
    if (targetBlock.classList.contains('js-startQuiz')) {
      runQuiz();
      if (radioBtns && quiz) {
        radioBtns.forEach((radioBtn) => {
          quiz.nextQuestion(radioBtn);
        });
      }
      if (mainStartQuiz && oneAnswerQuestions) {
        mainStartQuiz.classList.add('hidden');
        oneAnswerQuestions.classList.add('active');
      }
      if (confirmBtnHolder && confirmBtn) {
        confirmBtnHolder.classList.add('active');
        confirmBtn.classList.add('active');
      }
      if (mainHeader) {
        mainHeader.classList.add('hidden');
      }
    }
  });
}());
