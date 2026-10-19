import styles from './NoticeBanner.module.css';

export function NoticeBanner({ texto = 'Sem estoque' }) {
  return (
    <div className={styles.alertBadge}>
      <span className={styles.alertText}>
        {texto}
      </span>
    </div>
  );
}

export default NoticeBanner;