import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    if (form.state.value === 'fulfilled') {
      resolve(
        setTimeout(() => {
          iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${form.delay.value}ms`,
          });
        }, form.delay.value)
      );
    } else {
      reject(
        setTimeout(() => {
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${form.delay.value}ms`,
          });
        }, form.delay.value)
      );
    }
  });
}
promise.then(res => res);
promise.catch(res => res);
