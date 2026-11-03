import { MapPin, Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepLocalizacao({ onPermitirGps, onIrParaCep }) {
  return (
    <div className={styles.stepContent}>
      <div className={styles.iconContainer}>
        <MapPin size={40} color="#0A3323" />
      </div>

      <h2 className={styles.title}>Encontre a loja mais perto</h2>
      <p className={styles.subtitle}>
        Usamos sua localização para mostrar o que tem em estoque e a rota até as prateleiras.
      </p>

      <div className={styles.featuresList}>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Só enquanto o app está aberto</span>
        </div>
        <div className={styles.featureItem}>
          <Check size={16} color="#0A3323" />
          <span>Você muda isso quando quiser</span>
        </div>
      </div>

      <div className={styles.actions}>
        <BotaoCustomizado 
          texto="Permitir localização"
          tamanho="grande"
          variante="verde"
          onClick={onPermitirGps}
        />
        <BotaoCustomizado 
          texto="Informar CEP"
          tamanho="grande"
          variante="branco"
          onClick={onIrParaCep}
        />
      </div>
    </div>
  );
}