export {}

declare global {
  interface Window {
    ENV: {
      API_URL: string
      WHITELIST_ORIGIN: string
    };
  }
}