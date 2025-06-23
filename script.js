function calcularTotal() {
  let total = 0;
  let servicos = [];
  let adicionais = [];

  document.querySelectorAll(".servico:checked").forEach(cb => {
    total += parseFloat(cb.dataset.preco);
    servicos.push(cb.dataset.nome);
  });

  document.querySelectorAll(".adicional:checked").forEach(cb => {
    total += parseFloat(cb.dataset.price);
    adicionais.push(cb.dataset.nome);
  });

  document.getElementById("precoTotal").innerText = total.toFixed(2);
  document.getElementById("resumoServicos").innerText = servicos.join(", ");
  document.getElementById("resumoAdicionais").innerText = adicionais.join(", ");
}

async function enviarAgendamento() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const servicos = document.getElementById("resumoServicos").innerText;
  const adicionais = document.getElementById("resumoAdicionais").innerText;
  const preco = document.getElementById("precoTotal").innerText;
  const mensagem = document.getElementById("mensagemSucesso");

  if (!nome || !cpf || !data || !hora || servicos === "") {
    mensagem.innerText = "⚠️ Preencha todos os campos e selecione pelo menos um serviço.";
    mensagem.style.color = "orange";
    return;
  }

  const agendamento = {
    client_name: nome,
    client_cpf: cpf,
    appointment_date: data,
    appointment_time: hora,
    services: servicos,
    additionals: adicionais || "",
    price: parseFloat(preco)
  };

  try {
    const response = await fetch("http://localhost:8080/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendamento)
    });

    const result = await response.json();

    if (result.success) {
      mensagem.innerText = "✅ Seu corte foi agendado com sucesso!";
      mensagem.style.color = "green";
      limparCampos();
    } else {
      mensagem.innerText = "❌ Erro ao agendar: " + result.error;
      mensagem.style.color = "red";
    }
  } catch (error) {
    mensagem.innerText = "❌ Erro de conexão com o servidor.";
    mensagem.style.color = "red";
  }
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("data").value = "";
  document.getElementById("hora").value = "";
  document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
  calcularTotal();
}

// ===================== HISTÓRICO ========================

async function verHistoricoPorCpf() {
  const cpf = document.getElementById("buscarCpf").value.trim();
  const container = document.getElementById("historico");
  container.innerHTML = "";

  if (!cpf) return;

  const res = await fetch(`http://localhost:8080/history/cpf/${cpf}`);
  const data = await res.json();
  mostrarHistorico(data);
}

async function verHistoricoPorNome() {
  const nome = document.getElementById("buscarNome").value.trim();
  const container = document.getElementById("historico");
  container.innerHTML = "";

  if (!nome) return;

  const res = await fetch(`http://localhost:8080/history/name/${nome}`);
  const data = await res.json();
  mostrarHistorico(data);
}

function mostrarHistorico(data) {
  const container = document.getElementById("historico");

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
    return;
  }

  let html = "<ul>";
  for (let item of data) {
    html += `
      <li>
        <strong>${item.client_name}</strong> - ${item.services}
        ${item.additionals ? ` + ${item.additionals}` : ''}
        <br><small>Data: ${item.appointment_date} às ${item.appointment_time}</small>
        <br><strong>Total: R$ ${item.price.toFixed(2)}</strong>
      </li><br>`;
  }
  html += "</ul>";
  container.innerHTML = html;
}


