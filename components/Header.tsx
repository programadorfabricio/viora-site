import Link from "next/link";
import { buildWhatsAppLink } from "@/config/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="#top" className="flex flex-col leading-none">
          <span className="inline-flex items-center font-display text-xl font-extrabold tracking-tight text-white">
            Vi
            {/* "o" da wordmark = public/viora-icone-cor.svg inline, exatamente como no
                arquivo (ponta da espiral em turquesa). É a mesma logo usada no perfil do
                Google, Instagram e favicon — exceção deliberada ao sistema de cores, ver
                nota no topo de config/site.ts. Não trocar por versão monocromática. */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="mx-[1px] h-[0.85em] w-[0.85em] shrink-0 translate-y-[0.1em]"
            >
              <path d="M50 92 A42 42 0 1 1 92 50" fill="none" stroke="#6D28D9" strokeWidth="17" strokeLinecap="round" />
              <path d="M92 50 A42 42 0 0 1 68 88" fill="none" stroke="#6D28D9" strokeWidth="13" strokeLinecap="round" />
              <path d="M68 88 A25 25 0 1 0 50 40" fill="none" stroke="#0FD9B8" strokeWidth="8.5" strokeLinecap="round" />
            </svg>
            ra
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
