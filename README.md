# Manifestações — aplicação de demonstração de segurança ofensiva

Aplicação Next.js intencionalmente vulnerável para demonstrações controladas de pentest. **Todos os utilizadores, contactos e segredos são fictícios.** O aviso em `components/BannerTeste.js` pode ser desativado para simulações realistas, mas o site nunca deve recolher dados reais.

## Executar apenas no computador local

Requisitos: Node.js 18 ou superior.

```sh
npm ci --ignore-scripts
npm run dev -- -H 127.0.0.1
```

Abrir `http://127.0.0.1:3001`. O endereço `127.0.0.1` impede que outras máquinas da rede acedam ao alvo.

## Demonstração automática e reversível

Com o servidor local ativo, executar noutro terminal:

```sh
npm run demo:local
```

O comando `scripts/demo-local.mjs` valida:

1. disponibilidade do site;
2. exposição da rota administrativa em `robots.txt`;
3. listagem pública de utilizadores;
4. exposição de campos sensíveis pelo filtro vulnerável;
5. backups expostos sem autenticação;
6. dump administrativo sem autenticação;
7. indisponibilidade simulada com resposta HTTP 503;
8. restauro obrigatório do serviço.

O URL do alvo é fixo em `http://127.0.0.1:3001`: o script não aceita endereços externos. Não imprime registos, emails, passwords ou tokens e reativa sempre o site num bloco `finally`.

## Publicação no Vercel

O projeto continua a ser uma aplicação Next.js padrão e o build de produção é validado com:

```sh
npm run build
```

Depois de publicar as alterações no ramo ligado ao Vercel, a plataforma faz um novo deployment. Se o site for exposto publicamente, mantenha apenas dados fictícios e uma política clara de utilização autorizada.

## Limites da simulação

A aplicação simula vulnerabilidades com respostas programadas e estado em memória. Não existe uma base de dados SQL real, reinício do processo, alteração de ficheiros ou obtenção de IPs de visitantes. Em ambientes serverless, o estado de suspensão pode não ser partilhado entre instâncias e desaparece quando a instância termina.
