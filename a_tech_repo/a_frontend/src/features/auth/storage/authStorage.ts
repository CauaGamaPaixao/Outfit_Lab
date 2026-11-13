/**
 * Persistência da autenticação SIMULADA (VITE_API_MOCK): substitui o backend enquanto ele não existe.
 * - Contas cadastradas: `localStorage` (sobrevivem ao fechar a aba; senão o login seria impossível
 *   depois de fechar o navegador).
 * - Sessão: `sessionStorage` (acaba ao fechar a aba) ou, com "Lembrar de mim", `localStorage` por 30 dias.
 *
 * ISTO NÃO É SEGURANÇA: qualquer pessoa com acesso ao navegador lê esses dados. A senha nunca é guardada
 * em texto puro (PBKDF2 + salt), mas o produto real usa BCrypt e sessão em cookie HttpOnly (D-31).
 */
export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type Armazenamento = { local: StorageLike; sessao: StorageLike };

export type Conta = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  salt: string;
  hash: string;
};

type Sessao = { usuarioId: string; expiraEm: number | null };

const CHAVE_CONTAS = 'outfitlab.contas';
const CHAVE_SESSAO = 'outfitlab.sessao';
const TRINTA_DIAS_MS = 30 * 24 * 60 * 60 * 1000;
const ITERACOES = 100_000;

function emMemoria(): StorageLike {
  const dados = new Map<string, string>();
  return {
    getItem: (k) => dados.get(k) ?? null,
    setItem: (k, v) => void dados.set(k, v),
    removeItem: (k) => void dados.delete(k),
  };
}

/** Usa o storage do navegador; se estiver bloqueado (modo privado, política), cai para memória. */
function storageOuMemoria(nome: 'localStorage' | 'sessionStorage'): StorageLike {
  try {
    const s = window[nome];
    s.setItem('__outfitlab_teste__', '1');
    s.removeItem('__outfitlab_teste__');
    return s;
  } catch {
    return emMemoria();
  }
}

export function armazenamentoDoNavegador(): Armazenamento {
  return { local: storageOuMemoria('localStorage'), sessao: storageOuMemoria('sessionStorage') };
}

function lerJson(storage: StorageLike, chave: string): unknown {
  try {
    const bruto = storage.getItem(chave);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

function ehConta(v: unknown): v is Conta {
  if (typeof v !== 'object' || v === null) return false;
  const c = v as Record<string, unknown>;
  return ['id', 'nome', 'sobrenome', 'email', 'salt', 'hash'].every(
    (k) => typeof c[k] === 'string',
  );
}

export function lerContas(arm: Armazenamento): Conta[] {
  const dados = lerJson(arm.local, CHAVE_CONTAS);
  return Array.isArray(dados) ? dados.filter(ehConta) : [];
}

export function salvarConta(arm: Armazenamento, conta: Conta): void {
  arm.local.setItem(CHAVE_CONTAS, JSON.stringify([...lerContas(arm), conta]));
}

export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ---------- senha ----------

function bytesParaHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function hexParaBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

export function novoSalt(): string {
  return bytesParaHex(crypto.getRandomValues(new Uint8Array(16)));
}

export async function derivarHash(senha: string, saltHex: string): Promise<string> {
  const chave = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(senha),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: hexParaBytes(saltHex), iterations: ITERACOES },
    chave,
    256,
  );
  return bytesParaHex(new Uint8Array(bits));
}

/** Comparação sem retorno antecipado (mesmo custo para qualquer diferença). */
export function hashesIguais(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------- sessão ----------

export function gravarSessao(arm: Armazenamento, usuarioId: string, lembrar: boolean): void {
  limparSessao(arm);
  const sessao: Sessao = { usuarioId, expiraEm: lembrar ? Date.now() + TRINTA_DIAS_MS : null };
  (lembrar ? arm.local : arm.sessao).setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

export function lerSessao(arm: Armazenamento): string | null {
  for (const storage of [arm.sessao, arm.local]) {
    const dados = lerJson(storage, CHAVE_SESSAO) as Partial<Sessao> | null;
    if (!dados || typeof dados.usuarioId !== 'string') continue;
    if (dados.expiraEm != null && dados.expiraEm < Date.now()) {
      storage.removeItem(CHAVE_SESSAO);
      continue;
    }
    return dados.usuarioId;
  }
  return null;
}

export function limparSessao(arm: Armazenamento): void {
  arm.sessao.removeItem(CHAVE_SESSAO);
  arm.local.removeItem(CHAVE_SESSAO);
}
