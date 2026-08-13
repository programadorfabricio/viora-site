"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { beforeAfterCases } from "@/config/site";

/**
 * Placeholders em CSS/Tailwind que sugerem "tecido sujo" vs "tecido limpo".
 * TROCAR PELAS FOTOS REAIS: preencha beforeImage/afterImage em
 * config/site.ts (campo beforeAfterCases) com o caminho do arquivo em
 * /public/antes-depois/. Assim que os dois campos existirem para um caso,
 * este componente troca automaticamente o placeholder pela <Image> real.
 */
function DirtyPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 2px, transparent 2px 5px)",
          "repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 2px, transparent 2px 5px)",
          "radial-gradient(circle at 30% 35%, rgba(52,36,18,.8), transparent 46%)",
          "radial-gradient(circle at 72% 68%, rgba(44,32,18,.7), transparent 42%)",
          "linear-gradient(150deg, #8A7554, #57462F)",
        ].join(","),
      }}
    />
  );
}

function CleanPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "repeating-linear-gradient(90deg, rgba(255,255,255,.2) 0 2px, transparent 2px 5px)",
          "repeating-linear-gradient(0deg, rgba(255,255,255,.15) 0 2px, transparent 2px 5px)",
          "radial-gradient(circle at 34% 30%, rgba(255,255,255,.5), transparent 52%)",
          "linear-gradient(150deg, #D9CEF7, #A48FE0)",
        ].join(","),
      }}
    />
  );
}

const STEP = 4;

export default function BeforeAfterSlider() {
  const cases = beforeAfterCases;
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const active = cases[activeIndex];

  const setPositionFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  if (cases.length === 0) return null;

  return (
    <div>
      {cases.length > 1 && (
        <div role="tablist" aria-label="Casos de antes e depois" className="mb-3 flex flex-wrap gap-2">
          {cases.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              aria-selected={i === activeIndex}
              onClick={() => {
                setActiveIndex(i);
                setPosition(50);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                i === activeIndex
                  ? "bg-white text-violet-deep"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label={`Comparação antes e depois da higienização — ${active.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}%`}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[22px] border-[3px] border-white/55 bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]"
        onPointerDown={(e) => {
          draggingRef.current = true;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setPositionFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) setPositionFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            setPosition((p) => Math.max(0, p - STEP));
            e.preventDefault();
          }
          if (e.key === "ArrowRight") {
            setPosition((p) => Math.min(100, p + STEP));
            e.preventDefault();
          }
          if (e.key === "Home") {
            setPosition(0);
            e.preventDefault();
          }
          if (e.key === "End") {
            setPosition(100);
            e.preventDefault();
          }
        }}
      >
        {active.beforeImage ? (
          <Image src={active.beforeImage} alt={`${active.label} antes da higienização`} fill className="object-cover" />
        ) : (
          <DirtyPlaceholder />
        )}

        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          {active.afterImage ? (
            <Image src={active.afterImage} alt={`${active.label} depois da higienização`} fill className="object-cover" />
          ) : (
            <CleanPlaceholder />
          )}
        </div>

        <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">
          Antes
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-aqua px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#04302A]">
          Depois
        </span>

        <div className="absolute inset-y-0 w-[3px] bg-white" style={{ left: `${position}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-lg font-extrabold text-violet shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            ⇔
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[13.5px] font-medium text-[#C9BCF5]">Arraste para comparar</p>
    </div>
  );
}
