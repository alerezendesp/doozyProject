// Simulação de recuperação de dados do usuário no LocalStorage
const user = JSON.parse(localStorage.getItem('currentUser')) || {
    username: 'Usuário',
    email: 'usuario@exemplo.com'
  };
  
  // Referências aos elementos da página
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const profileForm = document.getElementById('profile-form');
  const deleteAccountBtn = document.getElementById('delete-account-btn');
  
  // Preenchendo o formulário com os dados atuais do usuário
  usernameInput.value = user.username;
  emailInput.value = user.email;
  
  // Função para salvar as alterações no perfil
  profileForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const updatedUser = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value || user.password // Manter a senha antiga se o campo de senha estiver vazio
    };
  
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert('Alterações salvas com sucesso!');
  });
  
  // Função para apagar a conta do usuário
  deleteAccountBtn.addEventListener('click', function () {
    const confirmDelete = confirm('Tem certeza que deseja apagar sua conta? Esta ação não pode ser desfeita.');
  
    if (confirmDelete) {
      localStorage.removeItem('currentUser'); // Apagar a conta
      alert('Conta apagada com sucesso!');
      window.location.href = '/login/login.html'; // Redirecionar para a página de login
    }
  });
  