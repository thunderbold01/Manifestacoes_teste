/* Banner de teste global — visível em TODAS as paginas */
module.exports = function BannerTeste() {
  return (
    <div style={{ background: '#b00020', color: '#fff', padding: '10px 16px', font: 'bold 14px monospace', textAlign: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
      ⚠️ AMBIENTE DE TREINO / CTF — SITE DE SIMULAÇÃO. DADOS 100% FICTÍCIOS. NÃO SE REGISTE COM DADOS REAIS.
    </div>
  );
};
