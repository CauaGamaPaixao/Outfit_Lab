import { Button } from '../../../../components/Button/Button';
import { useLogout } from '../../hooks/useLogout';
import { useSessao } from '../../hooks/useSessao';
import styles from './LogoutButton.module.css';

/** Provisório até a Sidebar (TELA-03) assumir o "Sair": mostra o usuário e encerra a sessão. */
export function LogoutButton() {
  const { data: usuario } = useSessao();
  const logout = useLogout();

  return (
    <div className={styles.root}>
      <p className={styles.text}>Olá, {usuario?.nome}.</p>
      <Button variant="secondary" loading={logout.isPending} onClick={() => logout.mutate()}>
        Sair
      </Button>
    </div>
  );
}
