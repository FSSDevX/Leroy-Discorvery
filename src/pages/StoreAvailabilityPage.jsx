import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

// Importando as imagens locais
import estanteImg from '../assets/estantetomneutro.png';
import quadroImg from '../assets/quadrosneutros.png';

export default function StoreAvailabilityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [estadoEstoque, setEstadoEstoque] = useState('disponivel');
  const [produtoAtual, setProdutoAtual] = useState({
    nome: 'Prateleira industrial preta',
    preco: 349.00,
    imagem: estanteImg
  });

  useEffect(() => {
    // Identifica qual produto foi selecionado na página de resultados através do state
    const produtoId = location.state?.produtoId;

    if (produtoId === 1) {
      // Prateleira -> Estoque Baixo
      setEstadoEstoque('baixo');
      setProdutoAtual({
        nome: 'Prateleira industrial preta',
        preco: 349.00,
        imagem: estanteImg
      });
    } else if (produtoId === 2) {
      // Luminária -> Indisponível
      setEstadoEstoque('indisponivel');
      setProdutoAtual({
        nome: 'Luminária pendente de metal',
        preco: 189.00,
        imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80'
      });
    } else if (produtoId === 3) {
      // Quadro -> Disponível
      setEstadoEstoque('disponivel');
      setProdutoAtual({
        nome: 'Quadro em tons neutros',
        preco: 129.00,
        imagem: quadroImg
      });
    }
  }, [location.state]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EFECE6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      
      {/* Moldura do Telemóvel */}
      <div style={{
        width: '100%',
        maxWidth: '380px',
        minHeight: '760px',
        backgroundColor: '#F4F1EA',
        borderRadius: '36px',
        border: '6px solid #E5E0D3',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>

        {/* Topo: Voltar e Favorito */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton onClick={() => navigate('/results')} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
            🤍
          </button>
        </div>

        {/* Conteúdo do Produto */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          
          {/* Imagem do Produto */}
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', height: '140px' }}>
            <img src={produtoAtual.imagem} alt={produtoAtual.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '16px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
            {produtoAtual.nome}
          </h2>

          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0b3c3c', margin: 0 }}>
            R$ {produtoAtual.preco.toFixed(2).replace('.', ',')}
          </div>

          {/* ESTADO INDISPONÍVEL: Aviso de Sem Estoque Geral */}
          {estadoEstoque === 'indisponivel' && (
            <div style={{ backgroundColor: '#FADBD8', color: '#78281F', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚠️</span> Sem estoque nas lojas perto de você.
            </div>
          )}

          <div style={{ fontSize: '11px', color: '#666', fontWeight: '500', marginTop: '4px' }}>
            Disponibilidade em loja
          </div>

          {/* BLOCOS DE LOJAS BASEADOS NO ESTADO DO PRODUTO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* QUADRO (Disponível) */}
            {estadoEstoque === 'disponivel' && (
              <>
                <div style={{ backgroundColor: '#E0F2F1', border: '1px solid #80CBC4', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#004D40' }}>Loja Pinheiros</div>
                    <div style={{ fontSize: '10px', color: '#00695C', marginTop: '2px' }}>✓ 12 unidades disponíveis</div>
                  </div>
                  <span style={{ backgroundColor: '#00695C', color: '#fff', fontSize: '9px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' }}>Corredor 5</span>
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Loja Ibirapuera</div>
                    <div style={{ fontSize: '10px', color: '#C0392B', marginTop: '2px' }}>✕ Indisponível</div>
                  </div>
                </div>
              </>
            )}

            {/* PRATELEIRA (Estoque Baixo) */}
            {estadoEstoque === 'baixo' && (
              <>
                <div style={{ backgroundColor: '#FDF2E9', border: '1px solid #F5B041', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#7E5109' }}>Loja Pinheiros</div>
                    <div style={{ fontSize: '10px', color: '#B9770E', marginTop: '2px' }}>⏱️ Últimas 3 unidades</div>
                  </div>
                  <span style={{ backgroundColor: '#D4AC0D', color: '#fff', fontSize: '9px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' }}>Corredor 5</span>
                </div>
                <div style={{ backgroundColor: '#FEF9E7', padding: '8px 12px', borderRadius: '10px', fontSize: '10px', color: '#7D6608' }}>
                  🔒 Poucas unidades. Reserve por 2 horas e retire sem fila.
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Loja Ibirapuera</div>
                    <div style={{ fontSize: '10px', color: '#C0392B', marginTop: '2px' }}>✕ Indisponível</div>
                  </div>
                </div>
              </>
            )}

            {/* LUMINÁRIA (Indisponível) */}
            {estadoEstoque === 'indisponivel' && (
              <>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Loja Pinheiros</div>
                    <div style={{ fontSize: '10px', color: '#C0392B', marginTop: '2px' }}>✕ Indisponível</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Loja Ibirapuera</div>
                    <div style={{ fontSize: '10px', color: '#C0392B', marginTop: '2px' }}>✕ Indisponível</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#333' }}>Loja Morumbi</div>
                    <div style={{ fontSize: '10px', color: '#C0392B', marginTop: '2px' }}>✕ Indisponível</div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>

        {/* Botões de Ação na Base */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {estadoEstoque === 'disponivel' && (
            <BotaoCustomizado 
              texto="Ver na loja de Pinheiros" 
              tamanho="grande" 
              variante="verde" 
              onClick={() => alert('Abrindo detalhes da loja Pinheiros...')} 
            />
          )}

          {estadoEstoque === 'baixo' && (
            <>
              <BotaoCustomizado 
                texto="Reservar por 2 horas" 
                tamanho="grande" 
                variante="verde" 
                onClick={() => alert('Produto reservado com sucesso!')} 
              />
              <BotaoCustomizado 
                texto="Ver na loja de Pinheiros" 
                tamanho="grande" 
                variante="branco" 
                onClick={() => alert('Abrindo detalhes da loja...')} 
              />
            </>
          )}

          {estadoEstoque === 'indisponivel' && (
            <>
              <BotaoCustomizado 
                texto="Avisar quando chegar" 
                tamanho="grande" 
                variante="verde" 
                onClick={() => alert('Alerta de reposição ativado!')} 
              />
              <BotaoCustomizado 
                texto="Buscar em lojas até 50 km" 
                tamanho="grande" 
                variante="branco" 
                onClick={() => alert('Buscando em outras localidades...')} 
              />
            </>
          )}
        </div>

        {/* Indicador inferior */}
        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
      </div>

    </div>
  );
}