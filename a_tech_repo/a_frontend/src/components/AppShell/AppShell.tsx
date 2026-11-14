import type { ReactNode } from 'react';
import { useLogout } from '../../features/auth/hooks/useLogout';
import { useSessao } from '../../features/auth/hooks/useSessao';
import { BottomNav } from '../BottomNav/BottomNav';
import { Logo } from '../Logo/Logo';
import { Sidebar, type NavKey } from '../Sidebar/Sidebar';
import styles from './AppShell.module.css';

type AppShellProps = {
  active: NavKey;
  children: ReactNode;
};

/**
 * Moldura das telas autenticadas: Sidebar a partir de 1024 px; abaixo disso, cabeçalho com o logo
 * e a barra inferior. Lê o usuário da sessão (por isso não recebe `user`, ao contrário da spec).
 */
export function AppShell({ active, children }: AppShellProps) {
  const { data: usuario } = useSessao();
  const logout = useLogout();
  const sair = () => logout.mutate();

  return (
    <div className={styles.shell}>
      <div className={styles.sidebarSlot}>
        <Sidebar active={active} user={usuario} onLogout={sair} />
      </div>
      <div className={styles.column}>
        <header className={styles.mobileHeader}>
          <Logo tone="onLight" size="md" inline />
          <div className={styles.account}>
            <span>Olá, {usuario?.nome}</span>
            {/* Provisório: o Perfil ainda não existe, então o "Sair" mora aqui no mobile. */}
            <button type="button" className={styles.logout} onClick={sair}>
              Sair
            </button>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
      <div className={styles.bottomSlot}>
        <BottomNav active={active} />
      </div>
    </div>
  );
}
