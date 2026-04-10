/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENSKY_API_KEY?: string;
  readonly VITE_WINDY_API_KEY?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
