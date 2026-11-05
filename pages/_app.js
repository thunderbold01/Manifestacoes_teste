import App from 'next/app';
import db from '../lib/db';

function ShutdownPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: '#f5f5f5',
      color: '#333',
      textAlign: 'center',
      padding: 24,
    }}>
      <div>
        <h1 style={{ fontSize: 48, marginBottom: 16 }}>503</h1>
        <p style={{ fontSize: 18 }}>Site temporariamente indisponível.</p>
        <p style={{ fontSize: 14, color: '#666' }}>O portal está em manutenção. Tente novamente mais tarde.</p>
      </div>
    </div>
  );
}

function MyApp({ Component, pageProps, encerrado }) {
  if (encerrado) {
    return <ShutdownPage />;
  }
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  let encerrado = db.encerrado;

  // Sincroniza com a API: se /api/users devolver 503, o site todo fica 503.
  if (typeof window === 'undefined' && appContext.ctx.req && appContext.ctx.res) {
    try {
      const proto = appContext.ctx.req.headers['x-forwarded-proto'] || 'http';
      const host = appContext.ctx.req.headers.host || '127.0.0.1:3001';
      const r = await fetch(`${proto}://${host}/api/users`);
      if (r.status === 503) encerrado = true;
    } catch {
      // se falhar, mantem o estado local
    }
  }

  if (encerrado && appContext.ctx.res) {
    appContext.ctx.res.statusCode = 503;
  }
  return { ...appProps, encerrado };
};

export default MyApp;
