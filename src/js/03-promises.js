import { refs } from './references';
import { onSubmit } from './functions/functions-promises';

/**
 * Creates promise
 * @function createPromise
 * @param {number} position Number of promise
 * @param {number} delay Form data (first delay + delay step)
 * @returns {Promise} Promise
 */
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position: position,
          delay: delay,
        });
      } else {
        reject({
          position: position,
          delay: delay,
        });
      }
    }, delay);
  });
}

refs.prs_form_element.addEventListener('submit', event => {
  onSubmit(event, createPromise);
});
