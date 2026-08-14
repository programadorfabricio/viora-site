import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import sobre from "@/content/pages/sobre";
import { site, buildWhatsAppLink } from "@/config/site";

export const metadata: Metadata = {
  title: sobre.metaTitle,
  description: sobre.metaDescription,
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: sobre.metaTitle,
    description: sobre.metaDescription,
    url: `${site.url}/sobre`,
  },
};

export default function SobrePage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Sobre", href: "/sobre" }]} />

      <section className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">{sobre.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(30px,5.5vw,50px)] text-ink">{sobre.h1}</h1>
        <p className="mt-3 text-[17px] text-[#5C5478]">{sobre.lead}</p>

        <div className="mt-10 space-y-8">
          {sobre.sections.map((section) => (
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

        <div className="mt-12 rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-12 text-center text-ink">
          <h2 className="text-[clamp(24px,4vw,34px)]">Alguma dúvida antes de agendar?</h2>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-7 py-4 text-[16px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
