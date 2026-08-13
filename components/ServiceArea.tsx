import { cities } from "@/config/site";

export default function ServiceArea() {
  return (
    <section className="bg-[linear-gradient(150deg,#FF8F6B,#FF6B7F)] py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-85">Onde atendemos</p>
        <h2 className="mt-3 text-[clamp(28px,4.6vw,42px)]">Atendimento em domicílio na região.</h2>
        <p className="mt-2.5 max-w-[50ch] opacity-95">
          Sem taxa de visita nas cidades abaixo. Fora delas, é só perguntar pelo WhatsApp.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <span
              key={city}
              className="rounded-full border-[1.5px] border-white/45 bg-white/20 px-[18px] py-2.5 text-[15px] font-bold backdrop-blur-sm"
            >
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
