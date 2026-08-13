/**
 * CONFIGURAÇÃO CENTRAL DO SITE — VIORA HIGIENIZAÇÃO
 * ---------------------------------------------------
 * Edite este arquivo para trocar número de WhatsApp, preços, cidades,
 * serviços, perguntas frequentes etc. Nenhum componente precisa ser
 * tocado para atualizar conteúdo.
 */

/**
 * Regras visuais da Viora
 *
 * A logo é exceção ao sistema de cores. O turquesa na ponta da
 * espiral é elemento de marca, não indicação de ação. Nenhuma
 * auditoria de cor deve alterá-la.
 *
 * Turquesa (--aqua):
 * - reservado para ações primárias e elementos interativos de destaque
 *
 * Amarelo (--yellow):
 * - destaca palavras, informações ou seções inteiras
 * - nunca representa ação por si só
 *
 * Roxo (--violet / --ink):
 * - cor estrutural e institucional da marca
 *
 * Branco:
 * - conteúdo, contraste e áreas de respiro
 */

export const site = {
  name: "Viora Higienização",
  shortName: "Viora",
  url: "https://viorahigienizacao.com.br",
  description:
    "Higienização profissional de sofá, colchão, poltrona, tapete e interior de carro, com extração de água, em domicílio em Paulínia e região.",
  locale: "pt_BR",
  instagram: "https://instagram.com/viorahigienizacao",
  instagramHandle: "@viorahigienizacao",

  // Endereço usado no JSON-LD (LocalBusiness). A empresa atende em domicílio,
  // não tem loja física aberta ao público — mesmo assim o Schema.org pede
  // um endereço-base para addressLocality/addressRegion.
  address: {
    locality: "Paulínia",
    region: "SP",
    country: "BR",
  },
} as const;

/**
 * HERO
 * subtitle aparece logo abaixo da headline, no topo da página
 * (components/Hero.tsx).
 *
 * ATENÇÃO — LIMITE DE 2 LINHAS NO MOBILE: no celular, esse texto é cortado
 * em no máximo 2 linhas (CSS line-clamp, sem "...", sem aviso visual — o
 * texto excedente some silenciosamente). Ao editar, mantenha o texto curto
 * o bastante para caber em 2 linhas em uma tela de ~390px de largura
 * (aproximadamente 80 caracteres, dependendo da palavra). No desktop o
 * limite não existe e o texto aparece por inteiro.
 */
export const hero = {
  subtitle: "Extração de água tira ácaro, mancha, pelo de pet e cheiro — seca no mesmo dia.",
} as const;

/**
 * WHATSAPP
 * Troque apenas o número abaixo (formato: 55 + DDD + número, só dígitos).
 * A mensagem padrão é usada quando não há uma mensagem mais específica
 * (ex.: vinda da calculadora de orçamento).
 */
export const whatsapp = {
  number: "5519999999999", // TODO: trocar pelo número real da Viora
  defaultMessage: "Oi! Vim pelo site e queria um orçamento de higienização.",
};

