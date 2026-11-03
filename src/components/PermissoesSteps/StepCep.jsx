import { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './PermissoesSteps.module.css';

export function StepCep({ onBuscarLojas, onVoltarParaGps }) {
  const [cep, setCep] = useState('05422-');

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.title} style={{ alignSelf: 'flex-start', marginBottom: '1.2rem' }}>
        Informe seu CEP
      </h2>

      <div className={styles.alertBox}>
        <AlertCircle size={20} color="#B58500" style={{ flexShrink: 0 }} />
        <span>Localização desativada. Você pode ligar depois em Configurações.</span>
      </div>

      <div className={styles.inputGroupContainer}>
        <label className={styles.inputLabel}>CEP</label>
        <div className={styles.inputWrapper}>
          <MapPin size={18} color="#666" />
          <input 
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength={9}
            className={styles.inputField}
          />
        </div>
        <span className={styles.inputHelp}>Usamos só para achar a loja mais próxima.</span>
      </div>

      <div className={styles.actions} style={{ marginTop: '2rem' }}>
        <BotaoCustomizado 
          texto="Buscar lojas"
          tamanho="grande"
          variante="verde"
          onClick={onBuscarLojas}
        />
        
        <button 
          type="button" 
          onClick={onVoltarParaGps}
          className={styles.textActionLink}
        >
          Usar minha localização
        </button>
      </div>
    </div>
  );
}