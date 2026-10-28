import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { produtos } from './data/produtos';
import { catalogo } from './data/catalogo';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProductCard from './components/ProductCard/ProductCard';
import FavoriteButton from './components/FavoriteButton/FavoriteButton';
import BackButton from './components/BackButton/BackButton';
import CustomizedButton from './components/CustomizedButton/CustomizedButton';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';
import StoreAvailabilityPage from './pages/StoreAvailabilityPage';
import StoreMapPage from './pages/StoreMapPage';
import CheckoutPage from './pages/CheckoutPage'; // 👈 Importa a página de Checkout (H1 a H4)

// Componente da Página do Catálogo
function CatalogPage() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [idsFavoritos, setIdsFavoritos] = useState([]);

  const handleToggleFavorito = (produtoId) => {
    if (idsFavoritos.includes(produtoId)) {
      setIdsFavoritos(idsFavoritos.filter(id => id !== produtoId));
    } else {
      setIdsFavoritos([...idsFavoritos, produtoId]);
    }
  };

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
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Poppins, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#0A3323', margin: 0, fontSize: '1.8rem' }}>Catálogo</h1>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link 
            to="/scan" 
            style={{ padding: '8px 14px', backgroundColor: '#0A3323', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500' }}
          >
            📸 Escanear Sala
          </Link>

          <FavoriteButton 
            onClick={() => setPaginaAtual('favoritos')} 
          />
        </div>
      </div>

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
              mostrarAlerta={prod.semEstoque} 
              isFavorito={isFavorito}
              onToggleFavorito={() => handleToggleFavorito(prod.id)}
            />
          );
        })}
      </section>

    </div>
  );
}

// Configuração Principal com o Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/availability" element={<StoreAvailabilityPage />} />
        <Route path="/store-map" element={<StoreMapPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* 👈 Rota para o fluxo de pagamento e caixa */}
      </Routes>
    </Router>
  );
}