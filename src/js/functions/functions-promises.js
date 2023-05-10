import { Notify } from 'notiflix/build/notiflix-notify-aio';

/**
 * @callback callback
 */
/**
 * Gets form data, calls the callback function as many times as entered in the amount field, handles callback(promise)
 * @function onSubmit
 * @param {event} event
 * @param {callback} callback
 */
const onSubmit = (event, callback) => {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  if (delay.value < 0 || step.value < 0 || amount.value <= 0) {
    Notify.failure('Please choose a positive value', {
      width: '260px',
      showOnlyTheLastOne: true,
      position: 'right-bottom',
      distance: '40px',
      timeout: 2000,
      fontSize: '15px',
      borderRadius: '8px',
      cssAnimationStyle: 'from-bottom',
    });
    return;
  }
  let totalDelay = ~~delay.value;

  for (let i = 0; i < amount.value; i++) {
    callback(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position + 1} in ${delay}ms`, {
          width: '260px',
          position: 'right-top',
          distance: '40px',
          fontSize: '15px',
          borderRadius: '8px',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position + 1} in ${delay}ms`, {
          width: '260px',
          position: 'right-top',
          distance: '40px',
          fontSize: '15px',
          borderRadius: '8px',
        });
      });
    totalDelay += ~~step.value;
  }
};

export { onSubmit };
