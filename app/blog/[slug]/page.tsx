import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { site, buildWhatsAppLink } from "@/config/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />

      <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8B80A8]">{formatDate(post.date)}</p>
        <h1 className="mt-2 text-[clamp(28px,5vw,44px)] text-ink">{post.title}</h1>
        <div className="blog-content mt-4" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-12 rounded-[28px] bg-[linear-gradient(150deg,#FFD34A,#FFB03A)] px-6 py-10 text-center text-ink">
          <h2 className="text-[clamp(22px,3.6vw,30px)]">Prefere resolver direto?</h2>
          <p className="mt-1 opacity-80">Manda uma foto do seu estofado e o orçamento sai na hora.</p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3.5 text-[15.5px] font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Falar no WhatsApp
          </a>
        </div>
      </article>
    </main>
  );
}
