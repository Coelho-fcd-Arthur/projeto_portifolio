// O script lê o objeto DADOS (arquivo dados.js) e monta a página.

function esc(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}
const $ = (id) => document.getElementById(id);


// ===== 1. PREENCHER TEXTOS =====
document.title = DADOS.tituloDaAba;
$("marca").textContent = DADOS.nome;
$("rodape-nome").textContent = DADOS.nome;
$("ano").textContent = new Date().getFullYear();
$("sobre-textos").innerHTML = DADOS.sobre.map((t) => `<p>${esc(t)}</p>`).join("");
$("intro-artes").textContent = DADOS.introArtes;
$("contato-texto").textContent = DADOS.contatoTexto;

// Links de contato: só abre aba nova para links da internet (não para e-mail)
$("redes").innerHTML = DADOS.redes
  .map((r) => {
    const externo = r.url.startsWith("http");
    const alvo = externo ? ' target="_blank" rel="noopener"' : "";
    return `<li><a href="${esc(r.url)}"${alvo}>${esc(r.nome)}</a></li>`;
  })
  .join("");

if (DADOS.fotoPerfil) $("foto-perfil").src = DADOS.fotoPerfil;


// ===== 2. CARDS DO CARROSSEL =====
$("trilho").innerHTML = DADOS.desenhos
  .map((d, i) => `
    <button class="card-desenho" data-indice="${i}">
      <span class="moldura">
        <img src="${esc(d.imagem)}" alt="${esc(d.alt)}" loading="lazy" onerror="this.style.display='none'">
      </span>
      <span class="legenda">${esc(d.titulo)}</span>
      <span class="resumo">${esc(d.resumo)}</span>
    </button>`)
  .join("");


// ===== 3. SETAS DO CARROSSEL =====
const trilho = $("trilho");
const setaAnt = $("seta-ant");
const setaProx = $("seta-prox");

function atualizarSetas() {
  const noInicio = trilho.scrollLeft <= 5;
  const noFim = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 5;
  setaAnt.classList.toggle("escondida", noInicio);
  setaProx.classList.toggle("escondida", noFim);
}

setaProx.addEventListener("click", () => trilho.scrollBy({ left: trilho.clientWidth * 0.8, behavior: "smooth" }));
setaAnt.addEventListener("click", () => trilho.scrollBy({ left: -trilho.clientWidth * 0.8, behavior: "smooth" }));
trilho.addEventListener("scroll", atualizarSetas);
window.addEventListener("resize", atualizarSetas);
atualizarSetas();


// ===== 4. JANELINHA COM FOTO E DESCRIÇÃO =====
const modal = new bootstrap.Modal($("modal-desenho"));

trilho.addEventListener("click", (evento) => {
  const card = evento.target.closest(".card-desenho");
  if (!card) return;

  const d = DADOS.desenhos[card.dataset.indice];
  $("modal-titulo").textContent = d.titulo;
  $("modal-descricao").textContent = d.descricao;
  $("modal-img").src = d.imagem;
  $("modal-img").alt = d.alt;
  modal.show();
});


// ===== 5. ANIMAÇÃO AO ROLAR A PÁGINA =====
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));


// ===== 6. FORMULÁRIO COM ENVIO REAL (Web3Forms) =====
const form = $("form-contato");
const botaoEnviar = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if ($("botcheck") && $("botcheck").checked) return;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    $("retorno").innerHTML = "";
    return;
  }

  if (!DADOS.chaveFormulario || DADOS.chaveFormulario.includes("COLE_AQUI")) {
    $("retorno").innerHTML = `<div class="alert alert-warning">A chave do formulário ainda não foi colocada no dados.js.</div>`;
    return;
  }

  const nome = $("nome").value.trim();
  const textoOriginal = botaoEnviar.textContent;
  botaoEnviar.disabled = true;
  botaoEnviar.textContent = "Enviando...";

  try {
    const resposta = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: DADOS.chaveFormulario,
        subject: `Contato pelo portfólio: ${nome}`,
        from_name: "Portfólio",
        name: nome,
        email: $("email").value.trim(),
        message: $("mensagem").value.trim()
      })
    });
    const dados = await resposta.json();

    if (resposta.ok && dados.success) {
      $("retorno").innerHTML = `<div class="alert alert-success">Obrigado, ${esc(nome)}! O Web3Forms confirmou o recebimento.</div>`;
      form.reset();
      form.classList.remove("was-validated");
    } else {
      throw new Error(`Servidor respondeu: ${dados.message || resposta.status}`);
    }
  } catch (erro) {
    $("retorno").innerHTML = `<div class="alert alert-danger">Não foi possível enviar. Detalhe: ${esc(erro.message)}<br>Você pode escrever para ${esc(DADOS.emailContato)}.</div>`;
  } finally {
    botaoEnviar.disabled = false;
    botaoEnviar.textContent = textoOriginal;
  }
});