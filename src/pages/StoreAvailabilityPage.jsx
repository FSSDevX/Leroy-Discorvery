import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

import estanteImg from '../assets/estantetomneutro.png';
import quadroImg from '../assets/quadrosneutros.png';

export default function StoreAvailabilityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [estadoEstoque, setEstadoEstoque] = useState('baixo');
  const [produtoAtual, setProdutoAtual] = useState({
    nome: 'Prateleira industrial preta',
    preco: 349.00,
    imagem: estanteImg
  });

  // Estado para controlar o pop-up do Google Maps
  const [mostrarModalMaps, setMostrarModalMaps] = useState(false);
  const [contadorMaps, setContadorMaps] = useState(5);

  useEffect(() => {
    const produtoId = location.state?.produtoId;

    if (produtoId === 1 || !produtoId) {
      setEstadoEstoque('baixo');
      setProdutoAtual({
        nome: 'Prateleira industrial preta',
        preco: 349.00,
        imagem: estanteImg
      });
    } else if (produtoId === 2) {
      setEstadoEstoque('indisponivel');
      setProdutoAtual({
        nome: 'Luminária pendente de metal',
        preco: 189.00,
        imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80'
      });
    } else if (produtoId === 3) {
      setEstadoEstoque('disponivel');
      setProdutoAtual({
        nome: 'Quadro em tons neutros',
        preco: 129.00,
        imagem: quadroImg
      });
    }
  }, [location.state]);

  // Efeito para o temporizador de 5 segundos do Google Maps
  useEffect(() => {
    let timer;
    if (mostrarModalMaps && contadorMaps > 0) {
      timer = setInterval(() => {
        setContadorMaps(prev => prev - 1);
      }, 1000);
    } else if (contadorMaps === 0 && mostrarModalMaps) {
      // Após 5 segundos, fecha o pop-up e vai para a Home indicando que a reserva foi feita
      setMostrarModalMaps(false);
      navigate('/', { state: { reservaRealizada: true } });
    }
    return () => clearInterval(timer);
  }, [mostrarModalMaps, contadorMaps, navigate]);

  const handleAbrirGoogleMaps = () => {
    setContadorMaps(5);
    setMostrarModalMaps(true);
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton onClick={() => navigate('/results')} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
            🤍
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', height: '140px' }}>
            <img src={produtoAtual.imagem} alt={produtoAtual.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '16px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
            {produtoAtual.nome}
          </h2>

          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0b3c3c', margin: 0 }}>
            R$ {produtoAtual.preco.toFixed(2).replace('.', ',')}
          </div>

          <div style={{ fontSize: '11px', color: '#666', fontWeight: '500', marginTop: '4px' }}>
            Disponibilidade em loja
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ backgroundColor: '#FDF2E9', border: '1px solid #F5B041', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#7E5109' }}>Loja Pinheiros</div>
                <div style={{ fontSize: '10px', color: '#B9770E', marginTop: '2px' }}>⏱️ Últimas 3 unidades</div>
              </div>
              <span style={{ backgroundColor: '#D4AC0D', color: '#fff', fontSize: '9px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px' }}>Corredor 5[cite: 1]</span>
            </div>
            
            <div style={{ backgroundColor: '#FEF9E7', padding: '8px 12px', borderRadius: '10px', fontSize: '10px', color: '#7D6608' }}>
              🔒 Poucas unidades. Reserve por 2 horas e retire sem fila[cite: 1].
            </div>
          </div>

        </div>

        {/* Botões solicitados para a prateleira */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          <BotaoCustomizado 
            texto="Reservar por 2 horas" 
            tamanho="grande" 
            variante="verde" 
            onClick={() => {
              alert('Produto reservado com sucesso por 2 horas!');
              navigate('/', { state: { reservaRealizada: true } });
            }} 
          />
          <BotaoCustomizado 
            texto="Localização da Loja de Pinheiros" 
            tamanho="grande" 
            variante="branco" 
            onClick={handleAbrirGoogleMaps} 
          />
        </div>

        {/* MODAL / POP-UP DO GOOGLE MAPS (Simulação por 5 segundos) */}
        {mostrarModalMaps && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            padding: '24px',
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗺️</div>
            <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', fontWeight: '700' }}>
              Abrindo Google Maps...
            </h3>
            <p style={{ fontSize: '12px', color: '#ddd', margin: '0 0 20px 0', lineHeight: '1.4' }}>
              Traçando rota para a <b>Leroy Merlin - Loja Pinheiros</b>.
            </p>
            <div style={{ fontSize: '13px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px' }}>
              Retornando em <b>{contadorMaps}s</b>...
            </div>
          </div>
        )}

        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
      </div>

    </div>
  );
}