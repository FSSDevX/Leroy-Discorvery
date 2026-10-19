import styles from './CustomizedButton.module.css';

function BotaoCustomizado({ texto, tamanho = 'pequeno', variante = 'verde', onClick }) {
  const classesBotao = `
    ${styles.botao} 
    ${styles[tamanho] || styles.pequeno} 
    ${styles[variante] || styles.verde}
  `;

  return (
    <button className={classesBotao} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotaoCustomizado;