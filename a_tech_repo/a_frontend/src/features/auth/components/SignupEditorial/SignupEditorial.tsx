import { HowItWorks, type HowItWorksStep } from '../../../../components/HowItWorks/HowItWorks';
import { Logo } from '../../../../components/Logo/Logo';
import {
  ScorePreviewCard,
  type ScoreCriterion,
} from '../../../../components/ScorePreviewCard/ScorePreviewCard';
import styles from './SignupEditorial.module.css';

/** Textos da spec TELA-02, seção 3 (decisão do autor: spec prevalece sobre os textos do Figma). */
const STEPS: HowItWorksStep[] = [
  { title: 'Cadastre suas peças', text: 'Foto, categoria, cores e modelagem.' },
  { title: 'Monte looks', text: 'Combine peças do seu próprio guarda-roupa.' },
  {
    title: 'Entenda a análise',
    text: 'Uma pontuação de 0 a 100 com justificativas, não um julgamento.',
  },
];

const CRITERIA: ScoreCriterion[] = [
  { label: 'Cores', text: 'neutros com 1 ponto de destaque' },
  { label: 'Camadas', text: 'proporções equilibradas' },
];

/** Painel "Como funciona" do cadastro (EditorialPanel variant="signup"). */
export function SignupEditorial() {
  return (
    <div className={styles.panel}>
      <div className={styles.brand}>
        <Logo tone="onDark" size="lg" />
      </div>
      <h2 className={styles.title}>Como funciona</h2>
      <HowItWorks steps={STEPS} />
      <ScorePreviewCard
        eyebrow="Exemplo de análise"
        score={82}
        criteria={CRITERIA}
        disclaimer="Exemplo ilustrativo. A pontuação segue as regras do Outfit Lab, não uma medida de beleza."
      />
    </div>
  );
}
