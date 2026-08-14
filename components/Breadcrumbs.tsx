import Link from "next/link";
import { site } from "@/config/site";

// href: null quando o nível não tem página própria (ex.: "Serviços" — só
// existe como categoria no menu, não como rota) — vira texto, não link.
export type Crumb = { label: string; href: string | null };

/**
 * Trilha visual + JSON-LD BreadcrumbList. Use em toda página interna
 * (tudo exceto a home). O último item não é um link (é a página atual).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Início", href: "/" as string | null }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-5 text-[13px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-[#5C5478]">
        <li>
          <Link href="/" className="hover:text-violet">
            Início
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-semibold text-ink" : ""}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-violet">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
