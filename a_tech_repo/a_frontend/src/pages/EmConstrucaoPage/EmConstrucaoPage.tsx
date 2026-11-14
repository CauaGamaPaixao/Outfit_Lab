import { AppShell } from '../../components/AppShell/AppShell';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import type { NavKey } from '../../components/Sidebar/Sidebar';

type EmConstrucaoPageProps = { active: NavKey; title: string; description: string };

/** Tela autenticada ainda não implementada: mantém a navegação (Sidebar/BottomNav) funcionando. */
export function EmConstrucaoPage({ active, title, description }: EmConstrucaoPageProps) {
  return (
    <AppShell active={active}>
      <PageHeader eyebrow="Em construção" title={title} meta={description} />
    </AppShell>
  );
}
