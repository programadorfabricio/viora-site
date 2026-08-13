import { buildWhatsAppLink } from "@/config/site";

export default function FinalCTA() {
  return (
    <section className="px-5 pb-16 pt-4 md:pb-20">
      <div className="mx-auto max-w-6xl rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-14 text-center text-ink md:px-10">
        <h2 className="text-[clamp(29px,4.8vw,44px)]">Manda a foto do seu sofá.</h2>
        <p className="mx-auto mt-3 max-w-[44ch] font-medium opacity-80">
          O orçamento sai em minutos, sem compromisso e sem taxa de visita.
        </p>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[16px] font-bold text-white shadow-[0_8px_22px_-10px_rgba(27,11,59,0.8)] transition hover:bg-[#33176B]"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
  );
}
