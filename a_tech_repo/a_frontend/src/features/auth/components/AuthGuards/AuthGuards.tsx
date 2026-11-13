import { Navigate, Outlet, useLocation } from 'react-router';
import { destinoSeguro } from '../../destino';
import { useSessao } from '../../hooks/useSessao';

/** Rotas protegidas: sem sessão, vai para /login guardando a rota de origem (spec TELA-03, seção 2). */
export function RequireAuth() {
  const sessao = useSessao();
  const location = useLocation();

  if (sessao.isPending) {
    return (
      <main aria-busy="true">
        <p role="status" className="sr-only">
          Carregando…
        </p>
      </main>
    );
  }
  if (!sessao.data) {
    return (
      <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
    );
  }
  return <Outlet />;
}

/** /login: usuário autenticado vai para a rota de origem ou para /guarda-roupa (spec TELA-01, seção 2). */
export function RedirectIfAuthenticated() {
  const sessao = useSessao();
  const location = useLocation();

  // Enquanto a sessão carrega, mostra o formulário (rota pública) em vez de uma tela em branco.
  if (sessao.data) {
    return (
      <Navigate to={destinoSeguro((location.state as { from?: unknown } | null)?.from)} replace />
    );
  }
  return <Outlet />;
}
