const campoTarefa = document.getElementById("campoTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contadorPendentes = document.getElementById("contadorPendentes");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        const divAcoes = document.createElement("div");
        divAcoes.classList.add("acoes");

        // Botão Remover (Excluir)
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn-remover");
        btnRemover.addEventListener("click", () => removerTarefa(index));

        if (tarefa.concluida) {
            li.classList.add("concluida");
            li.innerHTML = `<span>✅ ${tarefa.texto}</span>`;

            // Botão Desfazer
            const btnDesfazer = document.createElement("button");
            btnDesfazer.textContent = "Desfazer";
            btnDesfazer.classList.add("btn-concluir");
            btnDesfazer.addEventListener("click", () => alternarConcluida(index));

            // Desativa o botão remover quando a tarefa está concluída
            btnRemover.disabled = true;

            divAcoes.appendChild(btnDesfazer);
        } else {
            li.innerHTML = `<span>${tarefa.texto}</span>`;

            // Botão Concluir
            const btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Concluir";
            btnConcluir.classList.add("btn-concluir");
            btnConcluir.addEventListener("click", () => alternarConcluida(index));

            divAcoes.appendChild(btnConcluir);
        }

        divAcoes.appendChild(btnRemover);
        li.appendChild(divAcoes);
        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();
    if (texto === "") return alert("Digite uma tarefa!");

    tarefas.push({ texto: texto, concluida: false });
    salvarESincronizar();
    campoTarefa.value = "";
}

function alternarConcluida(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarESincronizar();
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvarESincronizar();
}

function atualizarContador() {
    const pendentes = tarefas.filter(t => !t.concluida).length;
    contadorPendentes.textContent = `Tarefas pendentes: ${pendentes}`;
}

function salvarESincronizar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    renderizarTarefas();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa();
});

renderizarTarefas();