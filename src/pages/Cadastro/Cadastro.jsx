import { useState } from 'react';
import { 
  User, 
  Mail, 
  Smartphone, 
  Lock, 
  Check, 
  Eye, 
  EyeOff, 
  Circle,
  ShieldCheck
} from 'lucide-react';
import { BackButton } from '../../components/BackButton/BackButton';
import styles from './Cadastro.module.css';

export function Cadastro({ onVoltar, onSucesso }) {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    senha: ''
  });

  const [touched, setTouched] = useState({
    nomeCompleto: false,
    email: false,
    celular: false,
    senha: false
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [receberOfertas, setReceberOfertas] = useState(false);

  const validarNome = (nome) => {
    const partes = nome.trim().split(/\s+/);
    return partes.length >= 2 && partes.every(parte => parte.length >= 2);
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validarCelular = (cel) => {
    const apenasNumeros = cel.replace(/\D/g, '');
    return apenasNumeros.length >= 10;
  };

  const temOitoCaracteres = formData.senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(formData.senha);
  const temMinuscula = /[a-z]/.test(formData.senha);
  const temNumero = /\d/.test(formData.senha);
  
  const senhaValida = temOitoCaracteres && temMaiuscula && temMinuscula && temNumero;

  const formularioValido = 
    validarNome(formData.nomeCompleto) &&
    validarEmail(formData.email) &&
    validarCelular(formData.celular) &&
    senhaValida &&
    aceitoTermos;

  const formatarCelular = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 2) {
      return apenasNumeros.length ? `(${apenasNumeros}` : '';
    }
    if (apenasNumeros.length <= 7) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    }
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'celular') {
      const valorFormatado = formatarCelular(value);
      setFormData(prev => ({ ...prev, [name]: valorFormatado }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ nomeCompleto: true, email: true, celular: true, senha: true });

    if (formularioValido) {
      console.log("Dados enviados:", { ...formData, aceitoTermos, receberOfertas });
      if (onSucesso) {
        onSucesso(); // Redireciona para a tela de permissão de acesso
      }
    }
  };

  const getStatus = (field, isValid) => {
    if (!touched[field] && formData[field] === '') return 'normal';
    return isValid ? 'valid' : 'invalid';
  };

  const nomeStatus = getStatus('nomeCompleto', validarNome(formData.nomeCompleto));
  const emailStatus = getStatus('email', validarEmail(formData.email));
  const celularStatus = getStatus('celular', validarCelular(formData.celular));
  const senhaStatus = getStatus('senha', senhaValida);

  const getContainerClass = (status) => {
    if (status === 'valid') return `${styles.inputContainer} ${styles.inputContainerValid}`;
    if (status === 'invalid') return `${styles.inputContainer} ${styles.inputContainerInvalid}`;
    return styles.inputContainer;
  };

  const getIconColor = (status) => {
    if (status === 'valid') return '#0A3323';
    if (status === 'invalid') return '#D9534F';
    return '#666';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton onClick={onVoltar} />
        
        <div className={styles.progressBar}>
          <div className={styles.progressStepActive}></div>
          <div className={styles.progressStepActive}></div>
          <div className={styles.progressStepActive}></div>
          <div className={styles.progressStepActive}></div>
          <div className={styles.progressStepActive}></div>
        </div>
      </div>

      <h2 className={styles.title}>Criar Conta</h2>
      <p className={styles.subtitle}>Preencha os dados e termos para concluir.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Nome Completo */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome completo</label>
          <div className={getContainerClass(nomeStatus)}>
            <User size={20} color={getIconColor(nomeStatus)} />
            <input 
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              onBlur={() => handleBlur('nomeCompleto')}
              placeholder="Digite nome completo"
              className={styles.input}
            />
            {nomeStatus === 'valid' && <Check size={20} color="#0A3323" />}
          </div>
          {nomeStatus === 'invalid' && <span className={styles.errorText}>Digite o nome e o sobrenome.</span>}
        </div>

        {/* E-mail */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>E-mail</label>
          <div className={getContainerClass(emailStatus)}>
            <Mail size={20} color={getIconColor(emailStatus)} />
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="Digite seu e-mail"
              className={styles.input}
            />
            {emailStatus === 'valid' && <Check size={20} color="#0A3323" />}
          </div>
          {emailStatus === 'invalid' && <span className={styles.errorText}>Digite um e-mail válido, como nome@email.com</span>}
        </div>

        {/* Celular */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Celular</label>
          <div className={getContainerClass(celularStatus)}>
            <Smartphone size={20} color={getIconColor(celularStatus)} />
            <input 
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              onBlur={() => handleBlur('celular')}
              placeholder="(11) 99999-9999"
              maxLength={15}
              className={styles.input}
            />
            {celularStatus === 'valid' && <Check size={20} color="#0A3323" />}
          </div>
          {celularStatus === 'invalid' && <span className={styles.errorText}>Celular incompleto. Use DDD + 9 dígitos.</span>}
        </div>

        {/* Senha */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Senha</label>
          <div className={getContainerClass(senhaStatus)}>
            <Lock size={20} color={getIconColor(senhaStatus)} />
            <input 
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              onBlur={() => handleBlur('senha')}
              placeholder="••••"
              className={styles.input}
            />
            <button 
              type="button" 
              onClick={() => setMostrarSenha(!mostrarSenha)} 
              className={styles.eyeButton}
            >
              {mostrarSenha ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </button>
            {senhaStatus === 'valid' && <Check size={20} color="#0A3323" style={{ marginLeft: '8px' }} />}
          </div>
          
          {senhaStatus === 'invalid' && touched.senha && (
            <span className={styles.errorText} style={{ marginBottom: '0.3rem' }}>Senha fraca. Complete os itens abaixo.</span>
          )}

          <div className={styles.passwordCriteria}>
            <div className={temOitoCaracteres ? styles.criteriaItemValid : styles.criteriaItemInvalid}>
              {temOitoCaracteres ? <Check size={14} color="#0A3323" /> : <Circle size={8} color="#999" />}
              <span>Pelo menos 8 caracteres</span>
            </div>
            <div className={temMaiuscula ? styles.criteriaItemValid : styles.criteriaItemInvalid}>
              {temMaiuscula ? <Check size={14} color="#0A3323" /> : <Circle size={8} color="#999" />}
              <span>Pelo menos 1 letra maiúscula</span>
            </div>
            <div className={temMinuscula ? styles.criteriaItemValid : styles.criteriaItemInvalid}>
              {temMinuscula ? <Check size={14} color="#0A3323" /> : <Circle size={8} color="#999" />}
              <span>Pelo menos 1 letra minúscula</span>
            </div>
            <div className={temNumero ? styles.criteriaItemValid : styles.criteriaItemInvalid}>
              {temNumero ? <Check size={14} color="#0A3323" /> : <Circle size={8} color="#999" />}
              <span>Pelo menos 1 número</span>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Termos e Privacidade */}
        <div className={styles.termsContainer}>
          <div className={styles.alertBox}>
            <ShieldCheck size={20} color="#0A3323" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span className={styles.alertText}>
              Usamos a câmera só para analisar o ambiente. Suas fotos não são compartilhadas.
            </span>
          </div>

          <div 
            onClick={() => setAceitoTermos(!aceitoTermos)}
            className={styles.checkboxRow}
          >
            <div className={`${styles.checkboxBox} ${aceitoTermos ? styles.checkboxBoxChecked : ''}`}>
              {aceitoTermos && '✓'}
            </div>
            <span className={styles.checkboxLabel}>
              Li e aceito os Termos de Uso e a Política de Privacidade (obrigatório)
            </span>
          </div>

          <div 
            onClick={() => setReceberOfertas(!receberOfertas)}
            className={styles.checkboxRow}
          >
            <div className={`${styles.checkboxBox} ${receberOfertas ? styles.checkboxBoxChecked : ''}`}>
              {receberOfertas && '✓'}
            </div>
            <span className={styles.checkboxLabel}>
              Quero receber ofertas e novidades por e-mail (opcional)
            </span>
          </div>

          <div>
            <a href="#politica" onClick={(e) => { e.preventDefault(); alert("Abrir política de privacidade"); }} className={styles.privacyLink}>
              Ler Política de Privacidade
            </a>
          </div>
        </div>

        <button 
          type="submit"
          disabled={!formularioValido}
          className={styles.submitButton}
        >
          Aceitar e Continuar
        </button>

      </form>
    </div>
  );
}