import { useState } from 'react';
import { BoasVindas } from './pages/BoasVindas/BoasVindas';
import { Login } from './pages/Login/Login';
import { Cadastro } from './pages/Cadastro/Cadastro';
import { PermissaoAcesso } from './pages/PermissaoAcesso/PermissaoAcesso';
import { SemCadastro } from './pages/SemCadastro/SemCadastro';

export function App() {
  const [telaAtual, setTelaAtual] = useState('boas-vindas');

  return (
    <>
      {telaAtual === 'boas-vindas' && (
        <BoasVindas 
          onCriarConta={() => setTelaAtual('cadastro')}
          onJaTenhoConta={() => setTelaAtual('login')}
          onContinuarSemCadastro={() => setTelaAtual('sem-cadastro')}
        />
      )}

      {telaAtual === 'sem-cadastro' && (
        <SemCadastro 
          onVoltar={() => setTelaAtual('boas-vindas')}
          onCriarConta={() => setTelaAtual('cadastro')}
          onContinuarConvidado={() => alert('Entrando no app como convidado...')}
        />
      )}

      {telaAtual === 'cadastro' && (
        <Cadastro 
          onVoltar={() => setTelaAtual('boas-vindas')}
          onSucesso={() => setTelaAtual('onboarding')}
        />
      )}

      {telaAtual === 'login' && (
        <Login 
          onVoltar={() => setTelaAtual('boas-vindas')}
          onEntrar={(dados) => {
            console.log('Login efetuado:', dados);
            alert('Login efetuado com sucesso!');
          }} 
          onIrParaCadastro={() => setTelaAtual('cadastro')} 
        />
      )}

      {telaAtual === 'onboarding' && (
        <PermissaoAcesso 
          onVoltarGeral={() => setTelaAtual('cadastro')}
          onConcluir={() => {
            alert('Configuração concluída!');
            setTelaAtual('login');
          }}
        />
      )}
    </>
  );
}