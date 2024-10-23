//! system.01=localhostLOginx-server(To-DoList) *WITH SUGAR SINTAX*

//TODO/ Login sytem
/*legend languages:=
    //? blue line comments = English
    //* comentários de linha verde = Português 
*/

//? ./en-us: Simulating a registration and login system with LocalStorage
//* ./pt-br: Simulando um sistema de cadastro e login com LocalStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

//? ./en-us: References to elements on the page
//* ./pt-br: Referências aos elementos da página
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
const registerBtn = document.getElementById('register-btn');

//? ./en-us: Function to redirect to the main To-Do List interface
//* ./pt-br: Função para redirecionar para a interface principal do To-Do List
const redirectToTodoList = () => window.location.href = 'todolist.html';

//? ./en-us Login function using arrow functions and ternary
//* ./pt-br Função de login usando arrow functions e ternário
const login = (e) => {
  e.preventDefault();
  
  const { value: email } = emailInput;
  const { value: password } = passwordInput;
  
  const user = users.find(({ email: userEmail, password: userPassword }) => userEmail === email && userPassword === password);

  message.textContent = user 
    ? 'Login bem-sucedido! Redirecionando...'
    : 'Email ou senha incorretos!';
  
  message.style.color = user ? 'green' : 'red';

  if (user) setTimeout(redirectToTodoList, 1000);
};

//? ./en-us: Register function using destructuring and ternary operator
//* ./pt-br: Função de cadastro usando desestruturação e operador ternário
const register = () => {
  const { value: email } = emailInput;
  const { value: password } = passwordInput;
  
  if (!email || !password) {
    message.textContent = 'Preencha todos os campos!';
    message.style.color = 'red';
    return;
  }

  const userExists = users.some(({ email: userEmail }) => userEmail === email);

  message.textContent = userExists 
    ? 'Usuário já cadastrado!' 
    : 'Cadastro bem-sucedido! Redirecionando...';
  
  message.style.color = userExists ? 'red' : 'green';

  if (!userExists) {
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users)); // Salva no LocalStorage
    setTimeout(redirectToTodoList, 1000);
  }
};

//! Events
loginForm.addEventListener('submit', login);
registerBtn.addEventListener('click', register);

//!endingOfSystem ///////////////////////////////////////////////////////////////////////////