import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formState = form.state.value;
  const formDelay = form.delay.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formState === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${formDelay}ms`);
      } else {
        reject(`❌ Rejected promise in ${formDelay}ms`);
      }
    }, formDelay);
  });

  promise
    .then(res => {
      iziToast.success({
        title: 'OK',
        message: res,
      });
    })
    .catch(res => {
      iziToast.error({
        title: 'Error',
        message: res,
      });
    });
}

// const promise = new Promise((resolve, reject) => {
//   if (form.state.value === 'fulfilled') {
//     resolve(
//       setTimeout(() => {
//         iziToast.success({
//           title: 'OK',
//           message: `✅ Fulfilled promise in ${formDelay}ms`,
//         });
//       }, formDelay)
//     );
//   } else {
//     reject(
//       setTimeout(() => {
//         iziToast.error({
//           title: 'Error',
//           message: `❌ Rejected promise in ${formDelay}ms`,
//         });
//       }, formDelay)
//     );
//   }
// });
