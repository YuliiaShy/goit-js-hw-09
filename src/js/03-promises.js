import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
    });
};
 
function calculationDataPromise({ delay, step, amount }) {
  let sumDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, sumDelay)
      .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
    sumDelay += step;
  }
}

function onSubmit(event) {
  event.preventDefault();

  const value = {
    delay: Number(delayEl.value),
    step: Number(stepEl.value),
    amount: Number(amountEl.value)
  };
calculationDataPromise(value);
}

  
