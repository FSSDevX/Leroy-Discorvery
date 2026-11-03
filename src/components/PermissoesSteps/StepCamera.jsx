import { Camera, Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepCamera({ onAvancar }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.iconContainer}>
        <Camera size={40} color="#0A3323" />
      </div>

      <h2 className={styles.title}>Permitir acesso à câmera</h2>
      <p className={styles.subtitle}>
        Precisamos da câmera para escanear o ambiente e sugerir produtos que combinam com ele.
      </p>

      <div className={styles.featuresList}>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Usada só quando você escaneia</span>
        </div>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Nenhuma foto é salva sem a sua escolha</span>
        </div>
      </div>

      <div className={styles.actions}>
        <BotaoCustomizado 
          texto="Permitir acesso"
          tamanho="grande"
          variante="verde"
          onClick={onAvancar}
        />
        <BotaoCustomizado 
          texto="Agora não"
          tamanho="grande"
          variante="branco"
          onClick={onAvancar}
        />
      </div>
    </div>
  );
}