import Script from "next/script";
import { analytics } from "@/config/site";

/**
 * Carrega o GA4 via next/script (afterInteractive — não bloqueia o
 * carregamento inicial da página). Não renderiza nada se
 * analytics.measurementId (config/site.ts) estiver vazio.
 */
export default function GoogleAnalytics() {
  if (!analytics.measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${analytics.measurementId}');
        `}
      </Script>
    </>
  );
}
