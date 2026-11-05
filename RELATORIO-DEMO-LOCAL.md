# Relatório da demonstração local

## Escopo

- Alvo: clone local em `http://127.0.0.1:3001`.
- Data da validação: 5 de novembro de 2026.
- Dados: exclusivamente fictícios, fornecidos pelo próprio projeto CTF.
- Excluído: deployment público no Vercel, visitantes, endereços IP, dispositivos móveis e ficheiros fora da aplicação.

## Resultado

O teste automatizado concluiu **8 de 8 verificações**. Nenhum registo sensível foi incluído neste relatório.

| Verificação | Evidência observada |
| --- | --- |
| Banner CTF | Página local respondeu HTTP 200 e apresentou o aviso de treino. |
| Reconhecimento | `robots.txt` revelou `/admin`. |
| Listagem pública | `/api/users` devolveu 100 registos fictícios, inicialmente apenas com nome e cidade. |
| Filtro vulnerável | O filtro de treino devolveu 101 registos e passou a incluir o campo `senha`. |
| Backups expostos | `/api/backup` listou `users.sql`, `config.json` e `admin_note.txt` sem autenticação. |
| Dump administrativo | `POST /api/admin` com `action=dump`, sem sessão, devolveu 101 registos fictícios. |
| Indisponibilidade simulada | `action=desligar` foi aceite sem login e `/api/users` passou a responder HTTP 503. |
| Restauro | `POST /api/reviver` restaurou a API para HTTP 200. |

## Interpretação técnica

As vulnerabilidades são intencionais e simuladas no código. O filtro não executa SQL real, os backups são objetos JavaScript e a suspensão altera `db.encerrado` em memória. Assim, a demonstração valida o fluxo de reconhecimento, exposição de dados, ação administrativa sem autenticação e recuperação, mas não prova exploração de uma base de dados ou interrupção de infraestrutura real.

## Correções recomendadas para uma versão segura

- Remover passwords e outros segredos de todas as respostas da API.
- Guardar passwords apenas com Argon2id ou bcrypt e custo adequado.
- Exigir autenticação e autorização administrativa em dump, backup e operações de estado.
- Validar parâmetros com esquemas e usar consultas parametrizadas quando existir uma base de dados.
- Retirar backups e configuração da área pública.
- Aplicar rate limiting, CSRF quando houver cookies, registos de auditoria e gestão de segredos.
- Não registar IPs de visitantes sem finalidade legítima, aviso e política de retenção.
