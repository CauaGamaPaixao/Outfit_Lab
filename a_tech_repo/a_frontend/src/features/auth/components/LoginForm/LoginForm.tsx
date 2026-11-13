import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Alert } from '../../../../components/Alert/Alert';
import { Button } from '../../../../components/Button/Button';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { Modal } from '../../../../components/Modal/Modal';
import { PasswordField } from '../../../../components/PasswordField/PasswordField';
import { TextField } from '../../../../components/TextField/TextField';
import type { ApiError } from '../../../../lib/apiError';
import type { LoginRequest } from '../../api';
import { loginSchema, type LoginFormValues } from '../../loginSchema';
import styles from './LoginForm.module.css';

type ServerAlert = { title: string; text: string };

type LoginFormProps = {
  onSubmit: (dados: LoginRequest) => void;
  loading: boolean;
  /** Erro devolvido pela API na última tentativa. */
  serverError: ApiError | null;
};

/** Erros da API exibidos como alerta no topo (spec 4.1). */
function alertFor(error: ApiError | null): ServerAlert | null {
  if (!error) return null;
  if (error.status === 401) {
    return { title: 'E-mail ou senha inválidos.', text: 'Confira os dados e tente novamente.' };
  }
  if (error.status === 429) {
    return { title: 'Muitas tentativas.', text: 'Aguarde alguns minutos e tente de novo.' };
  }
  return {
    title: 'Não foi possível entrar agora.',
    text: 'Verifique sua conexão e tente novamente.',
  };
}

export function LoginForm({ onSubmit, loading, serverError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    defaultValues: { email: '', senha: '', lembrar: false },
  });

  const [esqueciAberto, setEsqueciAberto] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const alert = alertFor(serverError);

  // Credenciais inválidas: mantém o e-mail, limpa a senha e leva o foco ao alerta (spec 4.1).
  useEffect(() => {
    if (!serverError) return;
    if (serverError.status === 401) resetField('senha', { defaultValue: '' });
    alertRef.current?.focus();
  }, [serverError, resetField]);

  const submit = handleSubmit((v) => {
    onSubmit({ email: v.email.trim().toLowerCase(), senha: v.senha, lembrar: v.lembrar });
  });

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Bem-vindo de volta</p>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.subtitle}>Seu estilo, em um só lugar.</p>
      </header>

      {alert && (
        <Alert ref={alertRef} title={alert.title}>
          {alert.text}
        </Alert>
      )}

      <form onSubmit={submit} noValidate className={styles.form}>
        <fieldset disabled={loading} className={styles.fieldset}>
          <legend className="sr-only">Dados de acesso</legend>
          <TextField
            label="E-mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="voce@exemplo.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <PasswordField
            label="Senha"
            autoComplete="current-password"
            maxLength={72}
            placeholder="Digite sua senha"
            error={errors.senha?.message}
            {...register('senha')}
          />
          <div className={styles.prefs}>
            <Checkbox label="Lembrar de mim" {...register('lembrar')} />
            <button type="button" className={styles.forgot} onClick={() => setEsqueciAberto(true)}>
              Esqueci minha senha
            </button>
          </div>
        </fieldset>
        <Button type="submit" fullWidth loading={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <p className={styles.alt}>
        Ainda não tem conta? <Link to="/cadastro">Criar conta</Link>
      </p>
      <div className={styles.footer}>
        <p className={styles.privacy}>Seu guarda-roupa é pessoal. Seus dados também.</p>
        <p className={styles.links}>
          <a href="/termos" target="_blank" rel="noopener noreferrer">
            Termos de uso
          </a>
          <a href="/privacidade" target="_blank" rel="noopener noreferrer">
            Privacidade
          </a>
        </p>
      </div>

      <Modal open={esqueciAberto} title="Esqueceu a senha?" onClose={() => setEsqueciAberto(false)}>
        <p>
          Durante o beta, a redefinição é feita pelo autor. Envie uma mensagem pelo canal de
          feedback com o e-mail da sua conta.
        </p>
        <Button fullWidth onClick={() => setEsqueciAberto(false)}>
          Entendi
        </Button>
      </Modal>
    </div>
  );
}
