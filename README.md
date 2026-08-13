# Viora Higienização

Landing page única, focada em conversão para WhatsApp, para a Viora Higienização
(higienização de estofados em domicílio em Paulínia/SP e região). Next.js 15 (App
Router) + TypeScript + Tailwind CSS. Site 100% estático — sem CMS, sem banco de
dados, sem backend.

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

### Número de WhatsApp e mensagem padrão

```ts
// config/site.ts
export const whatsapp = {
  number: "5519999999999", // 55 + DDD + número, só dígitos
  defaultMessage: "Oi! Vim pelo site e queria um orçamento de higienização.",
};
```

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

## Domínio e deploy

Projeto pronto para deploy na Vercel, apontando o domínio
`viorahigienizacao.com.br`. `metadataBase`, canonical, sitemap
([`app/sitemap.ts`](app/sitemap.ts)) e robots
([`app/robots.ts`](app/robots.ts)) usam a URL definida em `site.url`
(`config/site.ts`) — troque ali se o domínio mudar.

## Estrutura

```
app/            rotas do App Router (layout, página única, sitemap, robots)
components/     seções da landing page
config/site.ts  todo o conteúdo editável (preços, textos, cidades, WhatsApp)
public/         imagens estáticas (antes/depois, galeria)
```

O arquivo `_reference-static-draft/index.html` é um rascunho estático
anterior, mantido só como referência de conteúdo/paleta — não faz parte do
site em produção e pode ser apagado quando não for mais necessário.
