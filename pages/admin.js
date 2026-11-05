/* Admin — Gestão da campanha.
 * Fluxo: login fraco → dashboard com opcao "backup" (discovery em cadeia). */
import { useState } from 'react';
import Head from 'next/head';
import BannerTeste from '../components/BannerTeste';

export default function Admin() {
  const [sessao, setSessao] = useState(null);   // {token}
  const [msg, setMsg] = useState('');
  const [cfg, setCfg] = useState('');
  const [dump, setDump] = useState('');
  const [encerrado, setEncerrado] = useState(null);

  async function sub(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', user: fd.get('user'), senha: fd.get('senha') }) });
    const j = await r.json();
    if (j.ok) { setSessao(j); setMsg(''); } else setMsg('Credenciais invalidas.');
  }

  async function backup(f) { setCfg('a carregar...'); const r = await fetch('/api/backup?file=' + f); setCfg(await r.text()); }

  async function dumpAll() { setDump('a extrair...'); const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'dump' }) }); const j = await r.json(); setDump(JSON.stringify(j, null, 1)); }

  async function desligar() { const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'desligar' }) }); const j = await r.json(); setEncerrado(j.msg); }

  const btn = { padding: '9px 16px', borderRadius: 8, border: 0, cursor: 'pointer', fontWeight: 700 };
  const box = { background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 12px rgba(11,43,34,.09)' };

  if (!sessao) {
    return (
      <div style={{ font: '16px system-ui', background: '#f3f7f4', minHeight: '100vh' }}>
        <Head><title>Admin — Manifestação</title></Head>
        <BannerTeste />
        <div style={{ maxWidth: 420, margin: '60px auto', padding: 20 }}>
          <div style={box}>
            <h2 style={{ marginTop: 0, color: '#0b2b22' }}>🔐 Painel de gestão</h2>
            <form onSubmit={sub} style={{ display: 'grid', gap: 10 }}>
              <input name="user" placeholder="Utilizador" required style={{ padding: 10, borderRadius: 8, border: '1.5px solid #cfe0d6' }} />
              <input name="senha" type="password" placeholder="Palavra-passe" required style={{ padding: 10, borderRadius: 8, border: '1.5px solid #cfe0d6' }} />
              <button style={{ ...btn, background: '#14523f', color: '#fff' }}>Entrar</button>
              <a href="#" onClick={(e) => { e.preventDefault(); setMsg('Contacte o gestor da campanha.'); }} style={{ font: 13 + 'px system-ui', color: '#5c7a6c' }}>Esqueceu a palavra-passe?</a>
              {msg && <p style={{ color: '#a3331f', font: 500 + ' 14px system-ui' }}>{msg}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ font: '16px system-ui', background: '#f3f7f4', minHeight: '100vh' }}>
      <BannerTeste />
      <div style={{ maxWidth: 760, margin: '30px auto', padding: 20 }}>
        <h2 style={{ color: '#0b2b22' }}>📊 Gestão da campanha</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
          <button style={{ ...btn, background: '#14523f', color: '#fff' }} onClick={dumpAll}>👥 Lista de inscritos</button>
          <button style={{ ...btn, background: '#3c6e57', color: '#fff' }} onClick={() => backup('users.sql')}>🔎 Backup da base de dados</button>
          <button style={{ ...btn, background: '#8a6d00', color: '#fff' }} onClick={() => backup('config.json')}>⚙️ Configuração</button>
          <button style={{ ...btn, background: '#b00020', color: '#fff' }} onClick={desligar}>⛔ Suspender site</button>
        </div>
        <p style={{ font: 12 + 'px system-ui', color: '#9db3a6', marginTop: 10 }}>sessão: {sessao.token}</p>
        {encerrado && <div style={{ ...box, borderColor: '#b00020' }}><b style={{ color: '#b00020' }}>{encerrado}</b></div>}
        {dump && <div style={{ ...box, marginTop: 12 }}><b>Lista de inscritos:</b><pre style={{ whiteSpace: 'pre-wrap', font: '12px monospace', maxHeight: 340, overflow: 'auto' }}>{dump}</pre></div>}
        {cfg && <div style={{ ...box, marginTop: 12 }}><b>Backup:</b><pre style={{ whiteSpace: 'pre-wrap', font: '12px monospace' }}>{cfg}</pre></div>}
      </div>
    </div>
  );
}
