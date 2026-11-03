import { Check, X } from 'lucide-react';
import { BackButton } from '../../components/BackButton/BackButton';
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import styles from './SemCadastro.module.css';

export function SemCadastro({ onVoltar, onCriarConta, onContinuarConvidado }) {
  return (
    <div className={styles.container}>
      {/* Botão de Voltar */}
      <div className={styles.header}>
        <BackButton onClick={onVoltar} />
      </div>

      {/* Título e Subtítulo */}
      <h1 className={styles.title}>Explorando sem conta</h1>
      <p className={styles.subtitle}>
        Você pode testar o app, mas alguns recursos precisam de cadastro.
      </p>

      {/* Caixa de Permissões / Recursos */}
      <div className={styles.featuresCard}>
        <div className={styles.featureItem}>
          <Check size={18} color="#2E7D32" className={styles.iconCheck} />
          <span>Escanear ambientes</span>
        </div>

        <div className={styles.featureItem}>
          <Check size={18} color="#2E7D32" className={styles.iconCheck} />
          <span>Ver sugestões de produtos</span>
        </div>

        <div className={styles.featureItem}>
          <X size={18} color="#C62828" className={styles.iconCross} />
          <span className={styles.disabledText}>Salvar projetos e favoritos</span>
        </div>

        <div className={styles.featureItem}>
          <X size={18} color="#C62828" className={styles.iconCross} />
          <span className={styles.disabledText}>Ver estoque e rota na loja</span>
        </div>

        <div className={styles.featureItem}>
          <X size={18} color="#C62828" className={styles.iconCross} />
          <span className={styles.disabledText}>Receber cupons e ofertas</span>
        </div>
      </div>

      {/* Botões de Ação Inferiores */}
      <div className={styles.actions}>
        <CustomizedButton 
          texto="Criar conta grátis"
          tamanho="grande"
          variante="verde"
          onClick={onCriarConta}
        />

        <CustomizedButton 
          texto="Continuar como convidado"
          tamanho="grande"
          variante="branco"
          onClick={onContinuarConvidado}
        />
      </div>
    </div>
  );
}