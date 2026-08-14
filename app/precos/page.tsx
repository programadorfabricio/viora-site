import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import WhatsAppLink from "@/components/WhatsAppLink";
import precos from "@/content/pages/precos";
import { site, services, buildWhatsAppLink } from "@/config/site";

export const metadata: Metadata = {
  title: precos.metaTitle,
  description: precos.metaDescription,
  alternates: { canonical: "/precos" },
  openGraph: {
    title: precos.metaTitle,
    description: precos.metaDescription,
    url: `${site.url}/precos`,
  },
};

export default function PrecosPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Preços", href: "/precos" }]} />

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">{precos.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(30px,5.5vw,50px)] text-ink">{precos.h1}</h1>
        <p className="mt-3 max-w-[60ch] text-[#5C5478]">{precos.lead}</p>

        <div className="mt-8 rounded-[24px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)] md:p-8">
          {services.map((service) => (
            <div key={service.id} className="flex items-baseline gap-3.5 border-b border-lilac py-4 last:border-none">
              <span className="font-semibold text-ink">{service.name}</span>
              <span className="flex-1 border-b-2 border-dotted border-[#E2D8FA]" />
              <span className="whitespace-nowrap">
                <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6088]">
                  {service.priceNote}
                </span>
                <span className="font-display text-lg font-extrabold text-violet">R$ {service.priceFrom}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {precos.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-ink">{section.title}</h2>
              <div className="mt-2 space-y-2.5">
                {section.paragraphs.map((p, i) => (
                  <RichText key={i} text={p} className="text-[15px] text-[#5C5478]" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-12 text-center text-ink md:px-10">
          <h2 className="text-[clamp(26px,4.2vw,38px)]">Valor exato em minutos, pelo WhatsApp.</h2>
          <WhatsAppLink
            href={buildWhatsAppLink()}
            origin="cta_final"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-7 py-4 text-[16px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Pedir orçamento no WhatsApp
          </WhatsAppLink>
        </div>
      </section>
    </main>
  );
}
