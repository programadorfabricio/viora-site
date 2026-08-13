"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { beforeAfterCases } from "@/config/site";

/**
 * O slider é o primeiro elemento visual da página (LCP). Quando as fotos
 * reais entrarem em beforeAfterCases (config/site.ts), a imagem "antes" já
 * carrega com priority — ajuste "sizes" abaixo se a largura máxima do
 * container mudar.
 */
const IMAGE_SIZES = "(min-width: 1024px) 1000px, 100vw";

// Duração máxima da animação de demonstração (ensina a arrastar) — trava em 1,5s.
const DEMO_DURATION_MS = 1500;
const DEMO_AMPLITUDE = 16;

// Distância (px) que o toque precisa se mover na horizontal, e superar a
// vertical, antes de o gesto ser tratado como arraste do slider em vez de
// rolagem da página. Ver comentário em onPointerDown/onPointerMove.
const DRAG_INTENT_THRESHOLD = 8;

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
  const interactedRef = useRef(false);
  // Toque/caneta pendente: ponto onde o gesto começou, aguardando decidir se
  // é um arraste horizontal (nosso) ou uma rolagem vertical (do navegador).
  const pendingTouchRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showTabsFade, setShowTabsFade] = useState(false);

  const active = cases[activeIndex];

  const setPositionFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  // Mostra o fade na borda direita das abas só enquanto houver conteúdo
  // fora da área visível — some assim que o usuário rola até o fim.
  const updateTabsFade = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setShowTabsFade(el.scrollWidth > el.clientWidth + 2 && !atEnd);
  }, []);

  useEffect(() => {
    updateTabsFade();
    window.addEventListener("resize", updateTabsFade);
    return () => window.removeEventListener("resize", updateTabsFade);
  }, [updateTabsFade]);

  // Movimento automático curto que ensina a arrastar: balança a partir do
  // centro e trava de volta em 50% — nunca dura mais que DEMO_DURATION_MS.
  // Some totalmente com prefers-reduced-motion, e qualquer interação do
  // usuário (arrastar ou teclado) cancela na hora.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      if (interactedRef.current) return;
      const elapsed = now - start;
      if (elapsed >= DEMO_DURATION_MS) {
        setPosition(50);
        return;
      }
      const t = elapsed / DEMO_DURATION_MS;
      const swing = Math.sin(t * Math.PI * 2) * DEMO_AMPLITUDE * (1 - t);
      setPosition(50 + swing);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (cases.length === 0) return null;

  return (
    <div>
      {cases.length > 1 && (
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Casos de antes e depois"
          onScroll={updateTabsFade}
          className="mb-1.5 flex flex-nowrap gap-2 overflow-x-auto pb-1"
          // Funde as abas para transparente perto da borda direita enquanto
          // houver conteúdo fora da área visível — some sozinho ao rolar até
          // o fim. mask-image funde os próprios botões (não pinta uma cor
          // sólida por cima), então funciona sobre qualquer fundo, inclusive
          // o degradê roxo do Hero.
          style={
            showTabsFade
              ? {
                  WebkitMaskImage: "linear-gradient(to right, black calc(100% - 32px), transparent 100%)",
                  maskImage: "linear-gradient(to right, black calc(100% - 32px), transparent 100%)",
                }
              : undefined
          }
        >
          {cases.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              aria-selected={i === activeIndex}
              onClick={() => {
                interactedRef.current = true;
                setActiveIndex(i);
                setPosition(50);
              }}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] font-semibold transition md:px-4 md:py-2 md:text-sm ${
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
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[22px] border-[3px] border-white/55 bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]"
        onPointerDown={(e) => {
          interactedRef.current = true;
          // Mouse (e trackpad) começa a arrastar na hora, sem ambiguidade
          // de gesto — não há "rolagem vertical" concorrendo com o clique.
          if (e.pointerType === "mouse") {
            draggingRef.current = true;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            setPositionFromClientX(e.clientX);
            return;
          }
          // Toque/caneta: NÃO captura ainda. Só guarda o ponto inicial —
          // capturar aqui prenderia todo o gesto (inclusive rolagem
          // vertical) neste elemento, travando a página. A decisão entre
          // "é arraste" e "é rolagem" acontece em onPointerMove.
          pendingTouchRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) {
            setPositionFromClientX(e.clientX);
            return;
          }
          const pending = pendingTouchRef.current;
          if (!pending || pending.id !== e.pointerId) return;
          const deltaX = e.clientX - pending.x;
          const deltaY = e.clientY - pending.y;
          if (Math.abs(deltaX) > DRAG_INTENT_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal venceu: assume o gesto como arraste do slider.
            draggingRef.current = true;
            pendingTouchRef.current = null;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            setPositionFromClientX(e.clientX);
          } else if (Math.abs(deltaY) > DRAG_INTENT_THRESHOLD) {
            // Vertical venceu: é rolagem da página — solta o gesto e deixa
            // o navegador tratar (touch-action: pan-y já permite isso).
            pendingTouchRef.current = null;
          }
        }}
        onPointerUp={() => {
          draggingRef.current = false;
          pendingTouchRef.current = null;
        }}
        onPointerCancel={() => {
          // O navegador dispara isto quando decide assumir o gesto como
          // rolagem — resetar aqui evita que o slider fique "preso" achando
          // que ainda está arrastando.
          draggingRef.current = false;
          pendingTouchRef.current = null;
        }}
        onKeyDown={(e) => {
          interactedRef.current = true;
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
          <Image
            src={active.beforeImage}
            alt={`${active.label} antes da higienização`}
            fill
            priority
            sizes={IMAGE_SIZES}
            className="object-cover"
          />
        ) : (
          <DirtyPlaceholder />
        )}

        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          {active.afterImage ? (
            <Image
              src={active.afterImage}
              alt={`${active.label} depois da higienização`}
              fill
              sizes={IMAGE_SIZES}
              className="object-cover"
            />
          ) : (
            <CleanPlaceholder />
          )}
        </div>

        <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">
          Antes
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-white px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
          Depois
        </span>

        <div className="absolute inset-y-0 w-[3px] bg-white" style={{ left: `${position}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-lg font-extrabold text-violet shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            ⇔
          </div>
        </div>
      </div>
      {/* Única affordance de "isso arrasta" no toque: a animação de demonstração
          não roda com prefers-reduced-motion, já terminou para quem chega
          depois de 1,5s, e não há cursor no touch para sugerir interação. */}
      <p className="mt-1 text-center text-[11px] font-medium text-[#C9BCF5] md:mt-3 md:text-[13.5px]">
        <span className="sr-only">Arraste para comparar</span>
        <span aria-hidden="true" className="md:hidden">
          ← arraste →
        </span>
        <span aria-hidden="true" className="hidden md:inline">
          Arraste para comparar
        </span>
      </p>
    </div>
  );
}
