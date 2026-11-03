import { useState } from 'react';
import { Check } from 'lucide-react';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import { lojas } from '../../data/lojas';
import styles from './PermissoesSteps.module.css';

export function StepLoja({ onConfirmar }) {
  const [lojaSelecionada, setLojaSelecionada] = useState(lojas[0]?.id);

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.title} style={{ alignSelf: 'flex-start', marginBottom: '0.4rem' }}>
        Escolha sua loja
      </h2>
      <p className={styles.subtitle} style={{ alignSelf: 'flex-start', marginBottom: '1.2rem' }}>
        Encontramos {lojas.length} lojas perto de você.
      </p>

      <div className={styles.listLojas}>
        {lojas.map((loja) => {
          const selecionada = lojaSelecionada === loja.id;
          return (
            <div 
              key={loja.id}
              onClick={() => setLojaSelecionada(loja.id)}
              className={`${styles.cardLoja} ${selecionada ? styles.cardLojaSelecionada : ''}`}
            >
              <div className={styles.infoLoja}>
                <span className={styles.nomeLoja}>{loja.nome}</span>
                <span className={styles.statusLoja}>{loja.status}</span>
              </div>
              <div className={`${styles.radioBox} ${selecionada ? styles.radioBoxChecked : ''}`}>
                {selecionada && <Check size={14} color="#FFF" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.actions}>
        <BotaoCustomizado 
          texto="Confirmar loja"
          tamanho="grande"
          variante="verde"
          onClick={() => onConfirmar(lojaSelecionada)}
        />
      </div>
    </div>
  );
}