declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara um evento para o GA4. Não faz nada (silenciosamente) se o GA4
 * não estiver configurado (config/site.ts -> analytics.measurementId vazio)
 * ou se o script ainda não tiver carregado — nunca quebra a página por
 * causa de analytics.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
