import Link from "next/link";
import { Fragment } from "react";

const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\))/g;
const LINK_MATCH = /^\[([^\]]+)\]\(([^)]+)\)$/;

/**
 * Renderiza texto corrido que pode conter links no formato [texto](/rota).
 * Usado no conteúdo de content/services e content/pages para colocar links
 * internos dentro do parágrafo — nunca como bloco separado de "veja também".
 */
export default function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(LINK_PATTERN);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        const match = part.match(LINK_MATCH);
        if (match) {
          return (
            <Link
              key={i}
              href={match[2]}
              className="font-semibold text-violet underline decoration-violet/40 underline-offset-2 transition hover:text-violet-deep hover:decoration-violet-deep"
            >
              {match[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </p>
  );
}
