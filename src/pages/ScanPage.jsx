import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';
import logoImg from '../assets/logo.png';

export default function ScanPage() {
  const [currentScreen, setCurrentScreen] = useState('scanner');
  const navigate = useNavigate();

  const handleStartScan = () => {
    setCurrentScreen('analyzing');
    setTimeout(() => {
      // Podes trocar para 'error' se quiseres testar o ecrã de falha
    }, 5000);
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
      
      {/* Moldura / Container em formato de Telemóvel */}
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
        boxSizing: 'border-box'
      }}>
        
        {/* Topo com o Botão de Voltar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton onClick={() => navigate('/')} />
          <span style={{ fontSize: '10px', color: '#888' }}>D1 - Escanear</span>
        </div>

        {/* Conteúdo Central */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '16px 0' }}>
          
          {/* Logo exibido a partir da tua pasta assets */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={logoImg} 
              alt="Leroy Discovery" 
              style={{ height: '32px', objectFit: 'contain' }} 
            />
          </div>

          {/* ESTADO 1: ESCANEAR */}
          {currentScreen === 'scanner' && (
            <>
              {/* Moldura da Câmara com Imagem de Fundo (Simulando o cômodo) */}
              <div style={{
                width: '100%',
                height: '380px',
                borderRadius: '24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
              }}>
                {/* Imagem de Fundo simulando a parede/cômodo */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.9)'
                  }}
                />
                
                {/* Mira Pontilhada da Câmara */}
                <div style={{
                  position: 'absolute',
                  inset: '20px',
                  border: '2px dashed rgba(255, 255, 255, 0.8)',
                  borderRadius: '16px',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />

                <p style={{
                  position: 'relative',
                  zIndex: 3,
                  fontSize: '13px',
                  color: '#ffffff',
                  fontWeight: '600',
                  marginTop: '120px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                  textAlign: 'center'
                }}>
                  Aponte para a parede ou o cômodo
                </p>
              </div>

              {/* Dica de Iluminação (Caixa Azul Clara) */}
              <div style={{
                backgroundColor: '#E3F2FD',
                border: '1px solid #90CAF9',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '18px' }}>☀️</span>
                <p style={{ fontSize: '11px', color: '#0D47A1', margin: 0, lineHeight: '1.4' }}>
                  Fique a 1 metro da parede e mova o celular devagar.
                </p>
              </div>

              {/* Botões de Ação */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <BotaoCustomizado 
                  texto="📸 Escanear ambiente" 
                  tamanho="grande" 
                  variante="verde" 
                  onClick={handleStartScan} 
                />
                <BotaoCustomizado 
                  texto="Escolher da galeria" 
                  tamanho="grande" 
                  variante="texto" 
                  onClick={() => setCurrentScreen('error')} 
                />
              </div>
            </>
          )}

          {/* ESTADO 2: ANALISANDO */}
          {currentScreen === 'analyzing' && (
            <>
              <div style={{
                width: '100%',
                height: '380px',
                backgroundColor: '#617364',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <p style={{ fontSize: '13px', marginBottom: '12px' }}>Analisando cores e estilo...</p>
                <div style={{ width: '160px', height: '8px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', backgroundColor: '#fff', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ padding: '6px 12px', backgroundColor: '#E8F5E9', color: '#2E7D32', fontSize: '11px', borderRadius: '16px', fontWeight: '500' }}>✓ Parede cinza</span>
                <span style={{ padding: '6px 12px', backgroundColor: '#E8F5E9', color: '#2E7D32', fontSize: '11px', borderRadius: '16px', fontWeight: '500' }}>✓ Madeira clara</span>
                <span style={{ padding: '6px 12px', backgroundColor: '#FFEBEE', color: '#C62828', fontSize: '11px', borderRadius: '16px', fontWeight: '500' }}>⚡ Estilo industrial...</span>
              </div>

              <BotaoCustomizado 
                texto="Cancelar" 
                tamanho="grande" 
                variante="branco" 
                onClick={() => setCurrentScreen('scanner')} 
              />
            </>
          )}

          {/* ESTADO 3: ERRO / ALERTA */}
          {currentScreen === 'error' && (
            <>
              <div style={{
                width: '100%',
                height: '380px',
                backgroundColor: '#5C6E61',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>!</div>
                <p style={{ fontSize: '13px' }}>Não conseguimos ler o ambiente</p>
              </div>

              <div style={{ backgroundColor: '#FFEBEE', border: '1px solid #EF9A9A', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <p style={{ fontSize: '11px', color: '#B71C1C', margin: 0, lineHeight: '1.4' }}>
                  Pouca luz. Acenda a luz do ambiente e tente de novo.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <BotaoCustomizado 
                  texto="🔄 Tentar de novo" 
                  tamanho="grande" 
                  variante="verde" 
                  onClick={() => setCurrentScreen('scanner')} 
                />
                <BotaoCustomizado 
                  texto="Escolher da galeria" 
                  tamanho="grande" 
                  variante="texto" 
                  onClick={() => setCurrentScreen('scanner')} 
                />
              </div>
            </>
          )}

        </div>

        {/* Indicador de barra inferior do telemóvel */}
        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '0 auto' }}></div>
      </div>

    </div>
  );
}