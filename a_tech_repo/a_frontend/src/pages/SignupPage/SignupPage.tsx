import { useNavigate } from 'react-router';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Button } from '../../components/Button/Button';
import { BetaBadge } from '../../components/Logo/Logo';
import { SuccessPanel } from '../../components/SuccessPanel/SuccessPanel';
import { SignupForm } from '../../features/auth/components/SignupForm/SignupForm';
import { SignupEditorial } from '../../features/auth/components/SignupEditorial/SignupEditorial';
import { useCadastro } from '../../features/auth/hooks/useCadastro';
import styles from './SignupPage.module.css';

/** TELA-02 Cadastro — rota /cadastro. Visual: Figma 8:106 / 8:115. Comportamento: spec TELA-02. */
export function SignupPage() {
  const navigate = useNavigate();
  const cadastro = useCadastro();

  return (
    <AuthLayout mirrored editorial={<SignupEditorial />}>
      {cadastro.isSuccess ? (
        <SuccessPanel
          title="Conta criada!"
          action={
            <Button fullWidth onClick={() => navigate('/guarda-roupa')}>
              Ir para o guarda-roupa
            </Button>
          }
        >
          <p className={styles.successText}>
            Bem-vindo(a), {cadastro.data.nome}. Seu guarda-roupa está pronto para receber as
            primeiras peças.
          </p>
          <p className={styles.betaNote}>
            <BetaBadge />
            <span>Durante o beta, os dados podem ser apagados ao final do teste.</span>
          </p>
        </SuccessPanel>
      ) : (
        <SignupForm
          onSubmit={(dados) => cadastro.mutate(dados)}
          loading={cadastro.isPending}
          serverError={cadastro.error}
        />
      )}
    </AuthLayout>
  );
}
