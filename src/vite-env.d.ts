/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
