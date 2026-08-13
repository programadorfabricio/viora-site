import { whyChooseUs } from "@/config/site";

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="mb-9 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Por que a Viora</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">Do jeito certo, sem enrolação.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {whyChooseUs.map((point) => (
          <div key={point.id} className="rounded-[20px] bg-lilac p-6">
            <h3 className="text-lg font-bold text-ink">{point.title}</h3>
            <p className="mt-2 text-[15px] text-[#5C5478]">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
