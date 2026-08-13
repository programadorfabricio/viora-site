import { howItWorks } from "@/config/site";

export default function HowItWorks() {
  return (
    <section className="bg-[linear-gradient(150deg,#3B0F86,#6D28D9)] py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Como funciona</p>
        <h2 className="mt-3 text-[clamp(30px,5vw,46px)]">Da mensagem ao sofá seco.</h2>

        <div className="mt-9 grid gap-4 md:grid-cols-4">
          {howItWorks.map((item) => (
            <div key={item.step} className="rounded-[20px] bg-white p-6">
              <div className="mb-3.5 grid h-9 w-9 place-items-center rounded-xl bg-violet font-display text-base font-extrabold text-white">
                {item.step}
              </div>
              <h3 className="text-[19px] font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] text-[#5C5478]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
