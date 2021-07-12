/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
export const pageLoader = () => {
  const loader = document.querySelector('.js-loader');

  window.addEventListener('load', () => {
    if (loader) {
      loader.className += ' hidden';
    }
  });
};
