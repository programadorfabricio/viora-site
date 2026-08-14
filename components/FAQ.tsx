import { faq } from "@/config/site";
import FaqAccordion from "./FaqAccordion";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <div className="mb-8 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Dúvidas</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">O que mais perguntam.</h2>
      </div>

      <FaqAccordion items={faq} />
    </section>
  );
}
