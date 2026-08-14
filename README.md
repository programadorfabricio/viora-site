# Viora Higienização

Site da Viora Higienização (higienização de estofados em domicílio em
Paulínia/SP e região), focado em conversão para WhatsApp e em SEO local.
Next.js 15 (App Router) + TypeScript + Tailwind CSS. Site 100% estático —
sem CMS, sem banco de dados, sem backend.

11 páginas: a home, 5 páginas de serviço, Preços, Área de atendimento,
Sobre, e um blog com posts em Markdown. Cada página de serviço é
propositalmente diferente das outras — conteúdo específico daquele item,
não um template com a palavra trocada — para não virar doorway page.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Build de produção:

```bash
npm run build
npm run start
```

## O que editar (e onde)

Quase tudo que muda com frequência está em **um único arquivo**:
[`config/site.ts`](config/site.ts). Os componentes leem daqui — não é
necessário mexer em nenhum componente para atualizar conteúdo.

### Regras visuais (cores)

```
A logo é exceção ao sistema de cores. O turquesa na ponta da
espiral é elemento de marca, não indicação de ação. Nenhuma
auditoria de cor deve alterá-la.

Turquesa (--aqua):
- reservado para ações primárias e elementos interativos de destaque

Amarelo (--yellow):
- destaca palavras, informações ou seções inteiras
- nunca representa ação por si só

Roxo (--violet / --ink):
- cor estrutural e institucional da marca

Branco:
- conteúdo, contraste e áreas de respiro
```

Ao adicionar ou editar um componente, mantenha essa regra: turquesa some
sempre que um elemento novo for decorativo em vez de uma ação clicável, e
nunca deixe amarelo virar cor de botão. O mesmo bloco está comentado no
topo de [`config/site.ts`](config/site.ts).

### Número de WhatsApp e mensagem padrão

```ts
// config/site.ts
export const whatsapp = {
  number: "5519999999999", // 55 + DDD + número, só dígitos
  defaultMessage: "Oi! Vim pelo site e queria um orçamento de higienização.",
};
```

### Google Analytics (GA4)

```ts
// config/site.ts
export const analytics = {
  measurementId: "", // TODO: preencher com o Measurement ID do GA4 (G-XXXXXXXXXX)
};
```

Enquanto `measurementId` estiver vazio, nenhum script de analytics é
carregado — o site funciona normalmente, só não há coleta. Preencha com o
Measurement ID do GA4 (Admin > Fluxos de dados, no próprio Google
Analytics) para ativar.

O script carrega via [`components/GoogleAnalytics.tsx`](components/GoogleAnalytics.tsx)
(`next/script`, `strategy="afterInteractive"`). Eventos disparados
automaticamente:

- `whatsapp_click` — todo clique em botão de WhatsApp do site, com
  `{ origem }` sendo `header`, `hero`, `calculadora`, `barra_fixa`,
  `cta_final` ou `rodape`. Centralizado em
  [`components/WhatsAppLink.tsx`](components/WhatsAppLink.tsx) — qualquer
  botão de WhatsApp novo deve usar esse componente em vez de um `<a>` cru,
  para não ficar de fora do tracking.
- `calculadora_concluida` — ao terminar o passo 3 da calculadora (cidade
  escolhida, estimativa gerada), com cidade, se é atendida, quantidade de
  itens e a faixa de valor.
- `faq_abertura` — ao abrir uma pergunta do FAQ (home e páginas de
  serviço), com o texto da pergunta. Centralizado em
  [`components/FaqAccordion.tsx`](components/FaqAccordion.tsx).

### Preços

Dois lugares, propositalmente:

- `services` — os valores mostrados na seção "Serviços" (texto "a partir de R$ X").
- `calculatorItems` — as faixas (mín/máx) usadas pela calculadora de orçamento,
  incluindo variantes (ex.: sofá 2 lugares / 3 lugares / retrátil).

Atualize os dois se o preço de um serviço mudar.

### Cidades atendidas

```ts
export const cities = ["Paulínia", "Sumaré", "Nova Odessa", "Cosmópolis", "Campinas"];
```

Usadas na seção "Região atendida", no JSON-LD e na calculadora (cidade fora
da lista mostra "Consulte pelo WhatsApp" em vez de uma estimativa).

### Perguntas frequentes

Array `faq` em `config/site.ts` — alimenta tanto a seção de FAQ quanto o
JSON-LD de `FAQPage` automaticamente.

### Imagens de antes/depois

Ainda não há fotos reais — o slider usa placeholders gerados em CSS
(tecido "sujo" vs "limpo"). Para trocar por fotos reais:

1. Coloque os arquivos em `public/antes-depois/` (ex.: `sofa-antes.jpg`,
   `sofa-depois.jpg`).
2. Em `config/site.ts`, preencha `beforeImage` e `afterImage` do caso
   correspondente em `beforeAfterCases`, com o caminho começando em `/`
   (ex.: `/antes-depois/sofa-antes.jpg`).
