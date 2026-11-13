import styles from './HowItWorks.module.css';

export type HowItWorksStep = { title: string; text: string };

type HowItWorksProps = {
  steps: HowItWorksStep[];
};

/** Lista numerada "Como funciona" do painel editorial (spec TELA-02, seção 3). */
export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <ol className={styles.list}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.item}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className={styles.content}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.text}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
