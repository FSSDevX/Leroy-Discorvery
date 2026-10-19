// src/components/ProductCard/ProductCard.jsx
import { Heart } from 'lucide-react';
import NoticeBanner from '../NoticeBanner/NoticeBanner';
import styles from './ProductCard.module.css';

export function ProductCard({ 
  produto, 
  preco, 
  textoAlerta = 'Sem estoque', 
  mostrarAlerta = true, 
  isFavorito, 
  onToggleFavorito 
}) {
  const precoFormatado = Number(preco || 0).toFixed(2).replace('.', ',');

  return (
    <div className={styles.card}>
      {/* Lado esquerdo: Imagem e Informações */}
      <div className={styles.infoContainer}>
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className={styles.imagem}
        />
        <div className={styles.detalhes}>
          <h4 className={styles.titulo}>
            {produto.nome}
          </h4>
          <span className={styles.preco}>
            R$ {precoFormatado}
          </span>
          
          {/* NoticeBanner puxado para baixo do preço */}
          {mostrarAlerta && (
            <NoticeBanner texto={textoAlerta} />
          )}
        </div>
      </div>

      {/* Lado direito: Coração de favorito */}
      <button 
        onClick={onToggleFavorito} 
        className={styles.favoriteButton}
        aria-label="Favoritar produto"
      >
        <Heart 
          size={24} 
          className={`${styles.heartIcon} ${isFavorito ? styles.favorito : ''}`}
        />
      </button>
    </div>
  );
}

export default ProductCard;