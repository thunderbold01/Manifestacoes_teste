/** API de cadastro — VULNERÁVEL por design (treino):
 *  1) guarda SENHA em texto claro
 *  2) erro detalhado expõe schema
 */
import db from '../../lib/db';

export default function handler(req, res) {
  if (db.encerrado) return res.status(503).send('evento encerrado — site desligado');
  if (req.method !== 'POST') return res.status(405).json({ erro: 'use POST' });
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!b || !b.nome || !b.email) return res.status(400).json({ msg: 'campos obrigatorios: nome, email' });
    if (String(b.email).includes("'")) {
      return res.status(500).json({ erro: "SQL error near '" + b.email + "': [{table: users, cols: id,nome,email,telefone,cidade,papel,senha}]", msg: 'erro no servidor' });
    }
    const id = db.users.length + 1;
    const novo = {
      id,
      nome: String(b.nome).slice(0, 80),
      email: String(b.email).slice(0, 100),
      telefone: String(b.telefone || '').slice(0, 30),
      cidade: String(b.cidade || '').slice(0, 40),
      papel: 'participante',
      senha: String(b.senha || '').slice(0, 60), // bug de treino: texto claro
      notas: 'auto-cadastro (dados de treino)',
    };
    db.users.push(novo);
    return res.json({ msg: 'Registado! Participante #' + id + ' — recebe o "itinerário" por email (nada é real, é treino).', id });
  } catch (e) {
    return res.status(200).json({ erro: e.message, msg: 'erro' });
  }
}
