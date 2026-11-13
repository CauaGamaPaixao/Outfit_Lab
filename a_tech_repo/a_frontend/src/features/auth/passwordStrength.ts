/**
 * Regras de senha da spec TELA-02 (seção 4 e 4.1) e da D-28.
 * O backend (Bean Validation) deve aplicar a mesma regra mínima.
 */
export const SENHA_MIN = 8;
export const SENHA_MAX = 72; // limite do BCrypt (SEG-01)

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export const STRENGTH_LABEL: Record<PasswordStrengthLevel, string> = {
  0: '',
  1: 'Fraca',
  2: 'Razoável',
  3: 'Boa',
  4: 'Forte',
};

const temLetra = (v: string) => /\p{L}/u.test(v);
const temNumero = (v: string) => /\d/.test(v);
const temSimbolo = (v: string) => /[^\p{L}\d]/u.test(v);

/** Regra mínima: 8+ caracteres, com pelo menos 1 letra e 1 número. */
export function atendeRegraMinima(senha: string): boolean {
  return senha.length >= SENHA_MIN && temLetra(senha) && temNumero(senha);
}

export function getPasswordStrength(senha: string): PasswordStrengthLevel {
  if (!senha) return 0;
  if (!atendeRegraMinima(senha)) return 1;
  const longa = senha.length >= 12;
  const misturaCaixa = /\p{Ll}/u.test(senha) && /\p{Lu}/u.test(senha);
  if (longa && misturaCaixa && temSimbolo(senha)) return 4;
  if (longa || temSimbolo(senha)) return 3;
  return 2;
}
