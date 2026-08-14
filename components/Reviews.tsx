import { reviews } from "@/config/site";

/**
 * SEÇÃO DE AVALIAÇÕES — desativada até existirem depoimentos reais.
 * Não renderiza nada enquanto `reviews` (config/site.ts) estiver vazio.
 *
 * PARA ATIVAR: preencha o array `reviews` em config/site.ts com objetos
 * { name, city, text, rating }. Esta seção passa a aparecer sozinha,
 * sem precisar mexer neste componente. Para posicioná-la na página,
 * importe <Reviews /> em app/page.tsx (ela já existe pronta abaixo).
 */
export default function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="mb-9 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Avaliações</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">Quem já usou.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={`${review.name}-${review.city}`}
            className="rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)]"
          >
            <p className="text-sm font-bold text-yellow" aria-label={`${review.rating} de 5 estrelas`}>
              {"★".repeat(review.rating)}
              {"☆".repeat(Math.max(0, 5 - review.rating))}
            </p>
            <p className="mt-3 text-[15px] text-[#5C5478]">&ldquo;{review.text}&rdquo;</p>
            <p className="mt-4 text-sm font-bold text-ink">
              {review.name} <span className="font-normal text-[#6B6088]">· {review.city}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
