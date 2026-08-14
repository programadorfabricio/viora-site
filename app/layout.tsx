import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import { site, cities, services } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-bricolage",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // String simples (não objeto com template) de propósito: cada página
  // define seu próprio title completo e único via metadata/generateMetadata
  // — nada de sufixo repetido igual em todas as páginas. Esta é só a
  // usada pela home, que não define a sua própria.
  title: `${site.name} — Limpeza de sofá, colchão e estofados em Paulínia`,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Limpeza de sofá e estofados`,
    description: site.description,
    images: [
      {
        url: "/viora-perfil-1000.png",
        width: 1000,
        height: 1000,
        alt: site.name,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/viora-favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    priceRange: "R$$",
    areaServed: cities.map((city) => ({ "@type": "City", name: city })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de higienização",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        priceCurrency: "BRL",
        price: service.priceFrom,
        itemOffered: {
          "@type": "Service",
          name: `Higienização de ${service.name.toLowerCase()}`,
          description: service.description,
        },
      })),
    },
  };

  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${publicSans.variable}`}>
      <body className="antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
