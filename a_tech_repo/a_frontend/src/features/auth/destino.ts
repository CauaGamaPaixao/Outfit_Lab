export const DESTINO_PADRAO = '/guarda-roupa';

/** Só aceita caminhos internos (evita redirecionamento para outro site). */
export function destinoSeguro(from: unknown): string {
  return typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
    ? from
    : DESTINO_PADRAO;
}
