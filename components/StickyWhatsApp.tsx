import { buildWhatsAppLink } from "@/config/site";

export default function StickyWhatsApp() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 bg-ink/95 px-4 py-3 backdrop-blur-md md:hidden">
      <p className="text-xs font-medium leading-tight text-[#C9BCF5]">
        Orçamento na hora
        <br />
        pelo WhatsApp
      </p>
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-aqua px-5 py-3 text-sm font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)]"
      >
        Pedir orçamento
      </a>
    </div>
  );
}
