/** /api/backup?file=users.sql — backups expostos sem autenticacao
 *  /api/backup → lista backups
 */
import db from '../../lib/db';

const BACKUPS = {
  'users.sql': 'CREATE TABLE users (id INT, nome TEXT, email TEXT, telefone TEXT, cidade TEXT, papel TEXT, senha TEXT);\nINSERT INTO users(user,senha) VALUES (\'' + db.admin.user + '\',\'' + db.admin.senha + '\');\n-- +60 linhas...',
  'config.json': '{"db_host":"127.0.0.1","db_user":"root","db_pass":"toor","ambiente":"producao","smtp_user":"no-reply@evento-unidade-mz.org","smtp_pass":null}',
  'admin_note.txt': 'NOTA INTERNA: "nunca deixo passwords em texto claro" ... decidido no dia 1 (oops)',
};

export default function handler(req, res) {
  const file = String(req.query.file || '');
  if (!file) return res.json({ backups_disponiveis: Object.keys(BACKUPS), aviso: 'acesso NAO restrito' });
  if (BACKUPS[file]) return res.send('=== BACKUP ' + file + ' ===\n' + BACKUPS[file]);
  res.status(404).send('nao encontrado');
}
