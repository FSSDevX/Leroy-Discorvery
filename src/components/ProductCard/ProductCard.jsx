import React from 'react';
import { Heart } from 'lucide-react';
import NoticeBanner from '../NoticeBanner/NoticeBanner';
import styles from './ProductCard.module.css';

export default function ProductCard({ 
  produto, 
  preco, 
  mostrarAlerta, 
  textoAlerta, 
  isFavorito, 
  onToggleFavorito 
}) {
  return (
    <div className={styles.card}>
      
      {/* Container com a imagem e os detalhes do produto */}
      <div className={styles.infoContainer}>
        <img 
          src={produto.imagem || 'https://via.placeholder.com/80'} 
          alt={produto.nome} 
          className={styles.imagem} 
        />
        
        <div className={styles.detalhes}>
          <h3 className={styles.titulo}>{produto.nome}</h3>
          
          <span className={styles.preco}>
            R$ {typeof preco === 'number' ? preco.toFixed(2) : preco}
          </span>

          {/* Exibe o NoticeBanner caso o produto esteja sem estoque */}
          {mostrarAlerta && <NoticeBanner texto={textoAlerta} />}
        </div>
      </div>

      {/* Botão de Favoritar */}
      <button 
        className={styles.favoriteButton} 
        onClick={onToggleFavorito}
        type="button"
        aria-label="Favoritar produto"
      >
        <Heart 
          size={20} 
          className={`${styles.heartIcon} ${isFavorito ? styles.favorito : ''}`}
          fill={isFavorito ? '#e63946' : 'none'} 
          strokeWidth={2.5} 
        />
      </button>

    </div>
  );
}