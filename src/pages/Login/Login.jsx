import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ScanFace } from 'lucide-react';
import { BackButton } from '../../components/BackButton/BackButton'; // Ajusta o caminho se necessário
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import styles from './Login.module.css';

export function Login({ onEntrar, onIrParaCadastro, onVoltar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEntrar) {
      onEntrar({ email, senha });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          {onVoltar && <BackButton onClick={onVoltar} />}
        </div>

        <h1 className={styles.title}>Que bom ver você de novo</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>E-mail</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} color="#0A3323" className={styles.inputIcon} />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} color="#0A3323" className={styles.inputIcon} />
              <input 
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
                className={styles.inputField}
              />
              <button 
                type="button" 
                onClick={() => setMostrarSenha(!mostrarSenha)} 
                className={styles.eyeButton}
              >
                {mostrarSenha ? <EyeOff size={18} color="#0A3323" /> : <Eye size={18} color="#0A3323" />}
              </button>
            </div>
            <a href="#esqueci-senha" className={styles.forgotPassword}>
              Esqueci minha senha
            </a>
          </div>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>ou</span>
            <div className={styles.dividerLine} />
          </div>

          <div className={styles.socialButtonsContainer}>
            <button 
              type="button" 
              onClick={() => alert('Login com Google')}
              className={styles.socialButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.13 0 9.87 0 11.7c0 1.83.43 3.57 1.18 5.09l4.09-2.55z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              <span>Google</span>
            </button>

            <button 
              type="button" 
              onClick={() => alert('Login com Apple')}
              className={styles.socialButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A3323">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.95 5.05c.57-.69.96-1.65.86-2.61-.84.03-1.85.56-2.45 1.25-.53.6-.99 1.58-.87 2.53.95.07 1.91-.48 2.46-1.17z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className={styles.actions}>
            <CustomizedButton 
              texto="Entrar"
              tamanho="grande"
              variante="verde"
              tipo="submit"
            />

            <button 
              type="button" 
              onClick={() => alert('Autenticação por Face ID')}
              className={styles.faceIdButton}
            >
              <ScanFace size={20} color="#0A3323" />
              <span>Entrar com Face ID</span>
            </button>
          </div>
        </form>

        <div className={styles.footerAction}>
          <span>Não tem conta? </span>
          <button 
            type="button" 
            onClick={onIrParaCadastro}
            className={styles.linkButton}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}