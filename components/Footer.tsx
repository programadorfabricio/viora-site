import Link from "next/link";
import { site, buildWhatsAppLink } from "@/config/site";
import { servicePages } from "@/content/services";
import WhatsAppLink from "./WhatsAppLink";

const atendimentoLinks = [
  { label: "Área de atendimento", href: "/area-de-atendimento" },
  { label: "Preços", href: "/precos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-[14.5px] text-[#B7A9E0]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
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

        {/* Serviços */}
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

        {/* Atendimento */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8B7FB0]">Atendimento</p>
          <ul className="space-y-2">
            {atendimentoLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8B7FB0]">Contato</p>
          <ul className="space-y-2">
            <li>
              <WhatsAppLink href={buildWhatsAppLink()} origin="rodape" className="hover:text-white">
                WhatsApp
              </WhatsAppLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-6 text-[13px] text-[#8B7FB0] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <Link href="/politica-de-privacidade" className="font-semibold hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
