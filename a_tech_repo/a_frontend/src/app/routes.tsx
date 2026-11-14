import type { RouteObject } from 'react-router';
import { PlaceholderPage } from '../pages/PlaceholderPage/PlaceholderPage';
import {
  RedirectIfAuthenticated,
  RequireAuth,
} from '../features/auth/components/AuthGuards/AuthGuards';
import { EmConstrucaoPage } from '../pages/EmConstrucaoPage/EmConstrucaoPage';
import { GuardaRoupaPage } from '../pages/GuardaRoupaPage/GuardaRoupaPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';

/** Rotas da aplicação. As telas ainda não implementadas mostram um placeholder. */
export const routes: RouteObject[] = [
  { path: '/cadastro', element: <SignupPage /> },
  { element: <RedirectIfAuthenticated />, children: [{ path: '/login', element: <LoginPage /> }] },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <EmConstrucaoPage active="inicio" title="Início" description="Em construção." />,
      },
      { path: '/guarda-roupa', element: <GuardaRoupaPage /> },
      {
        path: '/pecas/nova',
        element: (
          <EmConstrucaoPage
            active="guarda-roupa"
            title="Adicionar peça"
            description="TELA-05 — em construção."
          />
        ),
      },
      {
        path: '/looks/novo',
        element: (
          <EmConstrucaoPage active="montar-look" title="Montar look" description="Em construção." />
        ),
      },
      {
        path: '/looks',
        element: (
          <EmConstrucaoPage active="looks" title="Looks salvos" description="Em construção." />
        ),
      },
      {
        path: '/perfil',
        element: <EmConstrucaoPage active="perfil" title="Perfil" description="Em construção." />,
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
