const campoTarefa = document.getElementById("campoTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

// Array para armazenar as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Função para renderizar as tarefas na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.textContent = tarefa;
        
        // Remove a tarefa ao clicar
        li.addEventListener("click", () => {
            removerTarefa(index);
        });

        listaTarefas.appendChild(li);
    });
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();
    if (texto === "") return alert("Digite uma tarefa!");

    tarefas.push(texto);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    campoTarefa.value = "";
    renderizarTarefas();
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    renderizarTarefas();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

// Carrega as tarefas salvas assim que a página abre
renderizarTarefas();