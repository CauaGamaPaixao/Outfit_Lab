import { Link } from 'react-router';
import { UiIcon, type UiIconName } from '../UiIcon/UiIcon';
import type { NavKey } from '../Sidebar/Sidebar';
import styles from './BottomNav.module.css';

const LINKS: { key: NavKey; label: string; to: string; icon: UiIconName }[] = [
  { key: 'inicio', label: 'Início', to: '/', icon: 'inicio' },
  { key: 'guarda-roupa', label: 'Peças', to: '/guarda-roupa', icon: 'closet' },
  { key: 'looks', label: 'Looks', to: '/looks', icon: 'salvos' },
  { key: 'perfil', label: 'Perfil', to: '/perfil', icon: 'usuario' },
];

type BottomNavProps = {
  active: NavKey;
  /** "Adicionar peça": ainda sem ação (o cadastro de peça é a TELA-05). */
  onAdd?: () => void;
};

/** Barra inferior do mobile (Figma 8:79), usada abaixo de 1024 px. */
export function BottomNav({ active, onAdd }: BottomNavProps) {
  const itens = LINKS.map((item) => {
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
  });

  return (
    <nav aria-label="Principal" className={styles.bar}>
      <ul className={styles.list}>
        {itens.slice(0, 2)}
        <li>
          <button type="button" className={`${styles.item} ${styles.add}`} onClick={onAdd}>
            <span className={styles.plus}>
              <UiIcon name="mais" />
            </span>
            Adicionar
          </button>
        </li>
        {itens.slice(2)}
      </ul>
    </nav>
  );
}
