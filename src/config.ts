interface RuntimeConfig {
  VITE_REST_API_BASE_URL?: string;
  VITE_REST_API_BASE_URL_AUTH?: string;
  VITE_REST_API_BASE_URL_PUBLIC?: string;
}

// const runtimeConfig = window.RUNTIME_CONFIG
const runtimeConfig: RuntimeConfig = window.RUNTIME_CONFIG ?? {};

export const REST_API_BASE_URL = runtimeConfig.VITE_REST_API_BASE_URL;
export const REST_API_BASE_URL_AUTH = runtimeConfig.VITE_REST_API_BASE_URL_AUTH;
export const REST_API_BASE_URL_PUBLIC = runtimeConfig.VITE_REST_API_BASE_URL_PUBLIC;

