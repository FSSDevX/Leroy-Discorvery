import { ChevronLeft } from 'lucide-react';
import styles from './BackButton.module.css';

export function BackButton({ onClick }) {
  return (
    <button 
      className={styles.backButton}
      onClick={onClick}
    >
      <ChevronLeft size={20} color="#0A3323" strokeWidth={2.5} />
    </button>
  );
}

export default BackButton;