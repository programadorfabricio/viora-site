"use client";

import { useMemo, useState } from "react";
import {
  buildWhatsAppLink,
  calculatorItems,
  cities,
  type CalculatorItem,
  type City,
} from "@/config/site";

type Selection = {
  quantity: number;
  variantId: string | null;
};

type Selections = Partial<Record<string, Selection>>;

const OTHER_CITY = "Outra cidade";

function currency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function unitRange(item: CalculatorItem, variantId: string | null) {
  if (item.hasVariant) {
    const variant = item.variants?.find((v) => v.id === variantId) ?? item.variants?.[0];
    return variant ? { min: variant.min, max: variant.max, label: variant.label } : null;
  }
  return item.flat ? { ...item.flat, label: null } : null;
}

export default function Calculator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selections, setSelections] = useState<Selections>({});
  const [city, setCity] = useState<string>("");

  const itemsNeedingVariant = useMemo(
    () =>
      calculatorItems.filter(
        (item) => item.hasVariant && (selections[item.id]?.quantity ?? 0) > 0
      ),
    [selections]
  );

  const selectedItems = useMemo(
    () => calculatorItems.filter((item) => (selections[item.id]?.quantity ?? 0) > 0),
    [selections]
  );

  const canProceedStep1 = selectedItems.length > 0;
  const cityIsCovered = cities.includes(city as City);

  function setQuantity(item: CalculatorItem, quantity: number) {
    setSelections((prev) => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[item.id];
        return next;
      }
      const current = prev[item.id];
      next[item.id] = {
        quantity,
        variantId: current?.variantId ?? item.variants?.[0]?.id ?? null,
      };
      return next;
    });
  }

  function setVariant(item: CalculatorItem, variantId: string) {
    setSelections((prev) => ({
      ...prev,
      [item.id]: {
        quantity: prev[item.id]?.quantity ?? 1,
        variantId,
      },
    }));
  }

  function goNextFromStep1() {
    setStep(itemsNeedingVariant.length > 0 ? 2 : 3);
  }

  function goBackFromStep3() {
    setStep(itemsNeedingVariant.length > 0 ? 2 : 1);
  }

  const totals = useMemo(() => {
    let min = 0;
    let max = 0;
    for (const item of selectedItems) {
      const sel = selections[item.id];
      if (!sel) continue;
      const range = unitRange(item, sel.variantId);
      if (!range) continue;
      min += range.min * sel.quantity;
      max += range.max * sel.quantity;
    }
    return { min, max };
  }, [selectedItems, selections]);

  const whatsappMessage = useMemo(() => {
    const lines = selectedItems.map((item) => {
      const sel = selections[item.id];
      if (!sel) return "";
      const range = unitRange(item, sel.variantId);
      const variantLabel = range?.label ? ` (${range.label})` : "";
      return `- ${item.label}${variantLabel} x${sel.quantity}`;
    });

    const parts = [
      "Oi! Vim pelo site e gostaria de um orçamento de higienização.",
      "",
      "Itens:",
      ...lines,
      "",
      `Cidade: ${city || "não informada"}`,
    ];

    if (city && cityIsCovered) {
      parts.push(
        `Estimativa do site: de ${currency(totals.min)} a ${currency(totals.max)} (valor final depende do tecido e do estado da peça)`
      );
    } else if (city) {
      parts.push("Cidade fora da área listada no site — gostaria de saber se atendem e o valor.");
    }

    return parts.join("\n");
  }, [selectedItems, selections, city, cityIsCovered, totals]);

  function resetCalculator() {
    setSelections({});
    setCity("");
    setStep(1);
  }

  const stepNumberForDisplay = step === 4 ? 3 : step;
  const totalSteps = itemsNeedingVariant.length > 0 ? 3 : 2;
  const displaySteps = itemsNeedingVariant.length > 0 ? stepNumberForDisplay : step === 3 || step === 4 ? 2 : 1;

  return (
    <section id="calculadora" className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <div className="mb-8 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Orçamento</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">Calcule sua estimativa.</h2>
        <p className="mt-3 text-[#5C5478]">
          Uma faixa de valores em segundos. O valor final é sempre confirmado pelo WhatsApp, depois de ver o
          tecido e o estado da peça.
        </p>
      </div>

      <div className="rounded-[24px] bg-white p-6 shadow-[0_24px_70px_-30px_rgba(60,20,140,0.55)] md:p-8">
        {step !== 4 && (
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.14em] text-[#8B80A8]">
            Passo {displaySteps} de {totalSteps}
          </p>
        )}

        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-ink">Quais itens você quer higienizar?</h3>
            <div className="mt-5 space-y-3">
              {calculatorItems.map((item) => {
                const quantity = selections[item.id]?.quantity ?? 0;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-lilac p-4"
                  >
                    <span className="font-semibold text-ink">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Diminuir quantidade de ${item.label}`}
                        onClick={() => setQuantity(item, Math.max(0, quantity - 1))}
                        className="grid h-9 w-9 place-items-center rounded-full bg-lilac text-lg font-bold text-violet transition hover:bg-violet hover:text-white"
                      >
                        −
                      </button>
                      <span className="w-5 text-center font-display text-lg font-extrabold text-ink">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Aumentar quantidade de ${item.label}`}
                        onClick={() => setQuantity(item, quantity + 1)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-lilac text-lg font-bold text-violet transition hover:bg-violet hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              disabled={!canProceedStep1}
              onClick={goNextFromStep1}
              className="mt-7 w-full rounded-full bg-violet px-6 py-3.5 text-[15.5px] font-bold text-white transition enabled:hover:bg-violet-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-ink">Só mais um detalhe:</h3>
            <div className="mt-5 space-y-6">
              {itemsNeedingVariant.map((item) => {
                const selectedVariantId = selections[item.id]?.variantId;
                return (
                  <div key={item.id}>
                    <p className="mb-2.5 font-semibold text-ink">{item.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.variants?.map((variant) => (
                        <button
                          key={variant.id}
                          type="button"
                          aria-pressed={selectedVariantId === variant.id}
                          onClick={() => setVariant(item, variant.id)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selectedVariantId === variant.id
                              ? "bg-violet text-white"
                              : "bg-lilac text-ink hover:bg-violet/15"
                          }`}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border-2 border-lilac px-6 py-3.5 text-[15.5px] font-bold text-ink transition hover:border-violet"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 rounded-full bg-violet px-6 py-3.5 text-[15.5px] font-bold text-white transition hover:bg-violet-deep"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-ink">Em qual cidade?</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={city === c}
                  onClick={() => setCity(c)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    city === c ? "bg-violet text-white" : "bg-lilac text-ink hover:bg-violet/15"
                  }`}
                >
                  {c}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={city === OTHER_CITY}
                onClick={() => setCity(OTHER_CITY)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  city === OTHER_CITY ? "bg-violet text-white" : "bg-lilac text-ink hover:bg-violet/15"
                }`}
              >
                Outra cidade
              </button>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={goBackFromStep3}
                className="rounded-full border-2 border-lilac px-6 py-3.5 text-[15.5px] font-bold text-ink transition hover:border-violet"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!city}
                onClick={() => setStep(4)}
                className="flex-1 rounded-full bg-violet px-6 py-3.5 text-[15.5px] font-bold text-white transition enabled:hover:bg-violet-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ver estimativa
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            {cityIsCovered ? (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#8B80A8]">Sua estimativa</p>
                <p className="mt-2 font-display text-[clamp(30px,6vw,44px)] font-extrabold text-violet">
                  de {currency(totals.min)} a {currency(totals.max)}
                </p>
                <p className="mt-3 text-sm text-[#5C5478]">
                  Valor final depende do tecido e do estado da peça — confirmado pelo WhatsApp antes de agendar.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#8B80A8]">Sua cidade</p>
                <p className="mt-2 font-display text-2xl font-extrabold text-violet">Consulte pelo WhatsApp</p>
                <p className="mt-3 text-sm text-[#5C5478]">
                  Essa cidade ainda não está na nossa lista padrão. Manda a mensagem que a gente confirma se dá
                  para atender e qual o valor.
                </p>
              </>
            )}

            <a
              href={buildWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-aqua px-6 py-4 text-[15.5px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
            >
              Enviar pelo WhatsApp
            </a>
            <button
              type="button"
              onClick={resetCalculator}
              className="mt-3 w-full rounded-full px-6 py-2.5 text-sm font-semibold text-[#8B80A8] transition hover:text-violet"
            >
              Recomeçar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
