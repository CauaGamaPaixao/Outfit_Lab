/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "false" usa o Spring Boot; qualquer outro valor usa a API simulada. */
  readonly VITE_API_MOCK?: string;
  /** Prefixo das chamadas à API. Vazio = mesma origem (padrão). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
