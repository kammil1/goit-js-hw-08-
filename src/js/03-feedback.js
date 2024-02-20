import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input[name="email"]');
const inputMessage = form.querySelector('textarea[name="message"]');
const btnSubmit = form.querySelector('button[type="submit"]');

form.addEventListener(
  'input',
  throttle(() => {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({
        email: inputEmail.value,
        message: inputMessage.value,
      })
    );
    // btnSubmit.disabled = !(inputEmail.value && inputMessage.value);
  }, 500)
);

const currentInput = () => {
  const storage = localStorage.getItem('feedback-form-state');
  if (storage) {
    const jsonTransition = JSON.parse(storage);
    inputEmail.value = jsonTransition.inputEmail;
    inputMessage.value = jsonTransition.inputMessage;
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const dataSet = {
    email: inputEmail.value.trim(),
    message: inputMessage.value.trim(),
  };
  if (dataSet.email === '' || dataSet.message === '') {
    alert('Wypełnij wszystkie pola');
  }

  console.log({
    email: inputEmail.value,
    message: inputMessage.value,
  });

  localStorage.removeItem('feedback-form-state');
  form.reset();

  inputEmail.value = '';
  inputMessage.value = '';
  // btnSubmit.disabled = true;
});
