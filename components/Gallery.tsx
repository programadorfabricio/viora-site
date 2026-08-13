import Image from "next/image";
import { gallery } from "@/config/site";

/**
 * GALERIA DE TRABALHOS — desativada até existirem fotos reais.
 * Não renderiza nada enquanto `gallery` (config/site.ts) estiver vazio.
 *
 * PARA ATIVAR: coloque as fotos em /public/galeria/ e preencha o array
 * `gallery` em config/site.ts com objetos { image, caption }, ex.:
 * { image: "/galeria/sofa-1.jpg", caption: "Sofá 3 lugares — Paulínia" }.
 * Esta seção passa a aparecer sozinha, sem precisar mexer neste
 * componente. Para posicioná-la na página, importe <Gallery /> em
 * app/page.tsx (ela já existe pronta abaixo).
 */
export default function Gallery() {
  if (gallery.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="mb-9 max-w-[52ch]">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Galeria</p>
        <h2 className="mt-3 text-[clamp(28px,5vw,42px)]">Trabalhos recentes.</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.image} className="relative aspect-square overflow-hidden rounded-2xl bg-lilac">
            <Image src={item.image} alt={item.caption} fill className="object-cover" />
            <figcaption className="sr-only">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