export function buildWhatsAppLink(message?: string): string {
  const text = message && message.trim().length > 0 ? message : whatsapp.defaultMessage;
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/**
 * CIDADES ATENDIDAS
 * Usadas no bloco "Região atendida", no JSON-LD (areaServed) e na
 * calculadora (passo 3 — se a cidade não estiver aqui, a calculadora
 * mostra "consulte pelo WhatsApp" em vez de uma estimativa).
 */
export const cities = [
  "Paulínia",
  "Sumaré",
  "Nova Odessa",
  "Cosmópolis",
  "Campinas",
] as const;

export type City = (typeof cities)[number];

/**
 * SERVIÇOS (seção "Serviços" + hasOfferCatalog no JSON-LD)
 * "priceFrom" é o menor valor praticado para aquele serviço — usado no
 * texto "a partir de R$ X".
 */
export const services = [
  {
    id: "sofa",
    name: "Sofá",
    description: "Higienização profunda com extração de água, para sofás de 2 lugares até retráteis e de canto.",
    priceFrom: 130,
    priceNote: "a partir de",
  },
  {
    id: "poltrona",
    name: "Poltrona",
    description: "Aspiração, produto específico para o tecido e extração da sujeira.",
    priceFrom: 70,
    priceNote: "a partir de",
  },
  {
    id: "cadeiras",
    name: "Cadeiras",
    description: "Cadeiras de jantar ou de escritório, com forro em tecido.",
    priceFrom: 40,
    priceNote: "a partir de, cada",
  },
  {
    id: "colchao",
    name: "Colchão",
    description: "Remove ácaro, suor e manchas, do solteiro ao casal.",
    priceFrom: 110,
    priceNote: "a partir de",
  },
  {
    id: "tapete",
    name: "Tapete",
    description: "Higienização por metro quadrado, com secagem controlada.",
    priceFrom: 30,
    priceNote: "a partir de, por m²",
  },
  {
    id: "carro",
    name: "Interior automotivo",
    description: "Bancos, forro de teto e carpete do carro, de hatch a SUV.",
    priceFrom: 200,
    priceNote: "a partir de",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

/**
 * CALCULADORA DE ORÇAMENTO
 * ------------------------
 * Cada item tem uma faixa de preço (min/max) direta, OU variantes (ex.:
 * sofá de 2 ou 3 lugares) — cada variante tem sua própria faixa.
 * O cálculo final soma (min * quantidade) e (max * quantidade) de cada
 * item escolhido. Ajuste os números aqui para reajustar preços em todo
 * o site (calculadora + seção de serviços continuam independentes —
 * troque "priceFrom" acima também se mudar o valor de entrada).
 */
export type CalculatorVariant = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export type CalculatorItem = {
  id: ServiceId;
  label: string;
  unitLabel: string; // ex.: "sofá", "colchão", "carro"
  hasVariant: boolean;
  variants?: CalculatorVariant[];
  // usado quando o item não tem variantes (ex.: poltrona, cadeira, tapete)
  flat?: { min: number; max: number };
};

export const calculatorItems: CalculatorItem[] = [
  {
    id: "sofa",
    label: "Sofá",
    unitLabel: "sofá",
    hasVariant: true,
    variants: [
      { id: "2-lugares", label: "2 lugares", min: 130, max: 170 },
      { id: "3-lugares", label: "3 lugares", min: 180, max: 230 },
      { id: "retratil-canto", label: "Retrátil ou de canto", min: 220, max: 300 },
    ],
  },
  {
    id: "poltrona",
    label: "Poltrona",
    unitLabel: "poltrona",
    hasVariant: false,
    flat: { min: 70, max: 100 },
  },
  {
    id: "cadeiras",
    label: "Cadeiras",
    unitLabel: "cadeira",
    hasVariant: false,
    flat: { min: 40, max: 55 },
  },
  {
    id: "colchao",
    label: "Colchão",
    unitLabel: "colchão",
    hasVariant: true,
    variants: [
      { id: "solteiro", label: "Solteiro", min: 110, max: 140 },
      { id: "casal", label: "Casal", min: 150, max: 190 },
    ],
  },
  {
    id: "tapete",
    label: "Tapete",
    unitLabel: "tapete",
    hasVariant: true,
    variants: [
      { id: "pequeno", label: "Pequeno (até 2m²)", min: 60, max: 90 },
      { id: "medio", label: "Médio (2 a 6m²)", min: 90, max: 220 },
      { id: "grande", label: "Grande (acima de 6m²)", min: 220, max: 400 },
    ],
  },
  {
    id: "carro",
    label: "Interior automotivo",
    unitLabel: "carro",
    hasVariant: true,
    variants: [
      { id: "hatch", label: "Hatch", min: 180, max: 220 },
      { id: "sedan", label: "Sedã", min: 200, max: 250 },
      { id: "suv", label: "SUV / Camionete", min: 230, max: 300 },
    ],
  },
];

/**
 * ANTES E DEPOIS
 * ---------------
 * Ainda não há fotos reais. Cada caso usa um placeholder gerado em CSS
 * (ver components/BeforeAfterSlider.tsx). Para trocar por fotos reais:
 * 1. Coloque os arquivos em /public/antes-depois/ (ex.: sofa-antes.jpg)
 * 2. Preencha "beforeImage" e "afterImage" abaixo com o caminho
 *    (ex.: "/antes-depois/sofa-antes.jpg")
 * 3. O componente troca automaticamente o placeholder pela <Image> real
 *    assim que os dois campos estiverem preenchidos.
 */
export type BeforeAfterCase = {
  id: string;
  label: string;
  beforeImage: string | null;
  afterImage: string | null;
};

export const beforeAfterCases: BeforeAfterCase[] = [
  { id: "sofa", label: "Sofá", beforeImage: null, afterImage: null },
  { id: "colchao", label: "Colchão", beforeImage: null, afterImage: null },
  { id: "poltrona", label: "Poltrona", beforeImage: null, afterImage: null },
  { id: "carro", label: "Banco de carro", beforeImage: null, afterImage: null },
];

/**
 * "MAIS SUJO DO QUE PARECE"
 * Cards informativos — tom educativo, sem alarmismo, sem alegação médica.
 */
export const dirtFacts = [
  {
    id: "poeira",
    title: "Poeira acumulada",
    description: "Fibras e poeira do dia a dia se depositam nas camadas internas do estofado, fora do alcance do aspirador comum.",
  },
  {
    id: "acaro",
    title: "Ácaro",
    description: "Colchões e sofás usados todos os dias são ambiente favorável para ácaro se acumular ao longo do tempo.",
  },
  {
    id: "residuo",
    title: "Resíduo de suor e gordura",
    description: "O contato diário com a pele deixa resíduos que vão encardindo o tecido aos poucos, mesmo sem mancha visível.",
  },
  {
    id: "pelo",
    title: "Pelo de pet",
    description: "Pelo e caspa de animal se prendem nas fibras do estofado e não saem só com aspiração.",
  },
  {
    id: "odor",
    title: "Odor",
    description: "Cheiro de comida, umidade e uso diário fica retido no tecido, mesmo depois de arejar o ambiente.",
  },
] as const;

/**
 * COMO FUNCIONA
 */
export const howItWorks = [
  {
    step: 1,
    title: "Você manda a foto",
    description: "Pelo WhatsApp. Com a foto e o número de lugares, o orçamento sai na hora.",
  },
  {
    step: 2,
    title: "A gente agenda",
    description: "Você escolhe o dia e o horário. Só precisamos de uma tomada perto do estofado.",
  },
  {
    step: 3,
    title: "Higienização na sua casa",
    description: "Aspiração, produto certo para o tecido e extração da sujeira com água.",
  },
  {
    step: 4,
    title: "Seca no mesmo dia",
    description: "Dá para sentar em 4 a 6 horas. Você vê a água que saiu antes da gente ir embora.",
  },
] as const;

/**
 * POR QUE ESCOLHER A VIORA
 * Pontos honestos — empresa nova, sem depoimentos ou histórico inventado.
 */
export const whyChooseUs = [
  {
    id: "etiqueta",
    title: "Conferimos a etiqueta antes",
    description: "Checamos a etiqueta do fabricante e testamos o produto numa parte escondida do estofado antes de aplicar em tudo.",
  },
  {
    id: "produto",
    title: "Produto específico para cada material",
    description: "Tecido, camurça e couro pedem produtos diferentes. Usamos o certo para o seu.",
  },
  {
    id: "agua",
    title: "Você vê a água que saiu",
    description: "Mostramos a água da extração antes de ir embora — é a sujeira que realmente saiu do estofado.",
  },
  {
    id: "whatsapp",
    title: "Atendimento direto, empresa local",
    description: "Sem central de atendimento. Você fala direto pelo WhatsApp com quem vai até a sua casa.",
  },
] as const;

/**
 * PERGUNTAS FREQUENTES
 * Usado tanto na seção de FAQ quanto no JSON-LD de FAQPage.
 */
export const faq = [
  {
    question: "Quanto tempo demora para secar?",
    answer:
      "Dá para sentar em 4 a 6 horas, e a secagem completa leva até 24 horas. Ajuda deixar uma janela aberta ou um ventilador ligado no ambiente. Evite cobrir com lençol ou capa antes de secar.",
  },
  {
    question: "É seguro para criança e pet?",
    answer:
      "Sim. Usamos produto profissional específico para tecido, com enxágue e extração, e o estofado só volta a ser usado depois de seco. Se houver alergia a fragrância, avise antes que a gente ajusta.",
  },
  {
    question: "Toda mancha sai?",
    answer:
      "A maioria sai. Mancha antiga de tinta, caneta, desbotamento de sol e alguns casos de urina impregnada podem não sair por completo — nesses casos avisamos antes de começar, e não cobramos pelo que não conseguirmos resolver.",
  },
  {
    question: "Serve para qualquer tecido?",
    answer:
      "Antes de aplicar qualquer produto, conferimos a etiqueta do fabricante e fazemos um teste numa parte escondida do estofado. Linho, camurça e outras fibras naturais levam produto de pH neutro. Couro tem tratamento próprio — consulte pelo WhatsApp.",
  },
  {
    question: "De quanto em quanto tempo devo higienizar?",
    answer:
      "A cada 6 meses em casa com criança, pet ou fumante. Em uso normal, uma vez por ano resolve. Colchão segue o mesmo intervalo do sofá.",
  },
  {
    question: "Precisa tirar o sofá do lugar?",
    answer:
      "Não. Afastamos o necessário, protegemos o piso e os móveis próximos, e deixamos tudo no lugar no fim. Só precisamos de uma tomada por perto.",
  },
] as const;

/**
 * AVALIAÇÕES — desativado até haver depoimentos reais.
 * Para ativar: preencha o array abaixo com objetos
 * { name, city, text, rating } e o componente <Reviews /> passa a
 * renderizar automaticamente (ele já não renderiza nada com array vazio).
 */
export type Review = {
  name: string;
  city: string;
  text: string;
  rating: number;
};

export const reviews: Review[] = [];

/**
 * GALERIA DE TRABALHOS — desativado até haver fotos reais.
 * Para ativar: preencha o array abaixo com objetos
 * { image, caption } (imagens em /public/galeria/) e o componente
 * <Gallery /> passa a renderizar automaticamente.
 */
export type GalleryItem = {
  image: string;
  caption: string;
};

export const gallery: GalleryItem[] = [];
