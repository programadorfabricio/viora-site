import { buildWhatsAppLink } from "@/config/site";
import WhatsAppLink from "./WhatsAppLink";

export default function FinalCTA() {
  return (
    <section className="px-5 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-14 text-center text-ink md:px-10">
        <h2 className="text-[clamp(29px,4.8vw,44px)]">Manda a foto do seu sofá.</h2>
        <p className="mx-auto mt-3 max-w-[44ch] font-medium opacity-80">
          O orçamento sai em minutos, sem compromisso e sem taxa de visita.
        </p>
        <WhatsAppLink
          href={buildWhatsAppLink()}
          origin="cta_final"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-aqua px-7 py-4 text-[16px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
        >
          Falar no WhatsApp
        </WhatsAppLink>
      </div>
    </section>
  );
}
