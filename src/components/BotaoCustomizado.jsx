function BotaoCustomizado({ texto, tamanho = 'pequeno', variante = 'verde', onClick }) {
  
  // Estilos base comuns a todos os botões
  const estiloBase = {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '8px', // Bordas arredondadas
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '51px',      // Altura fixa solicitada para todos os botões
    boxSizing: 'border-box', // Garante que padding/borda não estoure as dimensões
  };

  // Cores de acordo com a variante escolhida
  let estiloCor = {};
  if (variante === 'branco') {
    estiloCor = {
      backgroundColor: '#ffffff',
      color: '#0A3323',          // Texto verde
      border: '1px solid #0A3323', // Linha em volta do botão verde
    };
  } else {
    estiloCor = {
      backgroundColor: '#0A3323', // Fundo verde
      color: '#ffffff',          // Texto em branco
      border: 'none',            // Sem borda
    };
  }

  // Larguras específicas para cada tamanho
  let estiloTamanho = {};
  if (tamanho === 'grande') {
    estiloTamanho = {
      width: '340px',
      fontSize: '16px',
    };
  } else {
    // Pequeno (padrão)
    estiloTamanho = {
      width: '164px',
      fontSize: '14px',
    };
  }

  // Juntamos todos os estilos
  const estiloFinal = { ...estiloBase, ...estiloCor, ...estiloTamanho };

  return (
    <button style={estiloFinal} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotaoCustomizado;