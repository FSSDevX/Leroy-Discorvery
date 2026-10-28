import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recebe os itens selecionados do state da navegação (ou usa um array vazio se não houver)
  const itensCarrinho = location.state?.itensSelecionados || [
    { nome: 'Prateleira industrial preta', preco: 349.00 }
  ];

  // Estados possíveis: 'h1_caixa', 'h2_pagamento', 'h3_cupom_caixa', 'h4_concluido'
  const [etapaCheckout, setEtapaCheckout] = useState('h1_caixa');
  const [tipoPagamento, setTipoPagamento] = useState('pix');
  const [contadorCupom, setContadorCupom] = useState(5);

  // Calcula subtotal dinamicamente com base no que foi escolhido
  const subtotal = itensCarrinho.reduce((acc, item) => acc + item.preco, 0);
  const descontoPrimeiraCompra = subtotal * 0.10; // 10% de desconto
  const totalFinal = subtotal - descontoPrimeiraCompra;

  // Efeito para o temporizador de 5 segundos na tela de cupom para o caixa
  useEffect(() => {
    let timer;
    if (etapaCheckout === 'h3_cupom_caixa' && contadorCupom > 0) {
      timer = setInterval(() => {
        setContadorCupom(prev => prev - 1);
      }, 1000);
    } else if (contadorCupom === 0 && etapaCheckout === 'h3_cupom_caixa') {
      setEtapaCheckout('h4_concluido');
    }
    return () => clearInterval(timer);
  }, [etapaCheckout, contadorCupom]);

  const handleAvancarPagamento = () => {
    setContadorCupom(5);
    setEtapaCheckout('h3_cupom_caixa');
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
          <BackButton onClick={() => navigate('/store-map')} />
          
          <div style={{ display: 'flex', gap: '2px', background: '#E5E0D3', padding: '3px', borderRadius: '6px', fontSize: '8px', fontWeight: '700' }}>
            <button onClick={() => setEtapaCheckout('h1_caixa')} style={{ background: etapaCheckout === 'h1_caixa' ? '#0b3c3c' : 'transparent', color: etapaCheckout === 'h1_caixa' ? '#fff' : '#333', border: 'none', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}>H1</button>
            <button onClick={() => setEtapaCheckout('h2_pagamento')} style={{ background: etapaCheckout === 'h2_pagamento' ? '#0b3c3c' : 'transparent', color: etapaCheckout === 'h2_pagamento' ? '#fff' : '#333', border: 'none', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}>H2</button>
            <button onClick={() => setEtapaCheckout('h3_cupom_caixa')} style={{ background: etapaCheckout === 'h3_cupom_caixa' ? '#0b3c3c' : 'transparent', color: etapaCheckout === 'h3_cupom_caixa' ? '#fff' : '#333', border: 'none', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}>H3</button>
            <button onClick={() => setEtapaCheckout('h4_concluido')} style={{ background: etapaCheckout === 'h4_concluido' ? '#0b3c3c' : 'transparent', color: etapaCheckout === 'h4_concluido' ? '#fff' : '#333', border: 'none', padding: '3px 6px', borderRadius: '4px', cursor: 'pointer' }}>H4</button>
          </div>
        </div>

        {/* H1: NO CAIXA (Carrinho Dinâmico) */}
        {etapaCheckout === 'h1_caixa' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              No caixa
            </h2>

            <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              {itensCarrinho.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', color: '#333' }}>
                  <span>{item.nome}</span>
                  <b>R$ {item.preco.toFixed(2).replace('.', ',')}</b>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '11px', fontWeight: '700', color: '#0b3c3c', marginTop: '2px' }}>
              Seus benefícios
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ backgroundColor: '#E8F8F5', border: '1px solid #A3E4D7', borderRadius: '10px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '10px' }}>
                  <div style={{ fontWeight: '700', color: '#0E6655' }}>% 10% off na primeira compra</div>
                  <div style={{ color: '#117A65' }}>Aplicado em todos os itens</div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#C0392B' }}>-R$ {descontoPrimeiraCompra.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E0DBB0', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C0392B' }}>
                <span>Descontos</span>
                <span>-R$ {descontoPrimeiraCompra.toFixed(2).replace('.', ',')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800', color: '#0b3c3c', marginTop: '2px' }}>
                <span>Total</span>
                <span>R$ {totalFinal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        )}

        {/* H2: PAGAMENTO */}
        {etapaCheckout === 'h2_pagamento' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <h2 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Como quer pagar?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div 
                onClick={() => setTipoPagamento('pix')}
                style={{ backgroundColor: '#fff', border: tipoPagamento === 'pix' ? '2px solid #0b3c3c' : '1px solid #E0DBB0', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600', color: '#0b3c3c' }}>
                  <span>⚡</span>
                  <div>
                    <div>Pix</div>
                    <div style={{ fontSize: '10px', color: '#666', fontWeight: '400' }}>Aprovação na hora</div>
                  </div>
                </div>
                <input type="radio" checked={tipoPagamento === 'pix'} readOnly />
              </div>

              <div 
                onClick={() => setTipoPagamento('cartao')}
                style={{ backgroundColor: '#fff', border: tipoPagamento === 'cartao' ? '2px solid #0b3c3c' : '1px solid #E0DBB0', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '600', color: '#0b3c3c' }}>
                  <span>💳</span>
                  <div>
                    <div>Cartão de crédito</div>
                    <div style={{ fontSize: '10px', color: '#666', fontWeight: '400' }}>Em até 10x sem juros</div>
                  </div>
                </div>
                <input type="radio" checked={tipoPagamento === 'cartao'} readOnly />
              </div>
            </div>

            <div style={{ backgroundColor: '#F0ECE1', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#666' }}>Total a pagar</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#0b3c3c' }}>R$ {totalFinal.toFixed(2).replace('.', ',')}</div>
              </div>
            </div>
          </div>
        )}

        {/* H3: TELA DE CUPOM PARA APRESENTAR AO CAIXA (Fica 5s) */}
        {etapaCheckout === 'h3_cupom_caixa' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#FEF9E7', border: '2px dashed #F5B041', borderRadius: '16px', padding: '16px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#7E5109', marginBottom: '8px' }}>
                🎟️ Apresente ao Atendente do Caixa
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: '#0b3c3c', letterSpacing: '2px', margin: '10px 0' }}>
                LERY-8842
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                Código válido para validação dos descontos no app.
              </div>
            </div>

            <div style={{ fontSize: '12px', backgroundColor: '#E0F2F1', color: '#004D40', padding: '8px 16px', borderRadius: '20px', fontWeight: '600' }}>
              Validando pagamento em <b>{contadorCupom}s</b>...
            </div>
          </div>
        )}

        {/* H4: COMPRA CONCLUÍDA COM 100 PONTOS */}
        {etapaCheckout === 'h4_concluido' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '14px' }}>
            <div style={{ width: '70px', height: '70px', backgroundColor: '#E0F2F1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#00695C' }}>
              ✓
            </div>

            <h3 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Compra confirmada!
            </h3>

            <p style={{ fontSize: '11px', color: '#666', margin: 0, maxWidth: '240px', lineHeight: '1.4' }}>
              Obrigado por comprar com o Leroy Discovery.
            </p>

            <div style={{ width: '100%', backgroundColor: '#E8F8F5', border: '1px solid #A3E4D7', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
              <div style={{ fontWeight: '700', color: '#0E6655' }}>🌟 Clube Leroy</div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#117A65' }}>+100 pontos adicionados!</div>
            </div>
          </div>
        )}

        {/* BOTÕES DE AÇÃO NA BASE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {etapaCheckout === 'h1_caixa' && (
            <BotaoCustomizado 
              texto="Escolher pagamento" 
              tamanho="grande" 
              variante="verde" 
              onClick={() => setEtapaCheckout('h2_pagamento')} 
            />
          )}

          {etapaCheckout === 'h2_pagamento' && (
            <BotaoCustomizado 
              texto="Gerar Cupom para o Caixa" 
              tamanho="grande" 
              variante="verde" 
              onClick={handleAvancarPagamento} 
            />
          )}

          {etapaCheckout === 'h3_cupom_caixa' && (
            <BotaoCustomizado 
              texto="Pular espera" 
              tamanho="grande" 
              variante="branco" 
              onClick={() => setEtapaCheckout('h4_concluido')} 
            />
          )}

          {etapaCheckout === 'h4_concluido' && (
            <BotaoCustomizado 
              texto="Voltar ao início" 
              tamanho="grande" 
              variante="verde" 
              onClick={() => navigate('/')} 
            />
          )}
        </div>

        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
      </div>

    </div>
  );
}