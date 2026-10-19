import { useState } from 'react';
import { produtos } from './data/produtos';
import { catalogo } from './data/catalogo';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProductCard from './components/ProductCard/ProductCard';
import FavoriteButton from './components/FavoriteButton/FavoriteButton';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [idsFavoritos, setIdsFavoritos] = useState([]);

  const handleToggleFavorito = (produtoId) => {
    if (idsFavoritos.includes(produtoId)) {
      setIdsFavoritos(idsFavoritos.filter(id => id !== produtoId));
    } else {
      setIdsFavoritos([...idsFavoritos, produtoId]);
    }
  };

  // Mapeia os produtos unindo as informações básicas com o preço do catálogo (ex: pegando o primeiro preço disponível na loja 101)
  const produtosComPreco = produtos.map((prod) => {
    const itemCatalogo = catalogo.find(item => item.produtoId === prod.id);
    return {
      ...prod,
      preco: itemCatalogo ? itemCatalogo.preco : 0
    };
  });

  const produtosFavoritados = produtosComPreco.filter(prod => idsFavoritos.includes(prod.id));

  if (paginaAtual === 'favoritos') {
    return (
      <FavoritesPage 
        favoritos={produtosFavoritados} 
        onVoltar={() => setPaginaAtual('home')} 
        onToggleFavorito={handleToggleFavorito}
      />
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#0A3323', margin: 0, fontSize: '1.8rem' }}>Catálogo</h1>
        <FavoriteButton 
          onClick={() => setPaginaAtual('favoritos')} 
          isFavorite={idsFavoritos.length > 0}
        />
      </div>

      {/* Seção de Produtos Dinâmicos */}
      <section>
        {produtosComPreco.map((prod) => {
          const isFavorito = idsFavoritos.includes(prod.id);
          return (
            <ProductCard 
              key={prod.id} 
              produto={prod} 
              preco={prod.preco} 
              isFavorito={isFavorito}
              onToggleFavorito={() => handleToggleFavorito(prod.id)}
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;