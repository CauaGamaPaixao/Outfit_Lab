/**
 * Outfit Lab — Design tokens (TypeScript)
 * Gerado por: PROMPT-001 v2.1 (Parte B2) · Versão 1.0 · 13/11/2026
 * Espelho de tokens.css. Mantenha os dois arquivos sincronizados.
 * Uso: componentes que precisam do valor em JS (gráficos, estilos dinâmicos)
 * ou numa futura configuração de Tailwind (theme.extend).
 */

export const palette = {
  white: '#FFFFFF',
  offwhite: '#FAFAFA',
  gray50: '#F2F2F2',
  gray200: '#E5E5E5',
  gray400: '#A3A3A3',
  gray500: '#8A8A8A',
  gray600: '#6B6B6B',
  gray900: '#1F1F1F',
  black: '#0A0A0A',
  yellow400: '#FACC15',
  yellow500: '#EAB308',
  red700: '#B91C1C',
  red50: '#FEF2F2',
  green700: '#15803D',
  green50: '#F0FDF4',
} as const;

/** Papéis semânticos — use estes nos componentes. Regra 60/30/10 (D-18). */
export const color = {
  // 60% — dominante
  bg: palette.offwhite,
  surface: palette.white,
  image: palette.gray50,
  // 30% — secundária
  text: palette.black,
  textStrong: palette.gray900,
  textMuted: palette.gray600,
  border: palette.gray200,
  borderStrong: palette.gray500,
  inverseBg: palette.black,
  inverseSurface: palette.gray900,
  inverseText: palette.white,
  inverseMuted: palette.gray400,
  // 10% — acento
  accent: palette.yellow400,
  accentHover: palette.yellow500,
  onAccent: palette.black,
  // feedback
  danger: palette.red700,
  dangerBg: palette.red50,
  success: palette.green700,
  successBg: palette.green50,
} as const;

export const font = {
  family: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
} as const;

/** [tamanho, altura de linha, peso] em px. */
export const text = {
  display: { size: 40, line: 48, weight: 700 },
  h1: { size: 32, line: 40, weight: 600 },
  h2: { size: 24, line: 32, weight: 600 },
  h3: { size: 18, line: 24, weight: 500 },
  body: { size: 16, line: 24, weight: 400 },
  caption: { size: 14, line: 20, weight: 400 },
  label: { size: 14, line: 20, weight: 500 },
  overline: { size: 12, line: 16, weight: 600, letterSpacing: '0.08em' },
} as const;

/** Escala de 4 px. */
export const space = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64, 20: 80,
} as const;

export const radius = { input: 8, card: 12, pill: 999 } as const;

export const shadow = {
  sm: '0 1px 2px rgba(10, 10, 10, 0.06)',
  md: '0 4px 16px rgba(10, 10, 10, 0.08)',
  lg: '0 12px 32px rgba(10, 10, 10, 0.14)',
} as const;

export const focusRing = `0 0 0 2px ${palette.black}, 0 0 0 5px ${palette.yellow400}`;

export const size = {
  touch: 48,
  input: 48,
  sidebar: 248,
  bottomNav: 64,
  contentMax: 1200,
} as const;

/** Mobile-first: use como min-width. */
export const breakpoint = { sm: 375, md: 768, lg: 1024, xl: 1440 } as const;

export const media = {
  md: `(min-width: ${breakpoint.md}px)`,
  lg: `(min-width: ${breakpoint.lg}px)`,
  xl: `(min-width: ${breakpoint.xl}px)`,
} as const;

export const motion = {
  fast: '120ms',
  base: '200ms',
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export const zIndex = { sticky: 10, floating: 20, modal: 30, toast: 40 } as const;

export const tokens = {
  palette, color, font, text, space, radius, shadow, focusRing, size, breakpoint, media, motion, zIndex,
} as const;

export type Tokens = typeof tokens;
export default tokens;
