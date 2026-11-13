import type { SVGProps } from 'react';
import styles from './Icon.module.css';

/**
 * Ícones sólidos de peças de roupa (grade 48×48), desenhados para o Outfit Lab.
 * Herdam a cor do texto (`currentColor`), então basta definir `color` no contêiner.
 */
const SHAPES = {
  camiseta: (
    <path d="M16 6 6 11 2.5 19 9 22.5l3-1.8V42h24V20.7l3 1.8 6.5-3.5L42 11 32 6c-1 3-3.8 5-8 5s-7-2-8-5Z" />
  ),
  calca: (
    <>
      <path d="M13 5h22v5H13z" />
      <path d="M13.5 12h21L38 43H27.5L24 20l-3.5 23H10z" />
    </>
  ),
  tenis: (
    <>
      <path d="M6 13h7c1 5 4 7 8 7.5l3-3 3 3 2.5-2c1.5 2.5 3.5 4 6.5 5l6 2c3 1 4 2.5 4 4.5V32H4l.5-17.5c.1-.9.7-1.5 1.5-1.5Z" />
      <path d="M4 34h42v2c0 1.5-1 3-3 3H6c-1.2 0-2-1-2-2.5z" />
    </>
  ),
} as const;

export type IconName = keyof typeof SHAPES;

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: IconName;
  /** Lado em px (o ícone é quadrado). */
  size?: number;
};

/** Decorativo (aria-hidden): quem usa deve nomear o contexto em texto, se for preciso. */
export function Icon({ name, size = 48, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={[styles.icon, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {SHAPES[name]}
    </svg>
  );
}
