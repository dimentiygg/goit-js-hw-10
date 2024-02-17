import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.state.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${form.delay.value}ms`);
      }
      reject(`❌ Rejected promise in ${form.delay.value}ms`);
    }, form.delay.value);
  });

  promise.then(res => {
    iziToast.success({
      message: `${res}`,
    });
  });

  promise.catch(res => {
    iziToast.error({
      message: `${res}`,
    });
  });
}
