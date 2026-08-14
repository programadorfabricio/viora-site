import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import politicaDePrivacidade from "@/content/pages/politica-de-privacidade";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: politicaDePrivacidade.metaTitle,
  description: politicaDePrivacidade.metaDescription,
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    title: politicaDePrivacidade.metaTitle,
    description: politicaDePrivacidade.metaDescription,
    url: `${site.url}/politica-de-privacidade`,
  },
  // Página de conformidade — sem valor de busca, não precisa ser indexada.
  robots: { index: false, follow: true },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main>
      <Breadcrumbs items={[{ label: "Política de Privacidade", href: "/politica-de-privacidade" }]} />

      <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">{politicaDePrivacidade.eyebrow}</p>
        <h1 className="mt-3 text-[clamp(30px,5.5vw,50px)] text-ink">{politicaDePrivacidade.h1}</h1>
        <p className="mt-3 text-[16px] text-[#5C5478]">{politicaDePrivacidade.lead}</p>

        <div className="mt-10 space-y-8">
          {politicaDePrivacidade.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-ink">{section.title}</h2>
              <div className="mt-2 space-y-2.5">
                {section.paragraphs.map((p, i) => (
                  <RichText key={i} text={p} className="text-[15px] text-[#5C5478]" />
                ))}
              </div>
              {section.list && (
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[15px] text-[#5C5478]">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
