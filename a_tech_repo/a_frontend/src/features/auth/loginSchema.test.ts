import { describe, expect, it } from 'vitest';
import { LOGIN_MSG, loginSchema } from './loginSchema';

const valido = { email: 'ana@exemplo.com', senha: 'qualquer', lembrar: false };

function mensagens(dados: Partial<typeof valido>) {
  const r = loginSchema.safeParse({ ...valido, ...dados });
  return r.success ? [] : r.error.issues.map((i) => i.message);
}

describe('loginSchema', () => {
  it('aceita dados válidos, sem exigir força de senha', () => {
    expect(loginSchema.safeParse(valido).success).toBe(true);
    expect(loginSchema.safeParse({ ...valido, senha: '1' }).success).toBe(true);
  });

  it('exige e-mail', () => {
    expect(mensagens({ email: '' })).toContain(LOGIN_MSG.emailVazio);
    expect(mensagens({ email: '   ' })).toContain(LOGIN_MSG.emailVazio);
  });

  it.each(['ana', 'ana@', 'ana@exemplo', 'ana@exemplo.c', 'a na@exemplo.com'])(
    'rejeita e-mail inválido: %s',
    (email) => {
      expect(mensagens({ email })).toContain(LOGIN_MSG.emailInvalido);
    },
  );

  it('rejeita e-mail com mais de 254 caracteres', () => {
    expect(mensagens({ email: `${'a'.repeat(250)}@exemplo.com` })).toContain(
      LOGIN_MSG.emailInvalido,
    );
  });

  it('exige senha', () => {
    expect(mensagens({ senha: '' })).toContain(LOGIN_MSG.senhaVazia);
  });
});
