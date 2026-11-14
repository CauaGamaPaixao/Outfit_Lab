import type { SVGProps } from 'react';

/** Ícones de interface (contorno, grade 24×24, `currentColor`), desenhados para o Outfit Lab. */
const FORMAS = {
  inicio: 'M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5.5h4V20',
  closet: 'M5 3.5h14v17H5zM12 3.5v17M9.5 10.5v3M14.5 10.5v3',
  cabide: 'M12 8V6.5a2 2 0 1 1 2 2M12 8l-8.5 7.5a1 1 0 0 0 .7 1.7h15.6a1 1 0 0 0 .7-1.7L12 8Z',
  salvos: 'M7 4h10v16l-5-3.5L7 20Z',
  usuario: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5',
  mais: 'M12 5v14M5 12h14',
  busca: 'M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM20 20l-4.2-4.2',
  fechar: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5 10 17.5 19 7',
  seta: 'M6 9l6 6 6-6',
  saida: 'M8 16 16 8M9 8h7v7',
} as const;

export type UiIconName = keyof typeof FORMAS;

type UiIconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: UiIconName;
  size?: number;
};

/** Decorativo (aria-hidden): o botão ou link que o contém precisa de nome em texto. */
export function UiIcon({ name, size = 20, ...rest }: UiIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flex: 'none' }}
      {...rest}
    >
      <path d={FORMAS[name]} />
    </svg>
  );
}
