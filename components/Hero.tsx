import { buildWhatsAppLink, hero } from "@/config/site";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function Hero() {
  return (
    <div id="top" className="relative overflow-hidden bg-[linear-gradient(158deg,#2C0A6B_0%,#5B1FC4_46%,#7C3AED_100%)] pb-10 pt-2 text-white md:pb-20 md:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-36 h-[460px] w-[460px] rounded-full bg-[#9B6BFF]/40 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-28 h-[380px] w-[380px] rounded-full bg-coral/35 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[44%] top-[38%] h-[300px] w-[300px] rounded-full bg-yellow/20 blur-[70px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        {/* 1. Selo — compacto, uma linha só */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[12px] font-semibold backdrop-blur-sm md:px-4 md:py-1.5 md:text-[13px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-yellow shadow-[0_0_0_4px_rgba(255,211,74,0.28)]" />
          Atendendo Paulínia e região
        </span>

        {/* 2. Slider antes/depois — primeiro elemento visual da página (LCP) */}
        <div className="mt-3 md:mt-8">
          <BeforeAfterSlider />
        </div>

        {/* 3. Headline */}
        <h1 className="mt-2.5 max-w-none text-[clamp(24px,7vw,70px)] leading-[1.08] font-extrabold md:mt-8 md:max-w-[15ch] md:leading-[1.05]">
          O seu sofá está mais sujo do que <span className="text-yellow">parece</span>.
        </h1>

        {/* 4. Subtítulo — no máximo 2 linhas no mobile */}
        <p className="mt-1 line-clamp-2 max-w-[46ch] text-[14.5px] leading-snug text-[#DCD2FF] md:mt-4 md:line-clamp-none md:text-[clamp(17px,2.3vw,20.5px)] md:leading-normal">
          {hero.subtitle}
        </p>

        {/* 5. Botões */}
        <div className="mt-2.5 flex flex-wrap gap-3 md:mt-7">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 text-[15.5px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE] md:py-3.5"
          >
            Pedir orçamento no WhatsApp
          </a>
          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-[15.5px] font-bold text-white transition hover:border-white hover:bg-white/10 md:py-3.5"
          >
            Calcular meu orçamento
          </a>
        </div>

        {/* 6. Selos de reforço */}
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#C9BCF5] md:mt-6">
          <span>
            <b className="font-bold text-white">Orçamento na hora</b>
          </span>
          <span>
            <b className="font-bold text-white">Sem taxa</b> de visita
          </span>
          <span>
            Seca em <b className="font-bold text-white">4 a 6 horas</b>
          </span>
        </p>
      </div>
    </div>
  );
}
