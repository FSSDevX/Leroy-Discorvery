import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import ProductCard from '../components/ProductCard/ProductCard';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

// Importando as imagens locais
import estanteImg from '../assets/estantetomneutro.png';
import quadroImg from '../assets/quadrosneutros.png';

export default function ResultPage() {
  const navigate = useNavigate();
  
  const [screenState, setScreenState] = useState('success'); 
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [favoritos, setFavoritos] = useState({});

  const produtosRecomendados = [
    {
      id: 1, // ID 1: Prateleira (Estoque baixo)
      nome: 'Prateleira industrial preta',
      preco: 349.00,
      match: '96% combina',
      imagem: estanteImg
    },
    {
      id: 2, // ID 2: Luminária (Indisponível)
      nome: 'Luminária pendente de metal',
      preco: 189.00,
      match: '91% combina',
      imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3, // ID 3: Quadro (Disponível)
      nome: 'Quadro em tons neutros',
      preco: 129.00,
      match: '88% combina',
      imagem: quadroImg
    }
  ];

  const toggleFavorito = (id) => {
    setFavoritos(prev => ({ ...prev, [id]: !prev[id] }));
    setShowAccountModal(true);
  };

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
      
      <div style={{
        width: '100%',
        maxWidth: '380px',
        minHeight: '720px',
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton onClick={() => navigate('/scan')} />
          {screenState === 'success' && (
            <button 
              onClick={() => setShowAccountModal(true)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
            >
              🤍
            </button>
          )}
        </div>

        {screenState === 'loading' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            <h2 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Escolhendo o que combina...
            </h2>
            
            <div style={{
              backgroundColor: '#FADBD8',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#78281F',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚡</span> Analisando cores, materiais e estilo do seu ambiente.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  height: '80px',
                  backgroundColor: '#E6E1C5',
                  borderRadius: '16px',
                  opacity: 0.7
                }} />
              ))}
            </div>
          </div>
        )}

        {screenState === 'success' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <h2 style={{ fontSize: '17px', color: '#0b3c3c', margin: 0, fontWeight: '700', lineHeight: '1.3' }}>
              Sua parede cinza combina com
            </h2>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#E0F2F1',
              color: '#00695C',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600',
              width: 'fit-content'
            }}>
              ⚡ Baseado em visão computacional
            </div>

            {/* Lista de produtos: ao clicar no card, passa o ID do produto para a página de disponibilidade */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              {produtosRecomendados.map(prod => (
                <div 
                  key={prod.id} 
                  style={{ position: 'relative', cursor: 'pointer' }}
                  onClick={() => navigate('/availability', { state: { produtoId: prod.id } })}
                >
                  <ProductCard 
                    produto={prod}
                    preco={prod.preco}
                    isFavorito={!!favoritos[prod.id]}
                    onToggleFavorito={(e) => {
                      e.stopPropagation(); // Evita abrir a disponibilidade ao clicar no botão de favorito
                      toggleFavorito(prod.id);
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '102px',
                    backgroundColor: '#FADBD8',
                    color: '#78281F',
                    fontSize: '9px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}>
                    ⚡ {prod.match}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/scan')}
              style={{
                background: 'none',
                border: 'none',
                color: '#0b3c3c',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: 'auto',
                padding: '8px 0',
                textAlign: 'center'
              }}
            >
              Escanear outro ambiente
            </button>
          </div>
        )}

        {screenState === 'empty' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#F7EECE',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              🔍
            </div>

            <h3 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Não encontramos sugestões
            </h3>

            <p style={{ fontSize: '12px', color: '#666', margin: 0, maxWidth: '240px', lineHeight: '1.4' }}>
              Tente escanear com mais luz ou apontar para outra parede.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '20px' }}>
              <BotaoCustomizado 
                texto="Escanear de novo" 
                tamanho="grande" 
                variante="verde" 
                onClick={() => setScreenState('loading')} 
              />
              <BotaoCustomizado 
                texto="Escolher da galeria" 
                tamanho="grande" 
                variante="texto" 
                onClick={() => navigate('/scan')} 
              />
            </div>
          </div>
        )}

        {showAccountModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 10
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#0b3c3c', fontWeight: '700' }}>
                Crie uma conta para salvar
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                Guarde seus projetos e veja tudo em qualquer aparelho.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <BotaoCustomizado 
                  texto="Criar conta grátis" 
                  tamanho="grande" 
                  variante="verde" 
                  onClick={() => alert('Redirecionando para criação de conta...')} 
                />
                <BotaoCustomizado 
                  texto="Agora não" 
                  tamanho="grande" 
                  variante="branco" 
                  onClick={() => setShowAccountModal(false)} 
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
      </div>

    </div>
  );
}