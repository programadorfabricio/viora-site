"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buildWhatsAppLink } from "@/config/site";
import { servicePages } from "@/content/services";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Preços", href: "/precos" },
  { label: "Área de atendimento", href: "/area-de-atendimento" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fecha o dropdown/menu mobile automaticamente ao trocar de página — o
  // Header vive no layout raiz e não remonta entre navegações client-side.
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex flex-col leading-none">
          <span className="inline-flex items-center font-display text-xl font-extrabold tracking-tight text-white">
            Vi
            {/* "o" da wordmark = public/viora-icone-cor.svg inline, exatamente como no
                arquivo (ponta da espiral em turquesa). É a mesma logo usada no perfil do
                Google, Instagram e favicon — exceção deliberada ao sistema de cores, ver
                nota no topo de config/site.ts. Não trocar por versão monocromática. */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="mx-[1px] h-[0.85em] w-[0.85em] shrink-0 translate-y-[0.1em]"
            >
              <path d="M50 92 A42 42 0 1 1 92 50" fill="none" stroke="#6D28D9" strokeWidth="17" strokeLinecap="round" />
              <path d="M92 50 A42 42 0 0 1 68 88" fill="none" stroke="#6D28D9" strokeWidth="13" strokeLinecap="round" />
              <path d="M68 88 A25 25 0 1 0 50 40" fill="none" stroke="#0FD9B8" strokeWidth="8.5" strokeLinecap="round" />
            </svg>
            ra
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C9BCF5]">
            Higienização
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((o) => !o)}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-semibold text-white transition hover:bg-white/10"
            >
              Serviços
              <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition ${servicesOpen ? "rotate-180" : ""}`} fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white p-2 shadow-[0_24px_60px_-20px_rgba(27,11,59,0.5)]">
                {servicePages.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/servicos/${service.slug}`}
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-xl px-3.5 py-2.5 text-[14.5px] font-semibold text-ink transition hover:bg-lilac"
                  >
                    {service.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[14.5px] font-semibold text-white transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-3 text-sm font-bold text-[#04302A] shadow-[0_8px_22px_-8px_rgba(15,217,184,0.75)] transition hover:-translate-y-0.5 hover:bg-[#2AEFCE]"
          >
            Pedir orçamento
          </a>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu services={servicePages} links={navLinks} onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}