3. Pronto — o componente [`components/BeforeAfterSlider.tsx`](components/BeforeAfterSlider.tsx)
   troca o placeholder pela imagem real automaticamente assim que os dois
   campos de um caso estiverem preenchidos.

### Avaliações e Galeria (desativadas por padrão)

Os componentes [`components/Reviews.tsx`](components/Reviews.tsx) e
[`components/Gallery.tsx`](components/Gallery.tsx) já existem prontos, mas
não renderizam nada enquanto os arrays `reviews` e `gallery` em
`config/site.ts` estiverem vazios (seção vazia é pior que seção ausente).

Para ativar:

- **Avaliações**: preencha `reviews` com objetos `{ name, city, text, rating }`.
- **Galeria**: coloque fotos em `public/galeria/` e preencha `gallery` com
  objetos `{ image, caption }`.

Assim que o array tiver itens, a seção aparece sozinha — não precisa editar
os componentes nem `app/page.tsx`.

### Páginas de serviço (`/servicos/...`)

As 5 páginas de serviço usam **um único template**
([`app/servicos/[slug]/page.tsx`](app/servicos/%5Bslug%5D/page.tsx)) e um
arquivo de conteúdo cada, em `content/services/` (`sofa.ts`, `colchao.ts`,
`poltronas-cadeiras.ts`, `tapetes.ts`, `automotiva.ts`). Para editar o texto
de uma página de serviço, edite o arquivo correspondente — título, textos,
FAQ e mensagem do WhatsApp estão todos ali. Preço **não** fica nesses
arquivos: a página busca em `calculatorItems` (`config/site.ts`) pelos
`serviceIds` declarados, para nunca ter o mesmo número em dois lugares.

Textos que contêm link interno usam a sintaxe `[texto](/rota)` (ver
[`components/RichText.tsx`](components/RichText.tsx)) — é assim que os
links ficam em texto corrido, sem virar bloco de "veja também".

### Páginas institucionais (`/precos`, `/area-de-atendimento`, `/sobre`)

Cada uma tem seu próprio `page.tsx` em `app/`, e o texto vem de
`content/pages/{precos,area-de-atendimento,sobre}.ts`. Preços e cidades
continuam vindo de `config/site.ts`, não desses arquivos.

### Blog

Os posts ficam em `content/blog/*.md` — Markdown puro com frontmatter
(`title`, `slug`, `description`, `date`) no topo do arquivo. Para adicionar
um post novo, crie um `.md` nessa pasta; ele aparece sozinho em `/blog` e
ganha uma URL `/blog/[slug]` automaticamente — não precisa editar nenhum
componente ou a lista de rotas. O parsing é feito por
[`lib/blog.ts`](lib/blog.ts) (`gray-matter` + `marked`).

### Política de Privacidade

Texto em [`content/pages/politica-de-privacidade.ts`](content/pages/politica-de-privacidade.ts),
página em `/politica-de-privacidade`. É `noindex` de propósito (não tem
valor de busca) — por isso não entra em `sitemap.ts`, mas continua acessível
pelo link no rodapé, presente em todas as páginas. Se os dados coletados,
a finalidade ou o e-mail de contato mudarem, atualize esse arquivo — não é
gerado a partir de nenhuma outra fonte.

## Domínio e deploy

Projeto pronto para deploy na Vercel, apontando o domínio
`viorahigienizacao.com.br`. `metadataBase`, canonical, sitemap
([`app/sitemap.ts`](app/sitemap.ts)) e robots
([`app/robots.ts`](app/robots.ts)) usam a URL definida em `site.url`
(`config/site.ts`) — troque ali se o domínio mudar.

## Estrutura

```
app/                    rotas do App Router — layout raiz (Header/Footer/GA4),
                         home, /servicos/[slug], /precos, /area-de-atendimento,
                         /sobre, /blog, /blog/[slug], /politica-de-privacidade,
                         sitemap, robots
components/              seções e componentes de UI reutilizáveis, incluindo
                         WhatsAppLink.tsx (todo botão de WhatsApp) e
                         FaqAccordion.tsx (todo FAQ) — ambos já com tracking
content/services/        conteúdo das 5 páginas de serviço (um arquivo cada)
content/pages/           conteúdo de /precos, /area-de-atendimento, /sobre,
                         /politica-de-privacidade
content/blog/            posts do blog em Markdown (frontmatter + prosa)
lib/blog.ts              leitura e parsing dos posts (gray-matter + marked)
lib/analytics.ts         helper de tracking (trackEvent) usado pelo GA4
config/site.ts           conteúdo global editável (preços, cidades, WhatsApp,
                         GA4, regras de cor) — services e cities são a fonte
                         única de verdade, lida por várias páginas
public/                  imagens estáticas (antes/depois, galeria, ícones)
```
