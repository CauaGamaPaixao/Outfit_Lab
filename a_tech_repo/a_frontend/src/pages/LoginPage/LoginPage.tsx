import { useLocation, useNavigate } from 'react-router';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { LoginForm } from '../../features/auth/components/LoginForm/LoginForm';
import {
  LoginCompactHeader,
  LoginEditorial,
} from '../../features/auth/components/LoginEditorial/LoginEditorial';
import { useLogin } from '../../features/auth/hooks/useLogin';

const DESTINO_PADRAO = '/guarda-roupa';

/** Só aceita caminhos internos (evita redirecionamento para outro site). */
function destinoSeguro(from: unknown): string {
  return typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
    ? from
    : DESTINO_PADRAO;
}

/** TELA-01 Login — rota /login. Visual: Figma 8:103. Comportamento: spec TELA-01. */
export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();

  return (
    <AuthLayout editorial={<LoginEditorial />} compactHeader={<LoginCompactHeader />} centered>
      <LoginForm
        onSubmit={(dados) =>
          login.mutate(dados, {
            onSuccess: () =>
              navigate(destinoSeguro((location.state as { from?: unknown } | null)?.from), {
                replace: true,
              }),
          })
        }
        loading={login.isPending}
        serverError={login.error}
      />
    </AuthLayout>
  );
}
