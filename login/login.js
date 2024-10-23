//! Login System Settings

// legend languages
    //? blue line comments = English
    //* comentários de linha verde = Português 


// Simulando um sistema de cadastro e login com LocalStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Referências aos elementos da página
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
const registerBtn = document.getElementById('register-btn');

// Função para redirecionar para a interface principal do To-Do List
function redirectToTodoList() {
  window.location.href = '/dashboard/todolist.html';
}

// Função para validação de email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showValidation(input, isValid) {
  const inputGroup = input.parentElement;
  const icon = inputGroup.querySelector('.input-icon');

  if (isValid) {
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
  } else {
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
  }
}

// Função de login
function login(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const user = users.find(user => user.email === email && user.password === password);

  if (!validateEmail(email)) {
    message.textContent = 'Email inválido!';
    showValidation(emailInput, false);
    return;
  }

  if (user) {
    message.textContent = 'Login bem-sucedido! Redirecionando...';
    message.style.color = 'green';
    setTimeout(redirectToTodoList, 1000);
  } else {
    message.textContent = 'Verifique sua senha e tente novamente!';
    message.style.color = 'red';
    showValidation(passwordInput, false);
  }
}

// Função de cadastro
function register() {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email === '' || password === '') {
    message.textContent = 'Preencha todos os campos!';
    message.style.color = 'red';
    return;
  }

  const userExists = users.some(user => user.email === email);

  if (userExists) {
    message.textContent = 'Usuário já está cadastrado!';
    message.style.color = 'red';
  } else {
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    message.textContent = 'Cadastro bem-sucedido! Redirecionando...';
    message.style.color = 'green';
    setTimeout(redirectToTodoList, 1000);
  }
}

loginForm.addEventListener('submit', login);
registerBtn.addEventListener('click', register);

//!endingOfSystem ///////////////////////////////////////////////////////////////////////////