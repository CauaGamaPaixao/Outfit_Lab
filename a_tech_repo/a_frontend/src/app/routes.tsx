import { Navigate, type RouteObject } from 'react-router';
import { PlaceholderPage } from '../pages/PlaceholderPage/PlaceholderPage';
import {
  RedirectIfAuthenticated,
  RequireAuth,
} from '../features/auth/components/AuthGuards/AuthGuards';
import { LogoutButton } from '../features/auth/components/LogoutButton/LogoutButton';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';

/** Rotas da aplicação. As telas ainda não implementadas mostram um placeholder. */
export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/guarda-roupa" replace /> },
  { path: '/cadastro', element: <SignupPage /> },
  { element: <RedirectIfAuthenticated />, children: [{ path: '/login', element: <LoginPage /> }] },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/guarda-roupa',
        element: (
          <PlaceholderPage title="Guarda-roupa" description="TELA-03 — em construção.">
            <LogoutButton />
          </PlaceholderPage>
        ),
      },
    ],
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
