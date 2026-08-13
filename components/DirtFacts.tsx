import { dirtFacts } from "@/config/site";

export default function DirtFacts() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="mb-9 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Por dentro do estofado</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">Mais sujo do que parece.</h2>
        <p className="mt-3 text-[#5C5478]">
          O que se acumula no sofá e no colchão com o uso do dia a dia — mesmo sem mancha visível.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dirtFacts.map((fact) => (
          <div
            key={fact.id}
            className="rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)]"
          >
            <h3 className="text-lg font-bold text-ink">{fact.title}</h3>
            <p className="mt-2 text-[15px] text-[#5C5478]">{fact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
