import Link from "next/link";
import { site } from "@/config/site";
import { servicePages } from "@/content/services";

const institutionalLinks = [
  { label: "Preços", href: "/precos" },
  { label: "Área de atendimento", href: "/area-de-atendimento" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-28 pt-14 text-[14.5px] text-[#B7A9E0] md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-white">{site.name}</p>
          <p className="mt-1.5">Paulínia, SP</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-white transition hover:text-[#C9BCF5]"
          >
            {site.instagramHandle}
          </a>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8B7FB0]">Serviços</p>
          <ul className="space-y-2">
            {servicePages.map((service) => (
              <li key={service.slug}>
                <Link href={`/servicos/${service.slug}`} className="hover:text-white">
                  {service.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8B7FB0]">Empresa</p>
          <ul className="space-y-2">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-5 text-[13px] text-[#B7A9E0]">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
