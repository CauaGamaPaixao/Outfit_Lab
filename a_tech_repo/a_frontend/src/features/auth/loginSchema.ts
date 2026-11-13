import { z } from 'zod';

/** Mensagens finais da spec TELA-01 (seção 4). Não altere sem atualizar a spec. */
export const LOGIN_MSG = {
  emailVazio: 'Informe seu e-mail.',
  emailInvalido: 'Digite um e-mail válido, como nome@exemplo.com.',
  senhaVazia: 'Informe sua senha.',
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** No login a senha não tem regra de força (spec 4): só é obrigatória. */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, LOGIN_MSG.emailVazio)
    .max(254, LOGIN_MSG.emailInvalido)
    .regex(EMAIL_RE, LOGIN_MSG.emailInvalido),
  senha: z.string().min(1, LOGIN_MSG.senhaVazia).max(72),
  lembrar: z.boolean(),
});

export type LoginFormValues = z.input<typeof loginSchema>;
