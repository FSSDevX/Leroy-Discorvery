import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import BotaoCustomizado from '../components/CustomizedButton/CustomizedButton';

export default function StoreMapPage() {
  const navigate = useNavigate();

  const [etapaFluxo, setEtapaFluxo] = useState('g1_rota');
  const [mostrarPopupCrossSell, setMostrarPopupCrossSell] = useState(false);

  const avancarParaProximoPasso = () => {
    setMostrarPopupCrossSell(true);
  };

  const fecharPopupEContinuar = () => {
    setMostrarPopupCrossSell(false);
    setEtapaFluxo('g3_proximo');
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

        {/* Topo: Voltar e seletor rápido */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton onClick={() => navigate('/')} />
          
          <div style={{ display: 'flex', gap: '2px', background: '#E5E0D3', padding: '3px', borderRadius: '6px', fontSize: '8px', fontWeight: '700' }}>
            <button onClick={() => setEtapaFluxo('g1_rota')} style={{ background: etapaFluxo === 'g1_rota' ? '#0b3c3c' : 'transparent', color: etapaFluxo === 'g1_rota' ? '#fff' : '#333', border: 'none', padding: '3px 5px', borderRadius: '4px', cursor: 'pointer' }}>Item 1</button>
            <button onClick={() => setEtapaFluxo('g3_proximo')} style={{ background: etapaFluxo === 'g3_proximo' ? '#0b3c3c' : 'transparent', color: etapaFluxo === 'g3_proximo' ? '#fff' : '#333', border: 'none', padding: '3px 5px', borderRadius: '4px', cursor: 'pointer' }}>Item 2</button>
            <button onClick={() => setEtapaFluxo('g5_concluido')} style={{ background: etapaFluxo === 'g5_concluido' ? '#0b3c3c' : 'transparent', color: etapaFluxo === 'g5_concluido' ? '#fff' : '#333', border: 'none', padding: '3px 5px', borderRadius: '4px', cursor: 'pointer' }}>Fim</button>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL DO MAPA */}
        {(etapaFluxo === 'g1_rota' || etapaFluxo === 'g3_proximo') && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
            
            <h2 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Navegação Interna
            </h2>

            {/* Card de Instrução Principal */}
            <div style={{ backgroundColor: '#0b3c3c', color: '#fff', padding: '12px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '10px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Direção Atual</div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>
                {etapaFluxo === 'g1_rota' ? '➡️ Vá para o Corredor 5 (Prateleira)' : '➡️ Vá para o Corredor 7 (Luminária)'}
              </div>
            </div>

            {/* MAPA ESQUEMÁTICO SUPER CLARO */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              border: '2px solid #0b3c3c', 
              borderRadius: '16px', 
              padding: '14px', 
              position: 'relative', 
              height: '220px', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(11, 60, 60, 0.08)'
            }}>
              
              {/* Rótulo Superior (Fundo da Loja) */}
              <div style={{ textAlign: 'center', fontSize: '9px', fontWeight: '700', color: '#888', borderBottom: '1px dashed #DDD', paddingBottom: '3px' }}>
                FUNDO DA LOJA (Área de Estoque)
              </div>

              {/* Corredores da Loja em Paralelo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 4px', flex: 1 }}>
                {[3, 4, 5, 6, 7, 8].map(num => {
                  const isAlvo = (num === 5 && etapaFluxo === 'g1_rota') || (num === 7 && etapaFluxo === 'g3_proximo');
                  return (
                    <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }}>
                      <span style={{ fontSize: '9px', fontWeight: isAlvo ? '800' : '600', color: isAlvo ? '#C0392B' : '#555' }}>
                        {isAlvo ? '📍 DESTINO' : `C-${num}`}
                      </span>

                      {/* Bloco do Corredor */}
                      <div style={{ 
                        width: '26px', 
                        height: '95px', 
                        backgroundColor: isAlvo ? '#FADBD8' : '#EAE6DB', 
                        border: isAlvo ? '2px solid #C0392B' : '1px solid #D5D0C0',
                        borderRadius: '6px', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: isAlvo ? '0 0 10px rgba(192, 57, 43, 0.3)' : 'none'
                      }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: isAlvo ? '#78281F' : '#666' }}>{num}</span>

                        {/* Indicador do item exato dentro do corredor */}
                        {isAlvo && (
                          <div style={{ position: 'absolute', top: '35%', width: '10px', height: '10px', backgroundColor: '#C0392B', borderRadius: '50%', border: '2px solid #fff' }}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rótulo Inferior (Entrada / Caixa com indicador "Você está aqui") */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0ECE1', padding: '6px 10px', borderRadius: '8px', fontSize: '9px', fontWeight: '700', color: '#0b3c3c', borderTop: '1px dashed #DDD' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#27AE60', borderRadius: '50%', display: 'inline-block' }}></span> 
                  Você (Entrada)
                </span>
                <span style={{ color: '#C0392B' }}>Siga a linha vermelha ➔</span>
              </div>
            </div>

            {/* Resumo do Item Atual */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #E0DBB0', borderRadius: '12px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '18px' }}>🛒</div>
              <div>
                <div style={{ fontSize: '10px', color: '#666' }}>Item a recolher:</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0b3c3c' }}>
                  {etapaFluxo === 'g1_rota' ? 'Prateleira industrial preta' : 'Luminária pendente de metal'}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TELA G5: ROTA CONCLUÍDA */}
        {etapaFluxo === 'g5_concluido' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
            <div style={{ width: '70px', height: '70px', backgroundColor: '#E0F2F1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#00695C' }}>
              ✓
            </div>

            <h3 style={{ fontSize: '18px', color: '#0b3c3c', margin: 0, fontWeight: '700' }}>
              Rota Concluída!
            </h3>

            <p style={{ fontSize: '12px', color: '#666', margin: 0, maxWidth: '240px', lineHeight: '1.4' }}>
              Todos os itens foram recolhidos com sucesso. Vamos prosseguir para o pagamento.
            </p>
          </div>
        )}

        {/* POP-UP DE CROSS-SELL AO LONGO DO CAMINHO */}
        {mostrarPopupCrossSell && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            padding: '20px'
          }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <div style={{ fontSize: '24px' }}>💡</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0b3c3c' }}>
                Combina com sua escolha!
              </div>
              <p style={{ fontSize: '11px', color: '#666', margin: 0, lineHeight: '1.4' }}>
                Notamos que você pegou a prateleira. Que tal adicionar <b>Fitas de LED autoadesivas</b> para iluminar seus nichos?
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <BotaoCustomizado texto="Adicionar (R$ 49,90)" tamanho="pequeno" variante="verde" onClick={fecharPopupEContinuar} />
                <BotaoCustomizado texto="Ignorar" tamanho="pequeno" variante="branco" onClick={fecharPopupEContinuar} />
              </div>
            </div>
          </div>
        )}

        {/* BOTÕES DE AÇÃO NA BASE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {etapaFluxo === 'g1_rota' && (
            <BotaoCustomizado 
              texto="Peguei o Item 1 (Avançar)" 
              tamanho="grande" 
              variante="verde" 
              onClick={avancarParaProximoPasso} 
            />
          )}

          {etapaFluxo === 'g3_proximo' && (
            <BotaoCustomizado 
              texto="Peguei o Item 2 (Concluir)" 
              tamanho="grande" 
              variante="verde" 
              onClick={() => setEtapaFluxo('g5_concluido')} 
            />
          )}

          {etapaFluxo === 'g5_concluido' && (
            <BotaoCustomizado 
              texto="Ir para o Caixa / Pagamento" 
              tamanho="grande" 
              variante="verde" 
              onClick={() => navigate('/checkout', { state: { itensSelecionados: [{ nome: 'Prateleira industrial preta', preco: 349.00 }, { nome: 'Luminária pendente de metal', preco: 189.00 }] } })} 
            />
          )}
        </div>

        <div style={{ width: '80px', height: '4px', backgroundColor: '#ccc', borderRadius: '2px', margin: '8px auto 0 auto' }}></div>
      </div>

    </div>
  );
}