import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import FaqAccordion from "@/components/FaqAccordion";
import WhatsAppLink from "@/components/WhatsAppLink";
import { servicePages, getServicePage } from "@/content/services";
import { site, cities, calculatorItems, buildWhatsAppLink } from "@/config/site";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/servicos/${service.slug}`,
    },
  };
}

function priceRows(serviceIds: string[]) {
  return calculatorItems
    .filter((item) => serviceIds.includes(item.id))
    .flatMap((item) => {
      if (item.hasVariant && item.variants) {
        return item.variants.map((v) => ({
          label: `${item.label} — ${v.label}`,
          min: v.min,
          max: v.max,
        }));
      }
      return item.flat ? [{ label: item.label, min: item.flat.min, max: item.flat.max }] : [];
    });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const rows = priceRows(service.serviceIds);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.metaDescription,
    areaServed: cities.map((city) => ({ "@type": "City", name: city })),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url,
    },
    offers: rows.map((row) => ({
      "@type": "Offer",
      name: row.label,
      priceCurrency: "BRL",
      price: row.min,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Breadcrumbs items={[{ label: "Serviços", href: null }, { label: service.navLabel, href: `/servicos/${service.slug}` }]} />

      {/* Hero */}
      <div className="relative overflow-hidden bg-[linear-gradient(158deg,#2C0A6B_0%,#5B1FC4_46%,#7C3AED_100%)] px-5 py-10 text-white md:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9BCF5]">{service.eyebrow}</p>
          <h1 className="mt-3 max-w-[22ch] text-[clamp(28px,5.5vw,52px)] font-extrabold">{service.h1}</h1>
          <RichText text={service.heroLead} className="mt-3 max-w-[56ch] text-[16px] text-[#DCD2FF] md:text-[18px]" />
          <WhatsAppLink
            href={buildWhatsAppLink(service.whatsappMessage)}
            origin="hero"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3.5 text-[15.5px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Pedir orçamento no WhatsApp
          </WhatsAppLink>

          {service.beforeAfter.length > 0 && (
            <div className="mt-8">
              <BeforeAfterSlider cases={service.beforeAfter} />
            </div>
          )}
        </div>
      </div>

      {/* O que acumula */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="text-[clamp(26px,4.5vw,38px)] text-ink">{service.accumulationTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {service.accumulation.map((item) => (
            <div key={item.title} className="rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)]">
              <h3 className="text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] text-[#5C5478]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como fazemos */}
      <section className="bg-[linear-gradient(150deg,#3B0F86,#6D28D9)] px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[clamp(26px,4.5vw,38px)]">{service.processTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.process.map((step, i) => (
              <div key={step.title} className="rounded-[20px] bg-white p-6">
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-violet font-display text-base font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[15px] text-[#5C5478]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      {rows.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-[clamp(26px,4.5vw,38px)] text-ink">Preços</h2>
          <div className="mt-6 rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)] md:p-8">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline gap-3.5 border-b border-lilac py-4 last:border-none">
                <span className="font-semibold text-ink">{row.label}</span>
                <span className="flex-1 border-b-2 border-dotted border-[#E2D8FA]" />
                <span className="whitespace-nowrap font-display text-lg font-extrabold text-violet">
                  R$ {row.min}–{row.max}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#5C5478]">
            Faixa estimada — o valor final depende do tecido e do estado da peça. Veja a{" "}
            <Link href="/precos" className="font-semibold text-violet underline underline-offset-2">
              tabela completa de preços
            </Link>
            .
          </p>
        </section>
      )}

      {/* Conteúdo aprofundado */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {service.bodyExtra.map((block) => (
            <div key={block.title}>
              <h2 className="text-xl font-bold text-ink">{block.title}</h2>
              <div className="mt-3 space-y-3">
                {block.paragraphs.map((p, i) => (
                  <RichText key={i} text={p} className="text-[15px] text-[#5C5478]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-[clamp(26px,4.5vw,38px)] text-ink">{service.faqTitle}</h2>
        <div className="mt-6">
          <FaqAccordion items={service.faq} />
        </div>
      </section>

      {/* CTA final */}
      <section className="px-5 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-14 text-center text-ink md:px-10">
          <h2 className="text-[clamp(28px,4.5vw,42px)]">Manda a foto pelo WhatsApp e o orçamento sai na hora.</h2>
          <WhatsAppLink
            href={buildWhatsAppLink(service.whatsappMessage)}
            origin="cta_final"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-7 py-4 text-[16px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </section>
    </main>
  );
}
