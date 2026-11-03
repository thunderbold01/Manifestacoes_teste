/** login admin fraco + dump + desligar
 *  POST /api/admin  {action:"login", user:"admin", senha:"admin123"}
 *  POST /api/admin  {action:"dump"}   → dump total (vuneravel: sem auth real)
 *  POST /api/admin  {action:"desligar"} → "derruba" o site
 */
import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'use POST' });
  const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (b.action === 'login') {
    if (b.user === db.admin.user && b.senha === db.admin.senha) {
      return res.json({ ok: true, msg: 'sessao admin', token: 'TOK_' + Buffer.from(db.admin.senha).toString('base64') + '_FAKE' });
    }
    return res.status(401).json({ ok: false, erro: 'credenciais invalidas (dica: senhas fracas e user comum tem lista publica)' });
  }

  if (b.action === 'dump') {
    const todos = { admin: { ...db.admin }, usuarios: db.users, total: db.users.length + 1, aviso: 'DUMP FICTICIO para treino de extraccao' };
    return res.json(todos);
  }

  if (b.action === 'desligar') {
    db.encerrado = true;
    return res.json({ ok: true, msg: 'SITE ENCERRADO (simulacao de derrubamento). GET /api/reviver reactiva.' });
  }

  return res.status(400).json({ erro: 'action invalida' });
}
