/** GET /api/users?filter=<str> — VULNERAVEL: injecao na regiao filter
 *  /api/users                     → lista publica (so nome/cidade)
 *  /api/users?filter=a' or '1'='1 → devolve tudo com SENHAS
 *  /api/users?filter=papel=admin  → descobre admin
 */
import db from '../../lib/db';

export default function handler(req, res) {
  if (db.encerrado) return res.status(503).send('evento encerrado — site desligado');
  const filter = String(req.query.filter || '').trim();
  const camposPublicos = ['nome', 'cidade'];

  let colunas = camposPublicos;
  let rows = db.users;

  if (filter.includes("'") || /\bor\b/i.test(filter)) {
    colunas = ['id', 'nome', 'email', 'telefone', 'cidade', 'papel', 'senha'];
    rows = db.users.concat([db.admin]);
  } else if (filter === 'papel=admin') {
    colunas = ['id', 'nome', 'email', 'senha'];
    rows = [db.admin];
  } else if (filter) {
    rows = db.users.filter((u) => u.papel === filter || u.cidade.startsWith(filter));
  }

  const out = rows.map((u) => {
    const o = {};
    colunas.forEach((c) => (o[c] = u[c]));
    return o;
  });
  return res.json({ total: out.length, usuarios: out });
}
