/**
 * "BANCO DE DADOS" DE TREINO — 100% FICTICIO
 * Todas as pessoas aqui nao existem. Senhas propositadamente fracas
 * (treino de dump/extraccao). NUNCA usar com dados reais.
 */

const NOMES = [
  'Ana Sitoe', 'Beto Macuacua', 'Carlos Nhamirre', 'Dina Chissano', 'Eduardo Bila',
  'Fatima Mabjaia', 'Gilberto Uamusse', 'Helena Tembe', 'Ivo Muianga', 'Joana Matsinhe',
  'Kevin Chirindza', 'Luísa Nhaca', 'Manuel Chemane', 'Nádia Zandamela', 'Osório Bacha',
  'Paulina Magaia', 'Quim Moiane', 'Rosa Vilanculos', 'Sérgio Munguambe', 'Tânia Pane',
  'Ulisses Chissupa', 'Valentim Male', 'Wila Bembo', 'Xavier Cuambe', 'Yolanda Machava',
  'Zeca Mussaguane', 'Bento Laro', 'Cricia Pule', 'Damasco Ngoenha', 'Elisa Cossa'
];
const CIDADES = ['Maputo', 'Matola', 'Beira', 'Nampula', 'Quelimane', 'Tete', 'Chimoio', 'Pemba', 'Xai-Xai', 'Inhambane'];

/** gerar 60 usuarios fake estaveis (mesmo seed => mesmos dados sempre) */
function seedUser(i) {
  const nome = NOMES[i % NOMES.length] + (i >= NOMES.length ? ' ' + Math.floor(i / NOMES.length + 1) : '');
  const slug = nome.toLowerCase().normalize('NFD').replace(/[^a-z ]/g, '').replace(/ /g, '.');
  const senhas = ['123456', 'mz2024', 'senha123', 'protesto1', 'qwerty', 'mozambique', '123123', 'evento2024'];
  return {
    id: i + 1,
    nome,
    email: slug + '@teste-fake.mz',
    telefone: '+2588' + (40000000 + i * 13337),
    cidade: CIDADES[i % CIDADES.length],
    papel: 'participante',
    senha: senhas[i % senhas.length], // PROPOSICAMENTE em texto claro (treino)
    notas: 'cadastro de treino (fake)',
  };
}

const db = {
  evento: {
    nome: 'Grande Manifestação Nacional — Unidade e Mudaiça',
    data: '2026-11-13',
    pontoDePartida: 'Praça da Independência, 07h00',
    rota: 'Av. Julius Nyerere -> Av. 24 de Julho -> Largo CFFL',
    notas: 'Ambiente de TREINO. Nenhuma manifestação real. Dados ficticios.',
  },
  /* ADMIN propositadamente fraco */
  /* ADMIN com credenciais plausíveis (não óbvias) — treino de descoberta por enumeração */
  admin: { id: 0, user: 'amos.mazive', nome: 'Amos Mazive', email: 'amos.mazive@evento-unidade-mz.org', senha: 'Nhama18Nov!', papel: 'admin' },
  users: Array.from({ length: 100 }, (_, i) => seedUser(i)),
  posts: [
    { id: 1, autor: 'admin', titulo: 'Sobre o evento', corpo: 'Este site é um ambiente de treino CTF. Todos os dados aqui sao inventados.' },
  ],
  encerrado: false,
};

module.exports = db;
