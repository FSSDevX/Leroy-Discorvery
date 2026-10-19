import BackButton from '../../components/BackButton/BackButton';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './FavoritesPage.module.css';

export function FavoritesPage({ favoritos = [], onVoltar, onToggleFavorito }) {
  return (
    <div className={styles.container}>
      {/* Cabeçalho limpo com o botão de voltar */}
      <header className={styles.header}>
        <BackButton onClick={onVoltar} />
        <h1 className={styles.title}>Meus Favoritos</h1>
      </header>

      {/* Lista de Produtos Favoritados */}
      {favoritos.length > 0 ? (
        <div className={styles.productList}>
          {favoritos.map((prod) => (
            <ProductCard 
              key={prod.id} 
              produto={prod} 
              preco={prod.preco} 
              isFavorito={true}
              onToggleFavorito={() => onToggleFavorito(prod.id)}
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio simples */
        <div className={styles.emptyState}>
          <p>Você ainda não tem nenhum produto favoritado.</p>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;