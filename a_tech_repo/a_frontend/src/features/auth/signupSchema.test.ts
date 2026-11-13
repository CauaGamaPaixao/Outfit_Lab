import { describe, expect, it } from 'vitest';
import { MSG, signupSchema, type SignupFormValues } from './signupSchema';

const valido: SignupFormValues = {
  nome: 'Ana',
  sobrenome: 'Souza',
  email: 'ana@exemplo.com',
  senha: 'Guarda2026',
  confirmarSenha: 'Guarda2026',
  aceiteTermos: true,
};

function primeiroErro(dados: Partial<SignupFormValues>, campo: keyof SignupFormValues) {
  const r = signupSchema.safeParse({ ...valido, ...dados });
  if (r.success) return undefined;
  return r.error.issues.find((i) => i.path[0] === campo)?.message;
}

describe('signupSchema — mensagens da spec TELA-02', () => {
  it('aceita dados válidos', () => {
    expect(signupSchema.safeParse(valido).success).toBe(true);
  });

  it('nome vazio e curto', () => {
    expect(primeiroErro({ nome: '  ' }, 'nome')).toBe(MSG.nomeVazio);
    expect(primeiroErro({ nome: 'A' }, 'nome')).toBe(MSG.nomeTamanho);
    expect(primeiroErro({ nome: 'A'.repeat(61) }, 'nome')).toBe(MSG.nomeTamanho);
  });

  it('e-mail vazio e inválido', () => {
    expect(primeiroErro({ email: '' }, 'email')).toBe(MSG.emailVazio);
    expect(primeiroErro({ email: 'ana@' }, 'email')).toBe(MSG.emailInvalido);
  });

  it('senha vazia, fraca e longa demais', () => {
    expect(primeiroErro({ senha: '', confirmarSenha: '' }, 'senha')).toBe(MSG.senhaVazia);
    expect(primeiroErro({ senha: 'abc', confirmarSenha: 'abc' }, 'senha')).toBe(MSG.senhaFraca);
    const longa = `a1${'b'.repeat(71)}`;
    expect(primeiroErro({ senha: longa, confirmarSenha: longa }, 'senha')).toBe(MSG.senhaLonga);
  });

  it('confirmação vazia e diferente', () => {
    expect(primeiroErro({ confirmarSenha: '' }, 'confirmarSenha')).toBe(MSG.confirmacaoVazia);
    expect(primeiroErro({ confirmarSenha: 'Guarda2025' }, 'confirmarSenha')).toBe(
      MSG.senhasDiferentes,
    );
  });

  it('aceite obrigatório', () => {
    expect(primeiroErro({ aceiteTermos: false }, 'aceiteTermos')).toBe(MSG.aceite);
  });
});
