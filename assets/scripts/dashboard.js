//! Dashboard System Configuration

// Toggle Menu Lateral
document.getElementById("menu-toggle").addEventListener("click", function() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  
  const dashboardContainer = document.querySelector(".dashboard-container");
  if (sidebar.classList.contains("active")) {
    dashboardContainer.style.marginLeft = "250px";
  } else {
    dashboardContainer.style.marginLeft = "0";
  }
});

// Funcionalidade de Adicionar Áreas
document.getElementById("add-area-btn").addEventListener("click", function() {
  const newArea = prompt("Digite o nome da nova área:");
  if (newArea) {
    alert("Área " + newArea + " criada!");
  }
});

// Tarefas Recorrentes
document.getElementById("recurring-task-btn").addEventListener("click", function() {
  const recurringTask = prompt("Digite o nome da tarefa recorrente:");
  if (recurringTask) {
    alert("Tarefa recorrente " + recurringTask + " configurada!");
  }
});

// Lista Rápida (Quick Add)
document.getElementById("quick-task-btn").addEventListener("click", function() {
  const quickTask = document.getElementById("quick-task").value;
  if (quickTask) {
    alert("Tarefa rápida adicionada: " + quickTask);
    document.getElementById("quick-task").value = ""; // Limpa o campo
  } else {
    alert("Por favor, insira uma tarefa.");
  }
});

// Histórico de Tarefas Concluídas
const taskHistory = [];
document.getElementById("view-history-btn").addEventListener("click", function() {
  const historyDiv = document.getElementById("history-list");
  historyDiv.innerHTML = ""; // Limpa a lista antes de exibir

  if (taskHistory.length === 0) {
    historyDiv.innerHTML = "<p>Nenhuma tarefa concluída ainda.</p>";
  } else {
    const ul = document.createElement("ul");
    taskHistory.forEach(function(task) {
      const li = document.createElement("li");
      li.textContent = task;
      ul.appendChild(li);
    });
    historyDiv.appendChild(ul);
  }
});

// Adicionando uma tarefa ao histórico
function addToHistory(task) {
  taskHistory.push(task);
}

//!endingOfSystem ///////////////////////////////////////////////////////////////////////////