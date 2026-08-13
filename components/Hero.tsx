import { buildWhatsAppLink } from "@/config/site";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function Hero() {
  return (
    <div id="top" className="relative overflow-hidden bg-[linear-gradient(158deg,#2C0A6B_0%,#5B1FC4_46%,#7C3AED_100%)] pb-20 pt-14 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-36 h-[460px] w-[460px] rounded-full bg-aqua/40 blur-[70px]"
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
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-semibold backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_0_4px_rgba(15,217,184,0.28)]" />
          Atendendo Paulínia e região
        </span>

        <h1 className="mt-5 max-w-[15ch] text-[clamp(40px,7.8vw,70px)] font-extrabold">
          O seu sofá está mais sujo do que <span className="text-yellow">parece</span>.
        </h1>

        <p className="mt-4 max-w-[46ch] text-[clamp(17px,2.3vw,20.5px)] text-[#DCD2FF]">
          Higienização profunda com extração de água. Tira ácaro, mancha, pelo de pet e cheiro — na sua casa, e seca no mesmo dia.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3.5 text-[15.5px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Pedir orçamento no WhatsApp
          </a>
          <a
            href="#calculadora"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3.5 text-[15.5px] font-bold text-white transition hover:border-white hover:bg-white/10"
          >
            Calcular meu orçamento
          </a>
        </div>

        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#C9BCF5]">
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

        <div className="mt-11">
          <BeforeAfterSlider />
        </div>
      </div>
    </div>
  );
}
