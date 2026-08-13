import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import { site, cities, services } from "@/config/site";

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
  title: {
    default: `${site.name} — Limpeza de sofá, colchão e estofados em Paulínia`,
    template: `%s — ${site.name}`,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
