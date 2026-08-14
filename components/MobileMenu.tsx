"use client";

import Link from "next/link";
import { useEffect } from "react";
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
  // Trava o scroll do body enquanto o menu está aberto.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      id="mobile-menu"
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-ink px-5 py-6 md:hidden"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8B7FB0]">Serviços</p>
      <ul className="mb-6 space-y-1">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
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
    </div>
  );
}
