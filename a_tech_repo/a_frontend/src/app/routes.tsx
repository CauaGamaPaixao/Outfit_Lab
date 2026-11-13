import { Navigate, type RouteObject } from 'react-router';
import { PlaceholderPage } from '../pages/PlaceholderPage/PlaceholderPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';

/** Rotas da aplicação. As telas ainda não implementadas mostram um placeholder. */
export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/cadastro" replace /> },
  { path: '/cadastro', element: <SignupPage /> },
  {
    path: '/login',
    element: <PlaceholderPage title="Entrar" description="TELA-01 Login — próxima tela a ser codificada." />,
  },
  {
    path: '/guarda-roupa',
    element: <PlaceholderPage title="Guarda-roupa" description="TELA-03 — em construção." />,
  },
  {
    path: '/termos',
    element: <PlaceholderPage title="Termos de uso" description="Em elaboração (EAP 2.3)." />,
  },
  {
    path: '/privacidade',
    element: (
      <PlaceholderPage title="Política de privacidade" description="Em elaboração (EAP 2.3)." />
    ),
  },
  {
    path: '*',
    element: <PlaceholderPage title="Página não encontrada" description="Confira o endereço." />,
  },
];
