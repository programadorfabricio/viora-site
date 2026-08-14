"use client";

import type { ReactEventHandler } from "react";
import { trackEvent } from "@/lib/analytics";

export type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const handleToggle =
    (question: string): ReactEventHandler<HTMLDetailsElement> =>
    (e) => {
      if (e.currentTarget.open) {
        trackEvent("faq_abertura", { pergunta: question });
      }
    };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          onToggle={handleToggle(item.question)}
          className="group rounded-2xl bg-white p-5 shadow-[0_12px_30px_-24px_rgba(60,20,140,0.6)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
            {item.question}
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-lilac text-lg font-extrabold leading-none text-violet group-open:bg-violet group-open:text-white">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">–</span>
            </span>
          </summary>
          <p className="mt-3 max-w-[62ch] text-[15.5px] text-[#5C5478]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
