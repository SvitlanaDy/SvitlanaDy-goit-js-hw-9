// all modules
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const delayInput = document.getElementsByName('delay');
const stepInput = document.getElementsByName('step');
const amountInput = document.getElementsByName('amount');
const formBtn = document.querySelector('button');

formBtn.addEventListener('click', onFormSubmit);

function onFormSubmit(evt){
  evt.preventDefault();
  const amount = amountInput[0].value;
  const delayStep = stepInput[0].value;
  const delayFirst = delayInput[0].value;
  let delay = 0;
  // for (let i = 1; i <= amount; i += 1){
  //   let position = i;
   
    for (let position = 1; position <= Number(amountInput.value); position++) {
      delay = Number(delayInput.value) + Number(stepInput.value) * (position - 1);

    createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
   Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
  }
  form.reset();
}

// formBtn.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   let delay = 0;
//   for (let position = 1; position <= amountInput; position++) {
//   delay = delayFirst + delayStep*(position-1);
//   createPromise (position, delay).then(({ position, delay }) => {
//     Notify.success(`:white_check_mark: Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.failure(`:x: Rejected promise ${position} in ${delay}ms`);
//   });
// };
// })

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      if (shouldResolve){
        resolve ({ position, delay});
      }
      else {
        reject ({ position, delay});
      }
    }, delay);
  });
  
}


