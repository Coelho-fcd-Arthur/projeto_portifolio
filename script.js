// O script lê o objeto DADOS (arquivo dados.js) e monta a página.

// Troca caracteres especiais para não quebrar o HTML
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
$("redes").innerHTML = DADOS.redes
  .map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nome)}</a></li>`)
  .join("");

if (DADOS.fotoPerfil) $("foto-perfil").src = DADOS.fotoPerfil;


// ===== 2. CARDS DO CARROSSEL (um para cada desenho) =====
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
  setaAnt.classList.toggle("escondida", noInicio);   // esconde a seta se não há nada atrás
  setaProx.classList.toggle("escondida", noFim);     // esconde a seta se chegou ao fim
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
// O IntersectionObserver avisa quando um bloco entra na tela
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".revelar").forEach((el) => observador.observe(el));


// ===== 6. VALIDAÇÃO DO FORMULÁRIO =====
const form = $("form-contato");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    $("retorno").innerHTML = "";
    return;
  }

  $("retorno").innerHTML = `<div class="alert alert-success">Obrigado, ${esc($("nome").value.trim())}! Sua mensagem foi enviada.</div>`;
  form.reset();
  form.classList.remove("was-validated");
});