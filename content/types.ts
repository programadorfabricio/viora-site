import type { ServiceId } from "@/config/site";
import type { BeforeAfterCase } from "@/config/site";

export type ServiceFaqItem = { question: string; answer: string };

/**
 * Conteúdo de uma página de serviço (app/servicos/[slug]/page.tsx).
 * Um arquivo por página em content/services/ — a página lê o texto daqui,
 * o template (o .tsx) é o mesmo para todas. Preços NÃO ficam aqui: a página
 * busca em config/site.ts (services/calculatorItems) pelos `serviceIds`
 * abaixo, para nunca duplicar número em dois lugares.
 */
export type ServicePageContent = {
  slug: string; // ex.: "higienizacao-de-sofa" — bate com a URL /servicos/[slug]
  serviceIds: ServiceId[]; // quais entradas de `services`/`calculatorItems` (config/site.ts) esta página representa
  navLabel: string; // rótulo curto para o menu "Serviços" (ex.: "Sofá")
  metaTitle: string;
  metaDescription: string;
  eyebrow: string; // rótulo curto acima do H1
  h1: string;
  heroLead: string; // 1-2 frases logo abaixo do H1 (aceita [texto](/link), ver RichText)
  accumulationTitle: string;
  accumulation: { title: string; body: string }[];
  processTitle: string;
  process: { title: string; body: string }[];
  // Parágrafos extras que aprofundam o assunto (garantem as 600+ palavras
  // reais) e carregam os 2-3 links internos em texto corrido — nunca em
  // bloco de "veja também". Sintaxe [texto](/rota) vira link automaticamente.
  bodyExtra: { title: string; paragraphs: string[] }[];
  faqTitle: string;
  faq: ServiceFaqItem[];
  whatsappMessage: string;
  // Vazio até existirem fotos reais deste serviço — mesmo padrão de
  // config/site.ts (beforeAfterCases): a seção não renderiza com array vazio.
  beforeAfter: BeforeAfterCase[];
};

// `list`, quando presente, renderiza como lista com marcadores logo depois
// dos parágrafos — usado em conteúdo mais denso (ex.: política de
// privacidade), onde texto corrido puro fica difícil de escanear.
export type ProseSection = { title: string; paragraphs: string[]; list?: string[] };

/**
 * Conteúdo das páginas institucionais (/precos, /area-de-atendimento,
 * /sobre) — cada uma tem seu próprio page.tsx (estrutura muito diferente
 * entre elas: tabela de preço, lista de cidades, texto sobre a empresa),
 * mas compartilham esse mesmo formato de cabeçalho + seções de texto.
 * Números (preços, cidades) NÃO ficam aqui — a página busca em
 * config/site.ts para nunca duplicar dado.
 */
export type InstitutionalPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: ProseSection[];
};
