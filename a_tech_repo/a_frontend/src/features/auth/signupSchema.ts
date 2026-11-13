import { z } from 'zod';
import { atendeRegraMinima, SENHA_MAX } from './passwordStrength';

/** Mensagens finais da spec TELA-02 (seção 4). Não altere sem atualizar a spec. */
export const MSG = {
  nomeVazio: 'Informe seu nome.',
  nomeTamanho: 'O nome precisa ter entre 2 e 60 caracteres.',
  sobrenomeVazio: 'Informe seu sobrenome.',
  sobrenomeTamanho: 'O sobrenome precisa ter entre 2 e 60 caracteres.',
  emailVazio: 'Informe seu e-mail.',
  emailInvalido: 'Digite um e-mail válido, como nome@exemplo.com.',
  senhaVazia: 'Crie uma senha.',
  senhaFraca: 'A senha precisa ter pelo menos 8 caracteres, com letras e números.',
  senhaLonga: 'A senha pode ter no máximo 72 caracteres.',
  confirmacaoVazia: 'Confirme sua senha.',
  senhasDiferentes: 'As senhas não coincidem.',
  aceite: 'Para criar a conta, aceite os termos de uso e a política de privacidade.',
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const nomeSchema = (vazio: string, tamanho: string) =>
  z.string().trim().min(1, vazio).min(2, tamanho).max(60, tamanho);

export const signupSchema = z
  .object({
    nome: nomeSchema(MSG.nomeVazio, MSG.nomeTamanho),
    sobrenome: nomeSchema(MSG.sobrenomeVazio, MSG.sobrenomeTamanho),
    email: z
      .string()
      .trim()
      .min(1, MSG.emailVazio)
      .max(254, MSG.emailInvalido)
      .regex(EMAIL_RE, MSG.emailInvalido),
    senha: z
      .string()
      .min(1, MSG.senhaVazia)
      .max(SENHA_MAX, MSG.senhaLonga)
      .refine(atendeRegraMinima, MSG.senhaFraca),
    confirmarSenha: z.string().min(1, MSG.confirmacaoVazia),
    aceiteTermos: z.boolean().refine((v) => v, MSG.aceite),
  })
  .refine((d) => !d.confirmarSenha || d.senha === d.confirmarSenha, {
    path: ['confirmarSenha'],
    message: MSG.senhasDiferentes,
  });

export type SignupFormValues = z.input<typeof signupSchema>;
