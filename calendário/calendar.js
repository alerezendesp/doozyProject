document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const filter = document.getElementById('filter');
    let selectedDate = null;
  
    // Inicializar FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: function(info) {
        selectedDate = info.dateStr;
        document.querySelectorAll('.fc-day').forEach(day => {
          day.classList.remove('selected-day');
        });
        info.dayEl.classList.add('selected-day');
        carregarTarefas();
      },
      events: function(fetchInfo, successCallback) {
        const datesWithTasks = Object.keys(localStorage).filter(date => {
          return JSON.parse(localStorage.getItem(date)).length > 0;
        });
        successCallback(datesWithTasks.map(date => ({
          title: 'Tarefa',
          date: date,
          color: '#6c5ce7' // Azul predominante
        })));
      }
    });
    calendar.render();
  
    // Função para carregar tarefas da data selecionada
    function carregarTarefas() {
      taskList.innerHTML = '';
      const tarefas = JSON.parse(localStorage.getItem(selectedDate)) || [];
      tarefas.forEach(tarefa => adicionarTarefaNaLista(tarefa));
    }
  
    // Função para adicionar uma nova tarefa
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      if (!selectedDate) {
        alert('Selecione uma data no calendário.');
        return;
      }
  
      const tarefa = {
        descricao: taskInput.value,
        prioridade: priorityInput.value,
        concluida: false // Inicialmente, a tarefa não está concluída
      };
  
      let tarefas = JSON.parse(localStorage.getItem(selectedDate)) || [];
      tarefas.push(tarefa);
      localStorage.setItem(selectedDate, JSON.stringify(tarefas));
  
      adicionarTarefaNaLista(tarefa);
  
      taskInput.value = '';
      calendar.refetchEvents(); // Atualiza os eventos do calendário
    });
  
    // Função para adicionar uma tarefa na lista visual
    function adicionarTarefaNaLista(tarefa) {
      const li = document.createElement('li');
      li.classList.add(tarefa.prioridade);
      li.classList.toggle('checked', tarefa.concluida);
      li.innerHTML = `
        ${tarefa.descricao}
        <div>
          <button class="check-btn ${tarefa.concluida ? 'checked' : ''}">
            <i class="fas fa-check"></i>
          </button>
          <button class="remove-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
  
      const checkBtn = li.querySelector('.check-btn');
      const removeBtn = li.querySelector('.remove-btn');
  
      checkBtn.addEventListener('click', () => {
        tarefa.concluida = !tarefa.concluida;
        li.classList.toggle('checked', tarefa.concluida);
        checkBtn.classList.toggle('checked', tarefa.concluida);
        atualizarTarefa(tarefa);
      });
  
      removeBtn.addEventListener('click', () => {
        removerTarefa(tarefa.descricao);
      });
  
      taskList.appendChild(li);
    }
  
    // Função para atualizar uma tarefa no localStorage
    function atualizarTarefa(tarefaAtualizada) {
      let tarefas = JSON.parse(localStorage.getItem(selectedDate)) || [];
      tarefas = tarefas.map(tarefa => tarefa.descricao === tarefaAtualizada.descricao ? tarefaAtualizada : tarefa);
      localStorage.setItem(selectedDate, JSON.stringify(tarefas));
    }
  
    // Função para remover uma tarefa
    function removerTarefa(descricao) {
      let tarefas = JSON.parse(localStorage.getItem(selectedDate)) || [];
      tarefas = tarefas.filter(tarefa => tarefa.descricao !== descricao);
      localStorage.setItem(selectedDate, JSON.stringify(tarefas));
      carregarTarefas(); // Atualizar a lista visual
      calendar.refetchEvents(); // Atualiza os eventos do calendário
    }
  
    // Função para filtrar tarefas por prioridade
    filter.addEventListener('change', () => {
      const filtro = filter.value;
      const tarefas = JSON.parse(localStorage.getItem(selectedDate)) || [];
      taskList.innerHTML = '';
      tarefas.filter(tarefa => filtro === 'all' || tarefa.prioridade === filtro)
             .forEach(tarefa => adicionarTarefaNaLista(tarefa));
    });
  
    // Funcionalidade de logout
    document.getElementById('logoutButton').addEventListener('click', function() {
      // alert('Logout realizado com sucesso!');
      window.location.href = '/dashboard/todolist.html'; // Redireciona para a página de login
    });
  
    // Alternância entre temas claro e escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    let darkMode = false;
  
    darkModeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode', darkMode);
      darkModeToggle.textContent = darkMode ? '🌞' : '🌙'; // Alterna ícone
    });
  });