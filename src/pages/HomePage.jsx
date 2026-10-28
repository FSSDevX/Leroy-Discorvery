import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [temReserva, setTemReserva] = useState(location.state?.reservaRealizada || true);
  const [tempoRestante, setTempoRestante] = useState(7190);

  useEffect(() => {
    if (location.state?.reservaRealizada) {
      setTemReserva(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (!temReserva) return;

    const timer = setInterval(() => {
      setTempoRestante(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [temReserva]);

  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
          <div style={{ fontSize: '10px', fontWeight: '600', color: '#00695C', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Leroy Merlin · Discovery
          </div>
          <h1 style={{ fontSize: '20px', color: '#0b3c3c', margin: 0, fontWeight: '700', lineHeight: '1.2' }}>
            Olá, Bem-vindo(a)!
          </h1>
        </div>

        {/* CARD DE RESERVA ATIVA */}
        {temReserva ? (
          <div style={{ 
            backgroundColor: '#FEF9E7', 
            border: '1px solid #F5B041', 
            borderRadius: '20px', 
            padding: '18px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            boxShadow: '0 4px 12px rgba(245, 176, 65, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#7E5109', backgroundColor: '#FAD7A0', padding: '3px 8px', borderRadius: '6px' }}>
                🔒 Reserva Realizada
              </span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#C0392B' }}>
                ⏱️ {formatarTempo(tempoRestante)}
              </span>
            </div>

            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0b3c3c', lineHeight: '1.3' }}>
              Vá até a loja de Pinheiros
            </div>

            <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.4' }}>
              Produto separado com sucesso. Chegando na loja, clique no botão abaixo para iniciar a sua rota interna.
            </div>

            {/* Botão maior e limpo, sem o texto "(abrir rota interna)" */}
            <button 
              onClick={() => navigate('/store-map')}
              style={{
                backgroundColor: '#0b3c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: '4px',
                boxShadow: '0 4px 10px rgba(11, 60, 60, 0.2)'
              }}
            >
              Cheguei na Loja
            </button>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#E0F2F1', 
            border: '1px solid #80CBC4', 
            borderRadius: '20px', 
            padding: '18px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px' 
          }}>
            <div style={{ fontSize: '20px' }}>📸</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#004D40' }}>
              Escanear Ambiente
            </div>
            <div style={{ fontSize: '11px', color: '#00695C', lineHeight: '1.3' }}>
              Aponte a câmera para a parede e descubra os melhores itens combinando com a sua decoração.
            </div>
            <button 
              onClick={() => navigate('/scan')}
              style={{
                backgroundColor: '#00695C',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '4px',
                textAlign: 'center'
              }}
            >
              Começar Escaneamento
            </button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#555', marginBottom: '2px' }}>
            Atalhos rápidos:
          </div>

          <BotaoCustomizado 
            texto="Escanear Novo Ambiente" 
            tamanho="grande" 
            variante="verde" 
            onClick={() => navigate('/scan')} 
          />

          <BotaoCustomizado 
            texto="Ver Catálogo de Produtos" 
            tamanho="grande" 
            variante="branco" 
            onClick={() => navigate('/catalog')} 
          />

          <BotaoCustomizado 
            texto="Simular Resultados & Estoque" 
            tamanho="grande" 
            variante="branco" 
            onClick={() => navigate('/results')} 
          />
        </div>

        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '4px auto 0 auto' }}></div>
      </div>

    </div>
  );
}