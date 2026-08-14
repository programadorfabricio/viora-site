import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/config/site";

const metaTitle = "Blog da Viora — Guias sobre Higienização de Estofados";
const metaDescription =
  "Artigos práticos sobre cuidado com sofá, colchão e estofados: frequência ideal, como ler etiqueta de tecido, preço de mercado e o que realmente funciona contra ácaro.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: `${site.url}/blog`,
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet">Blog</p>
        <h1 className="mt-3 text-[clamp(30px,5.5vw,50px)] text-ink">Guias sobre higienização de estofados.</h1>
        <p className="mt-3 max-w-[60ch] text-[#5C5478]">{metaDescription}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(60,20,140,0.5)] transition hover:-translate-y-0.5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8B80A8]">
                {formatDate(post.date)}
              </span>
              <h2 className="mt-2 text-lg font-bold text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-[15px] text-[#5C5478]">{post.description}</p>
              <span className="mt-4 text-sm font-bold text-violet">Ler artigo →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
