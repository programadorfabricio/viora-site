import type { InstitutionalPageContent } from "@/content/types";

const politicaDePrivacidade: InstitutionalPageContent = {
  slug: "politica-de-privacidade",
  metaTitle: "Política de Privacidade | Viora Higienização",
  metaDescription:
    "Como a Viora Higienização trata os dados de quem visita o site e entra em contato pelo WhatsApp, conforme a LGPD (Lei 13.709/2018).",
  eyebrow: "Privacidade",
  h1: "Política de Privacidade.",
  lead:
    "Este documento explica, em linguagem simples, quais dados o site viorahigienizacao.com.br trata, para quê, e quais são os seus direitos como titular desses dados, conforme a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).",
  sections: [
    {
      title: "Quem é o controlador",
      paragraphs: [
        "A Viora Higienização, empresa de higienização de estofados em domicílio em Paulínia/SP e região, é a controladora dos dados tratados através deste site e do WhatsApp usado para atendimento. Dúvidas ou pedidos relacionados a dados pessoais podem ser enviados para contato@viorahigienizacao.com.br.",
      ],
    },
    {
      title: "Quais dados tratamos",
      paragraphs: [
        "O site em si é estático — não tem cadastro, login nem formulário que envie dados para um servidor nosso. Os dados abaixo só chegam até a Viora quando você decide entrar em contato:",
      ],
      list: [
        "Nome — geralmente o nome do seu perfil de WhatsApp, ou o que você informar na conversa.",
        "Telefone — o número do WhatsApp usado para falar com a gente.",
        "Cidade — quando informada na calculadora de orçamento ou na própria conversa.",
        "Itens e escolhas da calculadora de orçamento — tipo de estofado, tamanho e a estimativa de valor, quando você opta por enviar essas informações pelo WhatsApp.",
        "Dados técnicos de navegação — páginas visitadas, tipo de dispositivo e origem do acesso, coletados de forma automática pelo Google Analytics.",
      ],
    },
    {
      title: "Como esses dados chegam até nós",
      paragraphs: [
        "A calculadora de orçamento roda inteiramente no seu navegador: os itens e a cidade que você escolhe não são enviados a nenhum servidor nosso automaticamente, e não ficam salvos no seu navegador depois que você fecha a página. Esses dados só chegam até a Viora se você clicar no botão que abre o WhatsApp com a mensagem já preenchida — a partir daí, a conversa acontece dentro do WhatsApp, não no site.",
        "Além disso, o Google Analytics coleta automaticamente alguns dados técnicos de navegação enquanto você usa o site, para nos ajudar a entender como as páginas são usadas.",
      ],
    },
    {
      title: "Para que usamos esses dados",
      paragraphs: [
        "Nome, telefone, cidade e as escolhas da calculadora são usados para responder sua mensagem, calcular e confirmar um orçamento, e agendar o serviço. Os dados de navegação do Google Analytics são usados de forma agregada, para entender quais páginas funcionam melhor e melhorar o site — não usamos esses dados para identificar você individualmente.",
      ],
    },
    {
      title: "Base legal (LGPD)",
      paragraphs: [
        "O tratamento dos dados de contato (nome, telefone, cidade, itens do orçamento) se baseia na execução de procedimentos preliminares a um possível contrato de prestação de serviço, conforme o artigo 7º, inciso V, da LGPD — ou seja, você inicia o contato buscando um orçamento, e tratamos esses dados para atender esse pedido.",
        "O tratamento dos dados de navegação pelo Google Analytics se baseia no legítimo interesse da Viora em entender e melhorar o site, conforme o artigo 7º, inciso IX, da LGPD, sempre respeitando seus direitos como titular.",
      ],
    },
    {
      title: "WhatsApp e Meta",
      paragraphs: [
        "O atendimento acontece pelo WhatsApp, aplicativo de propriedade da Meta Platforms. Ao iniciar uma conversa conosco, você também está sujeito à política de privacidade do próprio WhatsApp/Meta, que é uma empresa independente da Viora. Recomendamos consultar a política de privacidade do WhatsApp para entender como a Meta trata os dados da conversa.",
      ],
    },
    {
      title: "Google Analytics",
      paragraphs: [
        "Usamos o Google Analytics (GA4) para entender, de forma agregada, como as pessoas navegam pelo site. O Google pode usar cookies e tecnologias semelhantes para essa coleta, conforme a própria política de privacidade do Google. Você pode bloquear ou limitar essa coleta usando as configurações de cookies do seu navegador, ou extensões como o complemento de desativação do Google Analytics.",
      ],
    },
    {
      title: "Por quanto tempo guardamos os dados",
      paragraphs: [
        "Conversas de WhatsApp são mantidas pelo tempo necessário para o atendimento e, quando o serviço é realizado, pelo prazo usual de guarda de registros comerciais. Dados de navegação do Google Analytics seguem os prazos de retenção padrão da própria plataforma. Você pode pedir a exclusão dos seus dados a qualquer momento, conforme a seção de direitos abaixo.",
      ],
    },
    {
      title: "Com quem compartilhamos",
      paragraphs: [
        "Não vendemos nem alugamos dados pessoais para terceiros. Os dados que tratamos passam apenas pelo WhatsApp/Meta (para a conversa em si) e pelo Google Analytics (para estatísticas de navegação) — ambos operados por essas empresas conforme suas próprias políticas de privacidade.",
      ],
    },
    {
      title: "Seus direitos como titular",
      paragraphs: ["Conforme a LGPD, você pode solicitar a qualquer momento, pelo e-mail contato@viorahigienizacao.com.br:"],
      list: [
        "Confirmação de que tratamos ou não os seus dados.",
        "Acesso aos dados que temos sobre você.",
        "Correção de dados incompletos, desatualizados ou incorretos.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei.",
        "Portabilidade dos dados a outro fornecedor de serviço.",
        "Eliminação dos dados tratados com o seu consentimento.",
        "Informação sobre com quem compartilhamos seus dados.",
        "Revogação do consentimento, quando o tratamento depender dele.",
      ],
    },
    {
      title: "Segurança",
      paragraphs: [
        "Adotamos medidas razoáveis para proteger os dados que tratamos, mas nenhum sistema de transmissão ou armazenamento de dados é 100% seguro — isso vale para qualquer site ou aplicativo, incluindo o WhatsApp.",
      ],
    },
    {
      title: "Alterações desta política",
      paragraphs: [
        "Esta política pode ser atualizada sempre que necessário, para refletir mudanças no site ou na legislação. A versão em vigor é sempre a publicada nesta página.",
        "Última atualização: agosto de 2026.",
      ],
    },
  ],
};

export default politicaDePrivacidade;
