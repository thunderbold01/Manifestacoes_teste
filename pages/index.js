/* Página principal — visual de campanha (ambiente de TREINO) */
import { useState } from 'react';
import BannerTeste from '../components/BannerTeste';

export default function Home() {
  const [fx, setFx] = useState('');
  const [ok, setOk] = useState(false);
  const [aberto, setAberto] = useState(false);

  async function registrar(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: fd.get('nome'), email: fd.get('email'), telefone: fd.get('telefone'),
        cidade: fd.get('cidade'), senha: fd.get('senha'),
      }),
    });
    const j = await res.json();
    setOk(res.ok && !j.erro);
    setFx(j.msg || 'Ocorreu um erro. Tente novamente.');
  }

  const card = { background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 2px 14px rgba(11,43,34,.10)', margin: '18px 0' };

  return (
    <div style={{ font: '16px system-ui, sans-serif', background: '#f3f7f4', minHeight: '100vh' }}>
      <BannerTeste />
      <img src="/hero.svg" alt="Manifestação" style={{ width: '100%', maxHeight: 380, objectFit: 'cover', display: 'block' }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '8px 20px 60px' }}>
        <div style={card}>
          <span style={{ background: '#14523f', color: '#fff', borderRadius: 999, padding: '4px 14px', font: 600 + ' 13px system-ui' }}>🟢 A confirmar presença</span>
          <h1 style={{ fontSize: 30, margin: '14px 0 6px', color: '#0b2b22' }}>Grande Manifestação Nacional — Unidade e Mudanca</h1>
          <p style={{ color: '#3a5a4e', marginTop: 0 }}>
            Somos milhares a dizer basta. Junte-se a mais de 20 cidades em <b>13 de Novembro</b>, num dia de <b>unidade, mudanca e paz</b>.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
            <div style={{ flex: '1 1 180px', background: '#eef6f1', borderRadius: 10, padding: 14 }}>
              📅 <b>13 NOV</b><div style={{ font: 13 + 'px system-ui', color: '#5c7a6c' }}>07h00 · concentração</div>
            </div>
            <div style={{ flex: '1 1 180px', background: '#eef6f1', borderRadius: 10, padding: 14 }}>
              📍 <b>Ponto central</b><div style={{ font: 13 + 'px system-ui', color: '#5c7a6c' }}>Praça da independência</div>
            </div>
            <div style={{ flex: '1 1 180px', background: '#eef6f1', borderRadius: 10, padding: 14 }}>
              ⏱️ <b>4 horas</b><div style={{ font: 13 + 'px system-ui', color: '#5c7a6c' }}>marcha pacífica</div>
            </div>
          </div>
        </div>

        {/* CTA — o formulario so aparece ao clicar (modal). Nada explicito na home. */}
        <div style={{ ...card, textAlign: 'center', padding: 26 }}>
          <h2 style={{ marginTop: 0, color: '#0b2b22' }}>Vais estar connosco no dia 13?</h2>
          <p style={{ color: '#3a5a4e' }}>Reserva o teu lugar e recebe o itinerario, o guia de seguranca e os pontos de encontro por e-mail.</p>
          <button onClick={() => setAberto(true)} style={{ background: '#14523f', color: '#fff', border: 0, borderRadius: 10, padding: '14px 34px', fontWeight: 800, fontSize: 17, cursor: 'pointer' }}>
            Quero participar ✊
          </button>
          <p style={{ color: ok ? '#0d6b34' : '#a3331f', font: 500 + ' 14px system-ui', minHeight: 20 }}>{fx}</p>
        </div>

        <div style={card}>
          <h3 style={{ marginTop: 0, color: '#0b2b22' }}>O que levamos para a rua</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              ['🤝', 'Unidade', 'A mocidade dos 20 distritos está connosco'],
              ['🕊️', 'Paz', 'Consigo: paciencia, agua e calma'],
              ['📣', 'Voz', 'Lista de exigencias as autoridades'],
            ].map(([e, t, d]) => (
              <div key={t} style={{ background: '#f8fbf9', border: '1px solid #dcebe2', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 24 }}>{e}</div>
                <b style={{ color: '#0b2b22' }}>{t}</b>
                <div style={{ font: 13 + 'px system-ui', color: '#6b8578' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

      {aberto && (
        <div onClick={() => setAberto(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(6,24,18,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, padding: 22, width: '100%', maxWidth: 430, boxShadow: '0 10px 40px rgba(0,0,0,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#0b2b22' }}>Confirma a tua presença</h3>
              <button onClick={() => setAberto(false)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <p style={{ font: 13 + 'px system-ui', color: '#6b8578' }}>Junte-se a milhares em 20 cidades. Resposta em segundos.</p>
            <form onSubmit={registrar} style={{ display: 'grid', gap: 9 }}>
              <input name="nome" placeholder="Nome completo" required style={input()} />
              <input name="email" type="email" placeholder="Email" required style={input()} />
              <input name="telefone" placeholder="Telefone (+258...)" required style={input()} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                <input name="cidade" placeholder="Cidade" required style={input()} />
                <input name="senha" type="password" placeholder="Password" style={input()} />
              </div>
              <button style={{ background: '#14523f', color: '#fff', border: 0, borderRadius: 10, padding: '12px 18px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                Confirmar presença
              </button>
            </form>
          </div>
        </div>
      )}

      <p style={{ textAlign: 'center', font: '12px monospace', color: '#9db3a6' }}>© campanha unidade-MUDANCA 2026 · tv/canal · ambiente de demonstração controlada</p>
      </div>
    </div>
  );
}

function input() {
  return { width: '100%', boxSizing: 'border-box', padding: '11px 12px', borderRadius: 8, border: '1.5px solid #cfe0d6', font: '15px system-ui', background: '#fff' };
}
