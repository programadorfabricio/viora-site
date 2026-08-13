import { faq } from "@/config/site";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <div className="mb-8 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Dúvidas</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">O que mais perguntam.</h2>
      </div>

      <div className="space-y-3">
        {faq.map((item) => (
          <details
            key={item.question}
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
    </section>
  );
}
