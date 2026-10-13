import BotaoCustomizado from './components/BotaoCustomizado';

function App() {
  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
      <h1>Testando os 4 Tipos de Botões</h1>

      {/* 1. Botão Grande com fundo Verde e texto em Branco */}
      <BotaoCustomizado 
        texto="Grande Verde" 
        tamanho="grande" 
        variante="verde" 
        onClick={() => alert('Clicou no Grande Verde!')} 
      />

      {/* 2. Botão Grande com fundo Branco, texto Verde e linha em volta verde */}
      <BotaoCustomizado 
        texto="Grande Branco" 
        tamanho="grande" 
        variante="branco" 
        onClick={() => alert('Clicou no Grande Branco!')} 
      />

      {/* 3. Botão Pequeno com fundo Verde e texto em Branco */}
      <BotaoCustomizado 
        texto="Pequeno Verde" 
        tamanho="pequeno" 
        variante="verde" 
        onClick={() => alert('Clicou no Pequeno Verde!')} 
      />

      {/* 4. Botão Pequeno com fundo Branco, texto Verde e linha em volta verde */}
      <BotaoCustomizado 
        texto="Pequeno Branco" 
        tamanho="pequeno" 
        variante="branco" 
        onClick={() => alert('Clicou no Pequeno Branco!')} 
      />

    </div>
  );
}

export default App;