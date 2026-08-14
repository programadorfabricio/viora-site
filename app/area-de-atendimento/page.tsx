import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import WhatsAppLink from "@/components/WhatsAppLink";
import areaDeAtendimento from "@/content/pages/area-de-atendimento";
import { site, cities, buildWhatsAppLink } from "@/config/site";

export const metadata: Metadata = {
  title: areaDeAtendimento.metaTitle,
  description: areaDeAtendimento.metaDescription,
  alternates: { canonical: "/area-de-atendimento" },
  openGraph: {
    title: areaDeAtendimento.metaTitle,
    description: areaDeAtendimento.metaDescription,
    url: `${site.url}/area-de-atendimento`,
  },
};

export default function AreaDeAtendimentoPage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Área de atendimento", href: "/area-de-atendimento" }]} />

      <section className="bg-[linear-gradient(150deg,#FF8F6B,#FF6B7F)] px-5 py-10 text-white md:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-85">{areaDeAtendimento.eyebrow}</p>
          <h1 className="mt-3 text-[clamp(30px,5.5vw,50px)]">{areaDeAtendimento.h1}</h1>
          <p className="mt-3 max-w-[60ch] opacity-95">{areaDeAtendimento.lead}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <span
                key={city}
                className="rounded-full border-[1.5px] border-white/45 bg-white/20 px-[18px] py-2.5 text-[15px] font-bold backdrop-blur-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {areaDeAtendimento.sections.map((section) => (
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
          <h2 className="text-[clamp(26px,4.2vw,38px)]">Manda a foto do seu estofado e confirmamos o atendimento.</h2>
          <WhatsAppLink
            href={buildWhatsAppLink()}
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
