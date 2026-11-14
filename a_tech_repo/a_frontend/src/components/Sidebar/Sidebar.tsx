import { Link } from 'react-router';
import type { UsuarioResponse } from '../../features/auth/api';
import { Logo } from '../Logo/Logo';
import { UiIcon, type UiIconName } from '../UiIcon/UiIcon';
import styles from './Sidebar.module.css';

export type NavKey = 'inicio' | 'guarda-roupa' | 'montar-look' | 'looks' | 'perfil';

const ITENS: { key: NavKey; label: string; to: string; icon: UiIconName }[] = [
  { key: 'inicio', label: 'Início', to: '/', icon: 'inicio' },
  { key: 'guarda-roupa', label: 'Guarda-roupa', to: '/guarda-roupa', icon: 'closet' },
  { key: 'montar-look', label: 'Montar look', to: '/looks/novo', icon: 'cabide' },
  { key: 'looks', label: 'Looks salvos', to: '/looks', icon: 'salvos' },
  { key: 'perfil', label: 'Perfil', to: '/perfil', icon: 'usuario' },
];

type SidebarProps = {
  active: NavKey;
  user: UsuarioResponse | null | undefined;
  onLogout: () => void;
};

/** Navegação lateral escura (Figma 8:46), usada a partir de 1024 px. */
export function Sidebar({ active, user, onLogout }: SidebarProps) {
  const nome = user ? `${user.nome} ${user.sobrenome}`.trim() : '';
  return (
    <div className={styles.sidebar}>
      <Logo tone="onDark" size="nav" />
      <nav aria-label="Principal">
        <ul className={styles.menu}>
          {ITENS.map((item) => {
            const ativo = item.key === active;
            return (
              <li key={item.key}>
                <Link
                  to={item.to}
                  className={[styles.item, ativo && styles.active].filter(Boolean).join(' ')}
                  aria-current={ativo ? 'page' : undefined}
                >
                  <UiIcon name={item.icon} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.account}>
        <p className={styles.tagline}>Seu estilo, em evolução.</p>
        <hr className={styles.separator} />
        <p className={styles.name}>{nome}</p>
        <p className={styles.email}>{user?.email}</p>
        <button type="button" className={styles.logout} onClick={onLogout}>
          Sair
          <UiIcon name="saida" size={14} />
        </button>
      </div>
    </div>
  );
}
