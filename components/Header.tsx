import Link from "next/link";
import { buildWhatsAppLink } from "@/config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#top" className="flex flex-col leading-none">
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            Vi<span className="text-aqua">o</span>ra
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C9BCF5]">
            Higienização
          </span>
        </Link>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-3 text-sm font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
        >
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}
