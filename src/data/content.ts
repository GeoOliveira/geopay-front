export type Plan = {
  id: string;
  label: string;
  fee: string;
  unit: string;
  sub: string;
  features: string[];
  featured?: boolean;
  cta: string;
  illustrative?: boolean;
};

// Valores de exemplo. Serão substituídos pelos planos do backend quando GEOPAY_API_URL estiver definido.
export const FALLBACK_PLANS: Plan[] = [
  {
    id: "pix",
    illustrative: true,
    label: "PIX",
    fee: "R$ 0,49",
    unit: "/transação",
    sub: "taxa fixa · in & out",
    features: ["Envio Pix por chave", "Consulta por código de autenticação", "Condições e limites a confirmar", "Tarifas sujeitas à contratação"],
    cta: "Começar",
  },
  {
    id: "negocios",
    illustrative: true,
    label: "NEGÓCIOS",
    fee: "0,69%",
    unit: "/venda",
    sub: "para lojas e e-commerces",
    features: ["Operações Pix por GraphQL", "Integração WooCommerce", "Acesso à API mediante habilitação", "Conciliação de pedidos", "Condições sujeitas à contratação"],
    featured: true,
    cta: "Escolher Negócios →",
  },
  {
    id: "boleto",
    illustrative: true,
    label: "BOLETO",
    fee: "R$ 2,99",
    unit: "/boleto pago",
    sub: "recebimento D+1",
    features: ["Boleto registrado", "Emissão por API ou painel", "Multa e juros configuráveis", "Baixa automática"],
    cta: "Começar",
  },
];

export const FAQ = [
  ["O que é um gateway de pagamento Pix?", "É uma plataforma que conecta o negócio à infraestrutura de pagamentos. O guia da Geopay descreve envio e consulta Pix por GraphQL e o processamento de confirmações bancárias para conciliar pedidos."],
  ["Quais documentos preciso para abrir conta?", "Pessoa física: documento com foto, CPF, comprovante de residência e selfie. Pessoa jurídica: cartão CNPJ, contrato social e documentos dos sócios e representantes legais."],
  ["Em quanto tempo o dinheiro fica disponível?", "Pagamentos via Pix são confirmados em segundos e o saldo fica disponível na hora para saque (D+0). Boletos compensam em D+1."],
  ["A Geopay é um banco?", "Não. A Geopay é uma plataforma de pagamentos que opera sobre infraestrutura bancária regulada, oferecendo conta nominal em seu nome."],
  ["Posso abrir conta como MEI?", "Sim. Atendemos pessoas físicas, MEI e empresas de todos os portes."],
  ["Como integro com minha loja?", "Consulte o guia Pix para conhecer o envio e a consulta por GraphQL e a conciliação de pedidos WooCommerce. Solicite à equipe o endpoint e um ambiente autorizado para validar a integração."],
  ["Não recebi o código de verificação. E agora?", "Confira a caixa de spam e o número cadastrado. Você pode solicitar um novo código por SMS ou e-mail na tela de login."],
  ["Existe mensalidade ou taxa de adesão?", "Não. Você paga apenas uma tarifa por transação recebida."],
] as const;

export const LINKS = {
  signup: "https://app.geopay.digital/pre-registration",
  login: "https://app.geopay.digital/",
  docs: process.env.NEXT_PUBLIC_DOCS_URL || "/docs",
};

// Dados institucionais usados nas páginas legais e de atendimento.
export const COMPANY = {
  name: "Geopay",
  cnpj: "51.274.896/0001-38",
  site: "geopay.digital",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "suporte@geopay.digital",
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "privacidade@geopay.digital",
  complianceEmail: process.env.NEXT_PUBLIC_COMPLIANCE_EMAIL ?? "denuncia@geopay.digital",
};
