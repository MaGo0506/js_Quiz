/* eslint-disable linebreak-style */

import '../scss/style.scss';
import { pageLoader } from './app/webpage-loader';
import { Quiz } from './app/quiz';
import { questions } from './app/questions';

pageLoader();

(function () {
  const question = document.querySelector('.js-question');
  const questionText = document.querySelectorAll('.js-questionText');
  const radioBtns = document.querySelectorAll('.js-radioBtn');
  const confirmBtnHolder = document.querySelector('.js-confirmBtnHolder');
  const oneAnswerQuestions = document.querySelector('.js-oneAnswerQuestions');
  const mainStartQuiz = document.querySelector('.js-mainStartQuiz');
  const nextBtn = document.querySelector('.js-nextBtn');
  const category = document.querySelector('.js-category');

  const quiz = new Quiz(questions);

  document.body.addEventListener('click', (e) => {
    const targetBlock = e.target;
    function run() {
      if (!quiz.end()) {
        const currentQuestion = quiz.getQuestions();
        question.innerHTML = currentQuestion.text;
        category.innerHTML = `Category: ${currentQuestion.category}`;

        for (let index = 0; index < questionText.length; index += 1) {
          questionText[index].innerHTML = currentQuestion.options[index];
          radioBtns[index].setAttribute('value', questionText[index].innerHTML);
        }
        radioBtns.forEach((radioBtn) => {
          if (radioBtn.checked === true) {
            console.log(true);
            quiz.userAnswer(radioBtn.getAttribute('value'), radioBtn.parentNode);
          }
        });
      } else {
        console.log(`kraj ${quiz.score}`);
      }
    }
    if (e.target.classList.contains('js-confirmBtn')) {
      nextBtn.classList.add('active');
    }

    if (targetBlock === nextBtn) {
      run();
      quiz.nextQuestion();
      nextBtn.classList.remove('active');
      for (let index = 0; index < radioBtns.length; index += 1) {
        radioBtns[index].checked = false;
      }
    }

    if (targetBlock.classList.contains('js-startQuiz')) {
      run();
      mainStartQuiz.classList.add('hidden');
      oneAnswerQuestions.classList.add('active');
      confirmBtnHolder.classList.add('active');
    }
  });
}());
