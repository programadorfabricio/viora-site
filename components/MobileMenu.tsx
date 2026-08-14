"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ServicePageContent } from "@/content/types";

type NavLink = { label: string; href: string };

export default function MobileMenu({
  services,
  links,
  onClose,
}: {
  services: ServicePageContent[];
  links: NavLink[];
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Portal para document.body: renderizar dentro de <header> quebrava o
  // menu, porque o backdrop-filter do header vira containing block de
  // descendentes fixed — o menu ficava preso à altura do header (64px)
  // em vez do viewport inteiro. Ver diagnóstico no histórico do projeto.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Só existe DOM real (e portanto um nó para focar) depois que `mounted`
  // vira true e o portal renderiza — focar antes disso não tem efeito,
  // porque firstLinkRef.current ainda é null nesse primeiro render.
  useEffect(() => {
    if (mounted) {
      firstLinkRef.current?.focus();
    }
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      // Para no bottom-[70px] (altura da barra fixa de WhatsApp, ~68px) em
      // vez de bottom-0 — assim nenhum item da lista fica embaixo da barra,
      // que continua sempre visível por cima (z-50 > z-40 daqui).
      className="fixed inset-x-0 top-16 bottom-[70px] z-40 overflow-y-auto bg-ink px-5 py-6 md:hidden"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8B7FB0]">Serviços</p>
      <ul className="mb-6 space-y-1">
        {services.map((service, i) => (
          <li key={service.slug}>
            <Link
              ref={i === 0 ? firstLinkRef : undefined}
              href={`/servicos/${service.slug}`}
              onClick={onClose}
              className="block rounded-xl px-3 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              {service.navLabel}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="space-y-1 border-t border-white/10 pt-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block rounded-xl px-3 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}
