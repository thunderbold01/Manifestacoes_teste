/** /api/backup?file=users.sql — vuneravel de treino: backups expostos sem auth
 *  /api/backup → lista backups
 */
import db from '../../lib/db';

const BACKUPS = {
  'users.sql': 'CREATE TABLE users (id INT, nome TEXT, email TEXT, telefone TEXT, cidade TEXT, papel TEXT, senha TEXT);\nINSERT INTO users(user,senha) VALUES (\'' + db.admin.user + '\',\'' + db.admin.senha + '\');\n-- +60 linhas fake...',
  'config.json': '{"db_host":"127.0.0.1","db_user":"root","db_pass":"toor","ambiente":"TREINO","smtp_user":"no-reply@evento-teste.mz","smtp_pass":null}',
  'admin_note.txt': 'NOTA INTERNA: "nunca deixo passwords em texto claro" ... decidido no dia 1 (oops)',
};

export default function handler(req, res) {
  const file = String(req.query.file || '');
  if (!file) return res.json({ backups_disponiveis: Object.keys(BACKUPS), aviso: 'acceso NAO restrito (vunerabilidade de treino)' });
  if (BACKUPS[file]) return res.send('=== BACKUP ' + file + ' (FICTICIO) ===\n' + BACKUPS[file]);
  res.status(404).send('nao encontrado');
}
