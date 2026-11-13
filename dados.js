const DADOS = {

  // ----- Cabeçalho -----
  nome: "Arthur Coelho",                      // aparece no canto do cabeçalho
  tituloDaAba: "Portfólio | Arthur Coelho",   // texto da aba do navegador

  // ----- Sobre mim (banner com foto) -----
  // Coloque sua foto na pasta "imagens". Se o arquivo não existir, aparece "Minha foto".
  fotoPerfil: "imagens/perfil.jpg",
  // Cada texto vira um parágrafo. Adicione ou remova à vontade.
  sobre: [
    "Tenho 18 anos, estudo Analise e desenvolvimento de sistemas na UDF. Como não tenho grandes projetos, fiz esse portifólio para mostrar um hobbie que eu tenho desde os meus 10 anos. Comecei rabiscando nos cadernos e hoje é uma das coisas que mais gosto de fazer.",
    "Gosto de desenhar personagens, todos os desenhos são originais, vem sempre da minha imaginação. Este portfólio reúne meus trabalhos e mostra minha evolução."
  ],

  // ----- Introdução sobre as artes -----
  introArtes: "Aqui estão alguns dos meus desenhos favoritos. Clique em um card para ver o desenho maior.",

  // ----- Contatos -----
    contatoTexto: "Quer comentar um desenho ou fazer uma encomenda? Fale comigo.",
  emailContato: "coelho2025fcd@gmail.com",
  chaveFormulario: "5ff2482e-7677-4027-8649-2c9c58d9837f",
  redes: [
    { nome: "Instagram", url: "https://www.instagram.com/cueiodoroque" },
    { nome: "coelho2025fcd@gmail.com", url: "mailto:coelho2025fcd@gmail.com" }
  ],

  // ----- Desenhos (cards) -----
  // resumo   = frase curta que aparece embaixo do card
  // descricao = texto maior, que aparece na janelinha ao clicar no card
  // Para ADICIONAR um desenho: copie um bloco { ... }, cole no fim da lista e mude os dados.
  // Para REMOVER: apague o bloco inteiro.
  desenhos: [
    {
      titulo: "Abominação",
      resumo: "um desenho sobre rancor.",
      imagem: "imagens/desenho1.jpg",
      alt: "2 horas para finalizar",
      descricao: "É um robo possuido por um espirito, relembrando o protagonista dos erros do passado."
    },
    {
      titulo: "Título do desenho 2",
      resumo: "Frase curta sobre o desenho.",
      imagem: "imagens/desenho2.jpg",
      alt: "Descreva o desenho 2",
      descricao: "Texto maior só do desenho 2: técnica usada, tempo que levou, o que te inspirou."
    },
    {
      titulo: "Título do desenho 3",
      resumo: "Frase curta sobre o desenho.",
      imagem: "imagens/desenho3.jpg",
      alt: "Descreva o desenho 3",
      descricao: "Texto maior só do desenho 3: técnica usada, tempo que levou, o que te inspirou."
    },
    {
      titulo: "Título do desenho 4",
      resumo: "Frase curta sobre o desenho.",
      imagem: "imagens/desenho4.jpg",
      alt: "Descreva o desenho 4",
      descricao: "Texto maior só do desenho 4: técnica usada, tempo que levou, o que te inspirou."
    },
    {
      titulo: "Título do desenho 5",
      resumo: "Frase curta sobre o desenho.",
      imagem: "imagens/desenho5.jpg",
      alt: "Descreva o desenho 5",
      descricao: "Texto maior só do desenho 5: técnica usada, tempo que levou, o que te inspirou."
    },
    {
      titulo: "Título do desenho 6",
      resumo: "Frase curta sobre o desenho.",
      imagem: "imagens/desenho6.jpg",
      alt: "Descreva o desenho 6",
      descricao: "Texto maior só do desenho 6: técnica usada, tempo que levou, o que te inspirou."
    }
  ]
};
