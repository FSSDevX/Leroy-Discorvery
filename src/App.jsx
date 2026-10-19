import { useState } from 'react';
import { produtos } from './data/produtos';
import { catalogo } from './data/catalogo';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProductCard from './components/ProductCard/ProductCard';
import FavoriteButton from './components/FavoriteButton/FavoriteButton';
import BackButton from './components/BackButton/BackButton';
import CustomizedButton from './components/CustomizedButton/CustomizedButton';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [idsFavoritos, setIdsFavoritos] = useState([]);

  // Função para favoritar ou desfavoritar um produto
  const handleToggleFavorito = (produtoId) => {
    if (idsFavoritos.includes(produtoId)) {
      setIdsFavoritos(idsFavoritos.filter(id => id !== produtoId));
    } else {
      setIdsFavoritos([...idsFavoritos, produtoId]);
    }
  };

  // Cruza os dados de produtos.js com catalogo.js para pegar preço e estoque reais
  const produtosComPreco = produtos.map((prod) => {
    const itemCatalogo = catalogo.find(item => item.produtoId === prod.id);
    const preco = itemCatalogo ? itemCatalogo.preco : 0;
    const estoque = itemCatalogo ? itemCatalogo.estoque : 0;

    return {
      ...prod,
      preco,
      estoque,
      semEstoque: estoque === 0
    };
  });

  // Filtra a lista para a página de favoritos
  const produtosFavoritados = produtosComPreco.filter(prod => idsFavoritos.includes(prod.id));

  // Renderização condicional: Página de Favoritos
  if (paginaAtual === 'favoritos') {
    return (
      <FavoritesPage 
        favoritos={produtosFavoritados} 
        onVoltar={() => setPaginaAtual('home')} 
        onToggleFavorito={handleToggleFavorito}
      />
    );
  }

  // Renderização principal: Home / Catálogo
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Cabeçalho com o FavoriteButton de atalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#0A3323', margin: 0, fontSize: '1.8rem' }}>Catálogo</h1>
        
        <FavoriteButton 
          onClick={() => setPaginaAtual('favoritos')} 
        />
      </div>

      {/* Seção de Listagem de Produtos (ProductCard + NoticeBanner) */}
      <section>
        <h2 style={{ fontSize: '1.2rem', color: '#0A3323', marginBottom: '16px' }}>Produtos Disponíveis</h2>
        {produtosComPreco.map((prod) => {
          const isFavorito = idsFavoritos.includes(prod.id);
          return (
            <ProductCard 
              key={prod.id} 
              produto={prod} 
              preco={prod.preco} 
              textoAlerta="Sem estoque"
              mostrarAlerta={prod.semEstoque} // Exibe o NoticeBanner/Badge se o estoque for 0
              isFavorito={isFavorito}
              onToggleFavorito={() => handleToggleFavorito(prod.id)}
            />
          );
        })}
      </section>

      {/* Seção Demonstrativa de Todos os Componentes de Apoio */}
      <section style={{ borderTop: '1px solid #E0DBB0', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#0A3323', margin: 0 }}>Componentes e Variações</h2>
        
        {/* BackButton */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <BackButton onClick={() => alert('BackButton clicado!')} />
          <span style={{ fontSize: '0.9rem', color: '#555' }}>Componente BackButton</span>
        </div>

        {/* Vitrine completa do CustomizedButton (Pequeno, Grande, Verde, Branco e Texto) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '1rem', color: '#0A3323', margin: '0 0 4px 0' }}>Variações do CustomizedButton:</h3>

          <CustomizedButton 
            texto="Pequeno Verde" 
            tamanho="pequeno" 
            variante="verde" 
            onClick={() => alert('Clicou no Pequeno Verde!')} 
          />

          <CustomizedButton 
            texto="Pequeno Branco" 
            tamanho="pequeno" 
            variante="branco" 
            onClick={() => alert('Clicou no Pequeno Branco!')} 
          />

          <CustomizedButton 
            texto="Grande Verde" 
            tamanho="grande" 
            variante="verde" 
            onClick={() => alert('Clicou no Grande Verde!')} 
          />

          <CustomizedButton 
            texto="Grande Branco" 
            tamanho="grande" 
            variante="branco" 
            onClick={() => alert('Clicou no Grande Branco!')} 
          />

          <CustomizedButton 
            texto="Estilo Texto" 
            variante="texto" 
            onClick={() => alert('Clicou no Estilo Texto!')} 
          />
        </div>
      </section>

    </div>
  );
}

export default App;