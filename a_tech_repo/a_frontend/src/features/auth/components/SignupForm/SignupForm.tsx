import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { Link } from 'react-router';
import { Alert } from '../../../../components/Alert/Alert';
import { Button } from '../../../../components/Button/Button';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { PasswordField } from '../../../../components/PasswordField/PasswordField';
import { PasswordStrength } from '../../../../components/PasswordStrength/PasswordStrength';
import { TextField } from '../../../../components/TextField/TextField';
import type { ApiError } from '../../../../lib/apiError';
import type { CadastroRequest } from '../../api';
import { MSG, signupSchema, type SignupFormValues } from '../../signupSchema';
import styles from './SignupForm.module.css';

const SENHA_HINT = 'Mínimo de 8 caracteres, com letras e números.';

type ServerAlert = { title: string; text?: string };

type SignupFormProps = {
  onSubmit: (dados: CadastroRequest) => void;
  loading: boolean;
  /** Erro devolvido pela API na última tentativa. */
  serverError: ApiError | null;
};

/** Erros da API que aparecem como alerta no topo do formulário (spec 4.2). */
function alertFor(error: ApiError | null): ServerAlert | null {
  if (!error) return null;
  switch (error.codigo) {
    case 'EMAIL_JA_CADASTRADO':
      return null; // exibido no campo e-mail
    case 'EMAIL_FORA_DO_BETA':
      return { title: 'Este e-mail ainda não está no beta.', text: 'Peça um convite ao autor.' };
    case 'VALIDACAO':
      return error.campos.length > 0 ? null : { title: error.message };
    default:
      return {
        title: 'Não foi possível criar a conta agora.',
        text: 'Tente novamente em instantes.',
      };
  }
}

const baseResolver = zodResolver(signupSchema);

/** A confirmação também é comparada quando outros campos ainda têm erro (spec: estado "Validação"). */
const resolver: Resolver<SignupFormValues> = async (values, context, options) => {
  const result = await baseResolver(values, context, options);
  if (
    values.confirmarSenha &&
    values.senha !== values.confirmarSenha &&
    !result.errors.confirmarSenha
  ) {
    return {
      values: {},
      errors: {
        ...result.errors,
        confirmarSenha: { type: 'match', message: MSG.senhasDiferentes },
      },
    };
  }
  return result;
};

export function SignupForm({ onSubmit, loading, serverError }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<SignupFormValues>({
    resolver,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      nome: '',
      sobrenome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      aceiteTermos: false,
    },
  });

  const senha = useWatch({ control, name: 'senha' }) ?? '';
  const alertRef = useRef<HTMLDivElement>(null);
  // O erro da API zera a cada novo envio (TanStack Query), então o alerta é derivado dele.
  const alert = alertFor(serverError);
  const emailJaCadastrado =
    serverError?.codigo === 'EMAIL_JA_CADASTRADO' && errors.email?.type === 'server';

  // Spec: a confirmação revalida quando a senha muda (depois do primeiro envio).
  useEffect(() => {
    if (isSubmitted && getValues('confirmarSenha')) void trigger('confirmarSenha');
  }, [senha, isSubmitted, getValues, trigger]);

  // Erros de campo vindos da API vão para o formulário (spec 4.2).
  useEffect(() => {
    if (!serverError) return;
    if (serverError.codigo === 'EMAIL_JA_CADASTRADO') {
      setError('email', { type: 'server', message: serverError.message }, { shouldFocus: true });
    }
    if (serverError.codigo === 'VALIDACAO') {
      serverError.campos.forEach(({ campo, mensagem }) => {
        if (campo in getValues()) {
          setError(campo as keyof SignupFormValues, { type: 'server', message: mensagem });
        }
      });
    }
  }, [serverError, setError, getValues]);

  useEffect(() => {
    if (alert) alertRef.current?.focus();
  }, [alert?.title]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = handleSubmit((v) => {
    onSubmit({
      nome: v.nome.trim(),
      sobrenome: v.sobrenome.trim(),
      email: v.email.trim().toLowerCase(),
      senha: v.senha,
      aceiteTermos: true,
    });
  });

  const emailError =
    errors.email?.type === 'server' && emailJaCadastrado ? (
      <>
        Este e-mail já tem uma conta. <Link to="/login">Entrar</Link> ou recuperar a senha.
      </>
    ) : (
      errors.email?.message
    );

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Beta fechado</p>
        <h1 className={styles.title}>Criar conta</h1>
        <p className={styles.subtitle}>Leva menos de um minuto.</p>
      </header>

      {alert && (
        <Alert ref={alertRef} title={alert.title}>
          {alert.text}
        </Alert>
      )}

      <form onSubmit={submit} noValidate className={styles.form}>
        <fieldset disabled={loading} className={styles.fieldset}>
          <legend className="sr-only">Dados da conta</legend>
          <div className={styles.nameRow}>
            <TextField
              label="Nome"
              autoComplete="given-name"
              maxLength={60}
              placeholder="Seu nome"
              error={errors.nome?.message}
              {...register('nome')}
            />
            <TextField
              label="Sobrenome"
              autoComplete="family-name"
              maxLength={60}
              placeholder="Seu sobrenome"
              error={errors.sobrenome?.message}
              {...register('sobrenome')}
            />
          </div>
          <TextField
            label="E-mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="voce@exemplo.com"
            error={emailError}
            {...register('email')}
          />
          <PasswordField
            label="Senha"
            autoComplete="new-password"
            maxLength={72}
            placeholder="Crie uma senha"
            error={errors.senha?.message}
            below={!errors.senha && <PasswordStrength value={senha} hint={SENHA_HINT} />}
            {...register('senha')}
          />
          <PasswordField
            label="Confirmar senha"
            autoComplete="new-password"
            maxLength={72}
            placeholder="Repita sua senha"
            error={errors.confirmarSenha?.message}
            {...register('confirmarSenha')}
          />
          <Checkbox
            label={
              <>
                Li e aceito os{' '}
                <a href="/termos" target="_blank" rel="noopener noreferrer">
                  termos de uso
                </a>{' '}
                e a{' '}
                <a href="/privacidade" target="_blank" rel="noopener noreferrer">
                  política de privacidade
                </a>
                .
              </>
            }
            error={errors.aceiteTermos?.message}
            {...register('aceiteTermos')}
          />
        </fieldset>
        <Button type="submit" fullWidth loading={loading}>
          {loading ? 'Criando conta…' : 'Criar conta'}
        </Button>
      </form>

      <p className={styles.alt}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
      <p className={styles.privacy}>
        Coletamos só o necessário.{' '}
        <a href="/privacidade" target="_blank" rel="noopener noreferrer">
          Veja a política de privacidade
        </a>
        .
      </p>
    </div>
  );
}
