import { useState } from 'react';
import { Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepPreferencias({ onConcluir, onPular }) {
  const [ambientesSelecionados, setAmbientesSelecionados] = useState([]);
  const [estilosSelecionados, setEstilosSelecionados] = useState([]);

  const ambientes = ['Cozinha', 'Sala', 'Quarto', 'Banheiro', 'Área externa', 'Escritório'];
  const estilos = ['Moderno', 'Industrial', 'Rústico', 'Minimalista', 'Clássico'];

  const toggleAmbiente = (item) => {
    setAmbientesSelecionados(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleEstilo = (item) => {
    setEstilosSelecionados(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className={styles.stepContent} style={{ alignItems: 'flex-start', textAlign: 'left' }}>
      <h2 className={styles.title} style={{ marginBottom: '0.4rem' }}>
        O que você quer transformar?
      </h2>
      <p className={styles.subtitle} style={{ marginBottom: '1.2rem' }}>
        Escolha quantos quiser. Isso melhora as sugestões.
      </p>

      {/* Secção de Ambientes */}
      <div className={styles.sectionGroup}>
        <div className={styles.chipsContainer}>
          {ambientes.map((amb) => {
            const selecionado = ambientesSelecionados.includes(amb);
            return (
              <button
                key={amb}
                type="button"
                onClick={() => toggleAmbiente(amb)}
                className={`${styles.chip} ${selecionado ? styles.chipSelecionado : ''}`}
              >
                {selecionado && <Check size={14} />}
                {amb}
              </button>
            );
          })}
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Qual é o seu estilo?</h3>

      {/* Secção de Estilos */}
      <div className={styles.sectionGroup}>
        <div className={styles.chipsContainer}>
          {estilos.map((est) => {
            const selecionado = estilosSelecionados.includes(est);
            return (
              <button
                key={est}
                type="button"
                onClick={() => toggleEstilo(est)}
                className={`${styles.chip} ${selecionado ? styles.chipSelecionado : ''}`}
              >
                {selecionado && <Check size={14} />}
                {est}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.actions} style={{ marginTop: '2rem' }}>
        <BotaoCustomizado 
          texto="Concluir"
          tamanho="grande"
          variante="verde"
          onClick={() => onConcluir({ ambientes: ambientesSelecionados, estilos: estilosSelecionados })}
        />
        
        <button 
          type="button" 
          onClick={onPular}
          className={styles.textActionLink}
          style={{ width: '100%', textAlign: 'center' }}
        >
          Pular por agora
        </button>
      </div>
    </div>
  );
}