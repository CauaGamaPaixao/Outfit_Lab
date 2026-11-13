import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { LoginForm } from '../../features/auth/components/LoginForm/LoginForm';
import {
  LoginCompactHeader,
  LoginEditorial,
} from '../../features/auth/components/LoginEditorial/LoginEditorial';
import { useLogin } from '../../features/auth/hooks/useLogin';

/**
 * TELA-01 Login — rota /login. Visual: Figma 8:103. Comportamento: spec TELA-01.
 * O redirecionamento após o login é feito por RedirectIfAuthenticated (a sessão passa a existir).
 */
export function LoginPage() {
  const login = useLogin();

  return (
    <AuthLayout editorial={<LoginEditorial />} compactHeader={<LoginCompactHeader />} centered>
      <LoginForm
        onSubmit={(dados) => login.mutate(dados)}
        loading={login.isPending}
        serverError={login.error}
      />
    </AuthLayout>
  );
}
