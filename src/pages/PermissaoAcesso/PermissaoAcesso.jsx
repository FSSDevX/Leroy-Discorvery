import { useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { StepCamera } from '../../components/PermissoesSteps/StepCamera';
import { StepLocalizacao } from '../../components/PermissoesSteps/StepLocalizacao';
import { StepCep } from '../../components/PermissoesSteps/StepCep';
import { StepLoja } from '../../components/PermissoesSteps/StepLoja';
import { StepNotificacao } from '../../components/PermissoesSteps/StepNotificacao';
import { StepPreferencias } from '../../components/PermissoesSteps/StepPreferencias';
import { StepSucesso } from '../../components/PermissoesSteps/StepSucesso';
import styles from './PermissaoAcesso.module.css';

export function PermissaoAcesso({ onVoltarGeral, onConcluir }) {
  const [passo, setPasso] = useState(1);

  const voltarPasso = () => {
    if (passo > 1) {
      if (passo === 4) {
        setPasso(2); // Se estiver na loja vindo direto do GPS, volta para Localização
      } else {
        setPasso(prev => prev - 1);
      }
    } else {
      if (onVoltarGeral) onVoltarGeral();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {passo < 7 && <BackButton onClick={voltarPasso} />}
      </div>

      {passo === 1 && <StepCamera onAvancar={() => setPasso(2)} />}
      
      {passo === 2 && (
        <StepLocalizacao 
          onPermitirGps={() => setPasso(4)} 
          onIrParaCep={() => setPasso(3)} 
        />
      )}

      {passo === 3 && (
        <StepCep 
          onBuscarLojas={() => setPasso(4)} 
          onVoltarParaGps={() => setPasso(2)} 
        />
      )}

      {passo === 4 && <StepLoja onConfirmar={() => setPasso(5)} />}
      
      {passo === 5 && <StepNotificacao onAvancar={() => setPasso(6)} />}

      {passo === 6 && (
        <StepPreferencias 
          onConcluir={() => setPasso(7)} 
          onPular={() => setPasso(7)} 
        />
      )}

      {passo === 7 && (
        <StepSucesso 
          onEscanear={() => {
            if (onConcluir) onConcluir();
          }}
          onExplorar={() => {
            if (onConcluir) onConcluir();
          }}
        />
      )}
    </div>
  );
}