/** revive o site de treino (para testes repetidos) */
import db from '../../lib/db';

export default function handler(req, res) {
  db.encerrado = false;
  res.json({ ok: true, msg: 'site de treino reactivado' });
}
