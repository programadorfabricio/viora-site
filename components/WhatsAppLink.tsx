"use client";

import { trackEvent } from "@/lib/analytics";

// Todo botão de WhatsApp do site passa por aqui — é o que garante que
// nenhum clique fique sem o parâmetro de origem no GA4.
export type WhatsAppOrigin = "header" | "hero" | "calculadora" | "barra_fixa" | "cta_final" | "rodape";

export default function WhatsAppLink({
  href,
  origin,
  className,
  children,
}: {
  href: string;
  origin: WhatsAppOrigin;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("whatsapp_click", { origem: origin })}
    >
      {children}
    </a>
  );
}
