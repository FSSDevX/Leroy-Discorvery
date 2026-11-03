import { Camera, Home, MapPin } from 'lucide-react';
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import logoImg from '../../assets/logo.png';
import bannerImg from '../../assets/banner.jpg';
import styles from './BoasVindas.module.css';

export function BoasVindas({ onCriarConta, onJaTenhoConta, onContinuarSemCadastro }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Logótipo em Imagem */}
        <div className={styles.logoContainer}>
          <img 
            src={logoImg} 
            alt="Leroy Discovery" 
            className={styles.logoImage} 
          />
        </div>

        {/* Imagem em Destaque (Banner) */}
        <div className={styles.imageWrapper}>
          <img 
            src={bannerImg} 
            alt="Ambiente decorado" 
            className={styles.heroImage}
          />
        </div>

        {/* Título Principal */}
        <h1 className={styles.title}>
          Descubra o que combina com a sua casa
        </h1>

        {/* Lista de Vantagens / Funcionalidades */}
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <Camera size={20} color="#0A3323" />
            </div>
            <span className={styles.featureText}>Escaneie um ambiente com a câmera</span>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <Home size={20} color="#0A3323" />
            </div>
            <span className={styles.featureText}>Veja produtos que combinam com ele</span>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconCircle}>
              <MapPin size={20} color="#0A3323" />
            </div>
            <span className={styles.featureText}>Confira o que tem na loja mais perto</span>
          </div>
        </div>

        {/* Ações / Botões utilizando o CustomizedButton */}
        <div className={styles.actions}>
          <CustomizedButton 
            texto="Criar conta"
            tamanho="grande"
            variante="verde"
            onClick={onCriarConta}
          />

          <CustomizedButton 
            texto="Já tenho conta"
            tamanho="grande"
            variante="branco"
            onClick={onJaTenhoConta}
          />

          <CustomizedButton 
            texto="Continuar sem cadastro"
            tamanho="grande"
            variante="texto" /* Ou "link", dependendo do nome no teu CustomizedButton */
            onClick={onContinuarSemCadastro}
          />
        </div>

      </div>
    </div>
  );
}