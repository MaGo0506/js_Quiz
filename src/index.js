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

  function formatString(string) {
    return string
      .replace(/(\B)[^ ]*/g, (match) => (match.toLowerCase()))
      .replace(/^[^ ]/g, (match) => (match.toUpperCase()));
  }

  document.body.addEventListener('click', (e) => {
    const targetBlock = e.target;
    function run() {
      if (!quiz.end()) {
        const currentQuestion = quiz.getQuestions();
        const quesOptions = quiz.getOptions();

        if (currentQuestion.inputQuestion === false) {
          if (question && category) {
            question.innerHTML = currentQuestion.text;
            category.innerHTML = `Category: ${currentQuestion.category}`;
          }

          for (let index = 0; index < quesOptions.length; index += 1) {
            if (questionText && radioBtns) {
              questionText[index].innerHTML = quesOptions[index].option;
              radioBtns[index].setAttribute('value', questionText[index].innerHTML);
              radioBtns[index].setAttribute('correct', quesOptions[index].correct);
            }
          }
          if (currentQuestion.isCheckInput === true) {
            if (oneAnswerQuestions && multiAnsQuestion) {
              oneAnswerQuestions.classList.remove('active');
              multiAnsQuestion.classList.add('active');
            }
            if (multiQuestion) {
              multiQuestion.innerHTML = `${currentQuestion.text} *select two answers`;
              multiCategory.innerHTML = `Category: ${currentQuestion.category}`;
            }
            for (let i = 0; i < multiOption.length; i += 1) {
              if (multiOption && checkBox) {
                multiOption[i].innerHTML = quesOptions[i].option;
                checkBox[i].setAttribute('value', multiOption[i].innerHTML);
                checkBox[i].setAttribute('correct', quesOptions[i].correct);
              }
            }
          }
        } else if (currentQuestion.inputQuestion === true) {
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
    }
    if (e.target.classList.contains('js-confirmBtn')) {
      const currentQuestion = quiz.getQuestions();
      setTimeout(() => {
        if (nextBtn) {
          nextBtn.classList.add('active');
        }
      }, 3000);
      if (confirmBtn) {
        confirmBtn.classList.remove('active');
      }
      if (currentQuestion.isCheckInput === false && currentQuestion.inputQuestion === false) {
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
      } else if (currentQuestion.isCheckInput === true && currentQuestion.inputQuestion === false) {
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
      } else if (currentQuestion.inputQuestion === true) {
        if (inputQuestion && answerInput) {
          inputQuestions.classList.add('slideUp');
          answerInput.setAttribute('disabled', true);
          quiz.checkInputAnswer(formatString(answerInput.value), answerInput.parentNode);
        }
      }
    }

    if (targetBlock === nextBtn) {
      const currentQuestion = quiz.getQuestions();
      if (nextBtn && confirmBtn) {
        nextBtn.classList.remove('active');
        confirmBtn.classList.remove('active');
        setTimeout(() => {
          confirmBtn.classList.add('active');
        }, 2000);
      }
      if (currentQuestion.isCheckInput === false && currentQuestion.inputQuestion === false) {
        if (quiz && radioBtns) {
          quiz.questionAnimation(oneAnswerQuestions);
          for (let index = 0; index < radioBtns.length; index += 1) {
            quiz.nextQuestion(radioBtns[index]);
            radioBtns[index].checked = false;
            quiz.enableBtns(radioBtns);
          }
        }
      } else if (currentQuestion.isCheckInput === true && currentQuestion.inputQuestion === false) {
        if (quiz && checkBox) {
          quiz.questionAnimation(multiAnsQuestion);
          for (let i = 0; i < checkBox.length; i += 1) {
            quiz.nextQuestion(checkBox[i]);
            checkBox[i].checked = false;
            quiz.enableBtns(checkBox);
          }
        }
      } else if (currentQuestion.inputQuestion === true) {
        if (quiz && answerInput) {
          quiz.questionAnimation(inputQuestions);
          answerInput.removeAttribute('disabled');
          quiz.nextQuestion(answerInput);
          answerInput.value = '';
        }
        quiz.index += 1;
      }
      run();
    }

    if (targetBlock.classList.contains('js-startQuiz')) {
      run();
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
