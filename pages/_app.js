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
  if (db.encerrado && appContext.ctx.res) {
    appContext.ctx.res.statusCode = 503;
  }
  return { ...appProps, encerrado: db.encerrado };
};

export default MyApp;
