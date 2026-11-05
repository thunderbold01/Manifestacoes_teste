/** revive o site (para testes repetidos) */
import db from '../../lib/db';

export default function handler(req, res) {
  db.encerrado = false;
  res.json({ ok: true, msg: 'site reactivado' });
}
