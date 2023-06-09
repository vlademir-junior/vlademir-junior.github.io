const checkbox = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');

// eslint-disable-next-line func-names
checkbox.addEventListener('change', function () { // REQUISITO 18
  submitBtn.disabled = !this.checked;
});

function validateForm() {
  const email = document.getElementsByName('email')[0].value;
  const password = document.getElementsByName('password')[0].value;

  if (email === '' || password === '') {
    alert('Email ou senha inválidos.');
  } else {
    alert('Olá, Tryber!');
  }
}

validateForm();

const textarea = document.getElementById('textarea');
const counter = document.getElementById('counter');

function updateCounter() {
  const remainingChars = 500 - textarea.value.length;
  counter.textContent = remainingChars;

  if (remainingChars < 0) {
    counter.classList.add('counter');
  } else {
    counter.classList.remove('counter');
  }
}

textarea.addEventListener('input', updateCounter);
