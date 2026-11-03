import { Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepSucesso({ onEscanear, onExplorar }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.iconContainerSuccess}>
        <Check size={36} color="#0A3323" strokeWidth={2.5} />
      </div>

      <h2 className={styles.title}>Tudo pronto, Ana!</h2>
      <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>
        Sua conta foi criada. Vamos escanear o primeiro ambiente?
      </p>

      {/* Caixa de Resumo */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Loja</span>
          <span className={styles.summaryValueBold}>Pinheiros</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Câmera</span>
          <span className={styles.summaryValueActive}>Ativada</span>
        </div>
        <div className={styles.summaryRow} style={{ borderBottom: 'none' }}>
          <span className={styles.summaryLabel}>Avisos</span>
          <span className={styles.summaryValueMuted}>Desativados</span>
        </div>
      </div>

      <div className={styles.actions} style={{ marginTop: '1.5rem' }}>
        <BotaoCustomizado 
          texto="Escanear meu primeiro ambiente"
          tamanho="grande"
          variante="verde"
          onClick={onEscanear}
        />
        
        <button 
          type="button" 
          onClick={onExplorar}
          className={styles.textActionLink}
          style={{ width: '100%', textAlign: 'center', marginTop: '0.8rem' }}
        >
          Explorar o app
        </button>
      </div>
    </div>
  );
}