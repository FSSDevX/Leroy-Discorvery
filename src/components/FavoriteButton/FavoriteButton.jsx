import { Heart } from 'lucide-react';
import styles from './FavoriteButton.module.css';

export function FavoriteButton({ onClick }) {
  return (
    <button 
      className={styles.favoriteButton}
      onClick={onClick}
    >
      <Heart 
        size={20} 
        color="#0A3323" 
        fill="none" 
        strokeWidth={2.5} 
      />
    </button>
  );
}

export default FavoriteButton;