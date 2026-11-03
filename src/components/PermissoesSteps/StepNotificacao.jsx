import { Bell, Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepNotificacao({ onAvancar }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.iconContainer}>
        <Bell size={40} color="#0A3323" />
      </div>

      <h2 className={styles.title}>Quer receber avisos?</h2>
      <p className={styles.subtitle}>
        Avisamos quando um item salvo voltar ao estoque ou entrar em oferta.
      </p>

      <div className={styles.featuresList}>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Item salvo voltou ao estoque</span>
        </div>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Oferta em produtos do seu projeto</span>
        </div>
      </div>

      <div className={styles.actions}>
        <BotaoCustomizado 
          texto="Ativar avisos"
          tamanho="grande"
          variante="verde"
          onClick={() => onAvancar(true)}
        />
        <BotaoCustomizado 
          texto="Agora não"
          tamanho="grande"
          variante="branco"
          onClick={() => onAvancar(false)}
        />
      </div>
    </div>
  );
}