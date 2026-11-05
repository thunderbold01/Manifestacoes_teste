/* Página principal — layout Directive (HTML5 UP) com imagens reais da pasta IMagens */
import { useState } from 'react';
import Head from 'next/head';
import BannerTeste from '../components/BannerTeste';

export default function Home() {
  const [fx, setFx] = useState('');
  const [ok, setOk] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [telefone, setTelefone] = useState('+258 ');

  function formatTelefone(valor) {
    // Prefixo automático de Moçambique; aceita apenas dígitos após o +258
    let digitos = valor.replace(/\D/g, '');
    if (digitos.startsWith('258')) {
      digitos = digitos.slice(3);
    }
    return '+258 ' + digitos.slice(0, 9);
  }

  async function registrar(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: fd.get('nome'), email: fd.get('email'), telefone: formatTelefone(fd.get('telefone')),
        cidade: fd.get('cidade'), senha: fd.get('senha'),
      }),
    });
    const j = await res.json();
    setOk(res.ok && !j.erro);
    setFx(j.msg || 'Ocorreu um erro. Tente novamente.');
  }

  /* aplica o tema CSS do template, no head */
  const Theme = () => (
    <Head>
      <link rel="stylesheet" href="/assets/css/main.css" />
      <title>Manifestacao Nacional — Unidade e Mudanca</title>
    </Head>
  );

  return (
    <div className="is-preload">
      <Theme />
      <BannerTeste />
      <div id="header" style={{ backgroundImage: "url('/images/foto2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,28,20,.82), rgba(4,28,20,.55) 45%, rgba(4,28,20,.88))' }}></div>
        <div style={{ position: 'relative' }}>
        <span className="logo icon fa-bullhorn"></span>
        <h1 style={{ fontSize: '2.1em', textShadow: '0 2px 12px rgba(0,0,0,.75)', letterSpacing: '.06em' }}>UNIDADE E MUDANÇA</h1>
        <p style={{ textShadow: '0 1px 8px rgba(0,0,0,.85)' }}>
          <b>O cansaço acabou.</b> A Grande Manifestação Nacional toma a rua em <b>13 de Novembro</b>.<br />
          Eles já ouviram pedidos — agora vão ouvir passos. Em mais de 20 cidades,
          <br />
          a nossa voz não vai calar. Se faltas tu, quem fica a luta por nós?
        </p>
        <p style={{ margin: '1.4em 0 0' }}>
          <button onClick={() => setAberto(true)} className="button" style={{ cursor: 'pointer', marginBottom: '2.2em', borderColor: '#fff', background: '#ff8642', color: '#fff' }}>
            Quero Participar
          </button>
        </p>
        </div>
      </div>

      <div id="main">
        <header className="major container medium">
          <h2>
            Um dia, uma luta, uma só voz
            <br />
            pelas nossas ruas
            <br />
            <span style={{ fontWeight: 400 }}>— confirma a tua presença —</span>
          </h2>
        </header>

        <div className="box alt container">
          <section className="feature left">
            <a href="#cadastro" onClick={(e) => { e.preventDefault(); setAberto(true); }} className="image icon solid fa-map"><img src="/images/foto1.jpg" alt="Marcha" /></a>
            <div className="content">
              <h3>O Itinerário</h3>
              <p>Sentes-te em Praça da Independência às 07h00. Segue com a multidão pela Avenida principal até ao Largo final. Itinerário completo apenas para quem confirmar presença — recebes por e-mail no dia anterior ao evento.</p>
            </div>
          </section>

          <section className="feature right">
            <a href="#cadastro" onClick={(e) => { e.preventDefault(); setAberto(true); }} className="image icon solid fa-shield-alt"><img src="/images/foto2.jpg" alt="Presença" /></a>
            <div className="content">
              <h3>Fica informado — fica vivo</h3>
              <p>Ninguém controla uma rua cheia. Cada confirmado recebe na noite anterior os pontos de encontro, os atalhos de fuga, e o contacto directo dos organizadores. Chega cedo, segue o grupo — quem anda sozinho só fica para trás.</p>
            </div>
          </section>

          <section className="feature left">
            <a href="#cadastro" onClick={(e) => { e.preventDefault(); setAberto(true); }} className="image icon solid fa-bullhorn"><img src="/images/foto3.jpg" alt="Mocidade" /></a>
            <div className="content">
              <h3>A Nossa Voz</h3>
            <p>Pela manhã, representantes entregam a lista de exigências às autoridades. Quem responde se em números: por isso conta connosco — confirma a tua presença e leva os amigos da tua cidade.</p>
            </div>
          </section>
        </div>

        <footer className="major container medium">
          <h3>
            Faltam <span id="dias">Poucos Dias</span> para o grande dia
          </h3>
          <p style={{ fontWeight: 600 }}>Se faltas tu, quem fica a luta por nós?</p>
          <ul className="actions">
            <li><button onClick={() => setAberto(true)} className="button" style={{ cursor: 'pointer' }}>CONFIRMAR PRESENÇA</button></li>
          </ul>
        </footer>
      </div>

      <div id="footer">
        <div className="container medium">
          <ul className="icons">
            <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
          </ul>
        </div>
      </div>

      {aberto && (
        <div onClick={() => setAberto(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(6,24,18,.68)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 10, padding: 24, width: '100%', maxWidth: 430, boxShadow: '0 10px 40px rgba(0,0,0,.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Confirma a tua presença</h3>
              <button onClick={() => setAberto(false)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <p style={{ font: '13px system-ui', color: '#6b7570' }}>Preenche apenas se for uma simulação (dados fictícios).</p>
            <form onSubmit={registrar} style={{ display: 'grid', gap: 9 }}>
              <input name="nome" placeholder="Nome completo" required style={input()} />
              <input name="email" type="email" placeholder="Email" required style={input()} />
              <input
                name="telefone"
                placeholder="Telefone (+258...)"
                required
                value={telefone}
                onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                onFocus={(e) => { if (!telefone.trim()) setTelefone('+258 '); }}
                style={input()}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
                <input name="cidade" placeholder="Cidade" required style={input()} />
                <input name="senha" type="password" placeholder="Password de acesso" style={input()} />
              </div>
              <button className="button" style={{ background: '#ff8642', borderColor: '#ff8642', color: '#fff', cursor: 'pointer' }}>Confirmar Presença</button>
              <p style={{ color: ok ? '#0d6b34' : '#a3331f', font: 500 + ' 14px system-ui', minHeight: 20 }}>{fx}</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function input() {
  return { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 4, border: '1.5px solid #cfd8d3', font: '15px system-ui', background: '#fff' };
}
