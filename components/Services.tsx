import Link from "next/link";
import { services } from "@/config/site";

export default function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="mb-9 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Serviços</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">O que a gente higieniza.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/servicos/${service.pageSlug}`}
            className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)] transition hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-bold text-ink">{service.name}</h3>
            <p className="mt-2 flex-1 text-[15px] text-[#5C5478]">{service.description}</p>
            <p className="mt-4 border-t border-lilac pt-4">
              <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6088]">
                {service.priceNote}
              </span>
              <span className="font-display text-xl font-extrabold text-violet">
                R$ {service.priceFrom}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
