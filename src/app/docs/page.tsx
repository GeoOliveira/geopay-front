import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Integração Pix · Documentação provisória | Geopay",
  description: "Guia provisório de integração Pix da Geopay: acesso, operações GraphQL, exemplos e definições pendentes de homologação.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Integração Pix · Documentação provisória | Geopay",
    description: "Prepare sua integração Pix com exemplos GraphQL e acompanhe as definições pendentes de homologação.",
    url: "/docs",
  },
};

const navigation = [
  ["visao-geral", "Visão geral"],
  ["primeiros-passos", "Primeiros passos"],
  ["autenticacao", "Acesso e autenticação"],
  ["receber", "Receber um Pix"],
  ["enviar", "Enviar um Pix"],
  ["consultar", "Consultar um Pix"],
  ["confirmacao", "Confirmação e estados"],
  ["erros", "Erros e tentativas"],
  ["pendencias", "Definições pendentes"],
] as const;

const loginOperation = `mutation Entrar($email: String!, $password: String!) {
  loginBusinessOwner(email: $email, password: $password) {
    __typename
    ... on LoggedUserOutput {
      accessToken
      hasBankAccount
    }
    ... on Error {
      code
      message
    }
  }
}`;

const sendOperation = `mutation EnviarPix($input: SendPixPaymentRequest!) {
  sendPixPayment(input: $input) {
    __typename
    ... on PixPaymentDone {
      authenticationCode
      amount
      recipient {
        name
      }
    }
    ... on Error {
      code
      message
    }
  }
}`;

const sendVariables = JSON.stringify({
  input: {
    amount: 49.9,
    pixKey: "recebedor@example.com",
    description: "Pedido exemplo",
    initializationType: "Key",
  },
}, null, 2);

const findOperation = `query ConsultarPix($input: FindPixsByAuthCodeRequest!) {
  findPixByAuth(input: $input) {
    __typename
    ... on PixByAuthCode {
      authenticationCode
      endToEndId
      amount
      status
      createdAt
      updatedAt
    }
    ... on Error {
      code
      message
    }
  }
}`;

const findRequest = JSON.stringify({
  query: findOperation,
  variables: { input: { authCode: "<AUTHENTICATION_CODE_RETORNADO_NO_ENVIO>" } },
}, null, 2);

const errorResponse = JSON.stringify({
  errors: [{
    code: "PAYMENT.USER_BANK_ACCOUNT_NOT_FOUND",
    message: "Business Owner bank account not found.",
    __typename: "Error",
  }],
  data: null,
}, null, 2);

const handleResponse = `const response = await fetch(process.env.GEOPAY_GRAPHQL_URL, {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.GEOPAY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query, variables }),
});
const body = await response.json();
if (!response.ok) throw new Error("Falha HTTP: " + response.status);
if (body.errors?.length) {
  const error = body.errors[0];
  const code = error.code ?? error.extensions?.code ?? "GRAPHQL.ERROR";
  throw new Error(code + ": " + error.message);
}
const result = body.data?.findPixByAuth;
if (!result) throw new Error("Consulta sem resultado.");
if (result.__typename === "Error") {
  throw new Error(result.code + ": " + result.message);
}
if (result.__typename !== "PixByAuthCode") {
  throw new Error("Tipo de resposta inesperado.");
}
console.log(result.authenticationCode, result.status);`;

const quickStartExample = `// Node.js 18+ · executar no servidor da integração
// Configure o endpoint completo e o JWT do ambiente autorizado.
const query = ${JSON.stringify(findOperation)};
const variables = {
  input: { authCode: "<CODIGO_DE_AUTENTICACAO_DO_AMBIENTE_DE_TESTES>" },
};
${handleResponse}`;

function Operation({ type, name, children }: { type: "QUERY" | "MUTATION"; name: string; children: React.ReactNode }) {
  return (
    <div className={styles.endpoint}>
      <div className={styles.endpointTitle}><span className={type === "QUERY" ? styles.get : styles.post}>{type}</span><code>{name}</code></div>
      <p>{children}</p>
    </div>
  );
}

function Example({ title, children }: { title: string; children: string }) {
  return (
    <div className={styles.example}>
      <div className={styles.exampleTitle}><span>{title}</span><span>EXEMPLO</span></div>
      <pre tabIndex={0} aria-label={title}><code>{children}</code></pre>
    </div>
  );
}

export default function PixDocsPage() {
  return (
    <PageShell crumb="Documentação" kicker="Integração Pix · Guia provisório"
      title={<>Prepare sua integração.<br /><span className="hl">Acompanhe a evolução.</span></>}
      lead="Referência provisória para planejar sua integração Pix. O backend está em desenvolvimento, e as operações e regras de pagamento e recebimento ainda podem mudar."
      meta={["VERSÃO PROVISÓRIA 0.1", "GRAPHQL", "PT-BR"]}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p>NESTE GUIA</p>
          <nav aria-label="Navegação da documentação Pix" className={styles.navigation}>
            {navigation.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}
          </nav>
          <div className={styles.help}><b>Precisa de ajuda?</b><p>Fale com a equipe para obter acesso e validar sua integração.</p><Link href="/contato">Entrar em contato ↗</Link></div>
        </aside>

        <article className={styles.content}>
          <section id="visao-geral" className={styles.section}>
            <span className={styles.kicker}>01 / VISÃO GERAL</span>
            <div className={styles.note}><b>Documentação provisória · versão 0.1</b><p>Revisada em <time dateTime="2026-11-26">26/11/2026</time>. Os exemplos refletem o código local em desenvolvimento e servem para preparar a integração. Eles não comprovam disponibilidade em produção nem definem um contrato estável. Confirme a versão deste guia com a equipe antes de homologar ou publicar sua integração.</p></div>
            <h2>Um fluxo, duas direções.</h2>
            <p>O envio Pix é iniciado pela operação <code>sendPixPayment</code>. A consulta <code>findPixByAuth</code> acompanha uma transferência pelo código de autenticação. No recebimento, a confirmação bancária é processada para conciliar o pedido relacionado.</p>
            <div className={styles.cards}>
              <a href="#receber" className={styles.card}><span>↙ CASH-IN</span><h3>Receber</h3><p>Entenda como a confirmação bancária é relacionada ao pedido e à loja.</p><b>Conhecer o fluxo →</b></a>
              <a href="#enviar" className={styles.card}><span>↗ CASH-OUT</span><h3>Enviar</h3><p>Envie por chave Pix e guarde o código para consultar o resultado.</p><b>Conhecer o fluxo →</b></a>
            </div>
            <div className={styles.note}><b>Contrato de referência: GraphQL.</b><p>Este guia foi revisado com base na implementação local disponível. O endereço e o schema da API em produção ainda precisam de homologação. Solicite à equipe o endpoint completo do ambiente autorizado, incluindo <code>/graphql</code>, antes de integrar.</p></div>
            <p className={styles.caption}>Os exemplos são fictícios e não executam operações. As demonstrações da página inicial não substituem o contrato apresentado neste guia.</p>
          </section>

          <section id="primeiros-passos" className={styles.section}>
            <span className={styles.kicker}>02 / PRIMEIROS PASSOS</span>
            <h2>Prepare o cliente da integração.</h2>
            <ol className={styles.steps}>
              <li><b>Solicite acesso ao ambiente de testes.</b><p>A equipe precisa confirmar o endpoint completo, a conta autorizada e quais operações estão habilitadas. Os endereços e identificadores deste guia são referências; não utilize credenciais de produção para ensaiar os exemplos.</p></li>
              <li><b>Implemente as chamadas no seu servidor.</b><p>Use HTTPS e mantenha senha e JWT fora do código público, do navegador e dos logs. Envie as operações como JSON, com <code>query</code> e <code>variables</code>.</p></li>
              <li><b>Autentique e valide uma consulta.</b><p>Obtenha o JWT com <a href="#autenticacao">a operação de acesso</a>. Solicite um código de autenticação de uma transferência de teste já existente para validar <code>findPixByAuth</code>.</p></li>
              <li><b>Homologue o envio separadamente.</b><p>Prepare <code>sendPixPayment</code>, o armazenamento do código retornado e o tratamento de falhas. Execute um envio somente após a liberação explícita do ambiente e do cenário de teste pela equipe.</p></li>
            </ol>
            <details className={styles.details}><summary>Ver exemplo completo de consulta em Node.js</summary>
              <p>Configure <code>GEOPAY_GRAPHQL_URL</code> com o endpoint completo e <code>GEOPAY_ACCESS_TOKEN</code> com o JWT obtido no ambiente autorizado. Substitua o código fictício por um identificador de teste. Este exemplo faz apenas uma consulta, sem iniciar um Pix.</p>
              <Example title="Cliente Node.js · consulta Pix">{quickStartExample}</Example>
            </details>
            <div className={styles.note}><b>Recebimentos ainda exigem definição do fluxo.</b><p>A criação de cobranças e QR Codes não está disponível no contrato descrito aqui. A seção <a href="#receber">Receber um Pix</a> apresenta apenas a conciliação existente no código local. Use a lista de <a href="#pendencias">definições pendentes</a> para acompanhar o que falta homologar.</p></div>
          </section>

          <section id="autenticacao" className={styles.section}>
            <span className={styles.kicker}>03 / ACESSO E AUTENTICAÇÃO</span>
            <h2>Uma API, operações GraphQL.</h2>
            <p>Envie as operações por <code>POST /graphql</code>, em um corpo JSON com <code>query</code> e <code>variables</code>. Use o endereço base fornecido para seu ambiente.</p>
            <p>Nos exemplos de código, <code>GEOPAY_GRAPHQL_URL</code> representa o endpoint completo fornecido pela equipe, e <code>GEOPAY_ACCESS_TOKEN</code> representa o JWT da conta. Esses nomes são variáveis da sua integração. Para testes, solicite um ambiente autorizado; esta página não é um sandbox e não realiza chamadas bancárias.</p>
            <Operation type="MUTATION" name="loginBusinessOwner">Recebe e-mail e senha. Quando o resultado é <code>LoggedUserOutput</code>, o campo <code>accessToken</code> contém o JWT usado nas operações protegidas.</Operation>
            <details className={styles.details}><summary>Ver operação de autenticação</summary>
              <Example title="Login · GraphQL">{loginOperation}</Example>
              <Example title="Variáveis do login · JSON">{JSON.stringify({ email: "lojista@example.com", password: "<SENHA_DA_CONTA>" }, null, 2)}</Example>
            </details>
            <details className={styles.details}><summary>Ver corpo HTTP completo do login</summary>
              <p>Envie este JSON ao endpoint GraphQL autorizado, com <code>Content-Type: application/json</code>. O login recebe as credenciais no corpo e não exige um JWT anterior. Substitua os valores fictícios pelas credenciais da conta de teste.</p>
              <Example title="POST /graphql · login JSON">{JSON.stringify({ query: loginOperation, variables: { email: "lojista@example.com", password: "<SENHA_DA_CONTA_DE_TESTE>" } }, null, 2)}</Example>
            </details>
            <Example title="Cabeçalhos das operações Pix">{"Authorization: Bearer <ACCESS_TOKEN>\nContent-Type: application/json"}</Example>
            <p>O envio e a consulta exigem JWT válido. O backend também utiliza a sessão bancária da conta, mantida no servidor. Ter um JWT não garante que essa sessão bancária esteja disponível.</p>
            <h3>Validade e recuperação do acesso</h3>
            <p>Na implementação analisada, o JWT expira em duas horas, e os dados da sessão bancária são armazenados por até duas horas após o login. A sessão do parceiro pode deixar de ser válida antes desse prazo. O campo <code>hasBankAccount</code> informa a existência de conta vinculada; ele não comprova que a sessão bancária está operacional.</p>
            <p>Se a sessão expirar, autentique novamente para obter outro JWT e restabelecer a sessão bancária. Depois de uma falha ou tempo esgotado no envio, recupere o acesso e consulte a transferência pelo código de autenticação antes de decidir por outra tentativa. Um novo login não desfaz um Pix já solicitado.</p>
            <p>Não envie senha nas operações Pix, nem exponha tokens do parceiro bancário. Este contrato não utiliza versionamento pelo cabeçalho <code>version</code>. Utilize as operações GraphQL deste guia como referência para a integração.</p>
          </section>

          <section id="receber" className={styles.section}>
            <span className={styles.kicker}>04 / RECEBIMENTO</span>
            <h2>Relacione pagamento e pedido.</h2>
            <ol className={styles.steps}>
              <li><b>O cliente realiza o pagamento Pix.</b><p>O pedido precisa estar relacionado ao identificador de pagamento utilizado pela integração.</p></li>
              <li><b>A Geopay recebe a confirmação bancária.</b><p>O evento Pix de liquidação entra em uma fila para processamento.</p></li>
              <li><b>O processamento confere o pedido.</b><p>O identificador de conciliação localiza o carrinho, que deve estar em processamento. O valor recebido também é conferido.</p></li>
              <li><b>A loja e o registro local são atualizados.</b><p>Após a atualização do pedido WooCommerce, o carrinho é marcado como concluído e recebe a data de pagamento.</p></li>
            </ol>
            <div className={styles.note}><b>Geração de QR Code</b><p>Não há operação de emissão de QR Code estático ou dinâmico exposta no contrato analisado. Este guia documenta a confirmação de recebimentos; não fornece um endpoint de criação de cobrança.</p></div>
            <p>O processamento relaciona <code>data.channel.receiverReconciliationId</code> do evento bancário ao <code>paymentIdentifier</code> do carrinho. Esses campos pertencem à conciliação do recebimento, não à entrada de <code>sendPixPayment</code>.</p>
          </section>

          <section id="enviar" className={styles.section}>
            <span className={styles.kicker}>05 / ENVIO</span>
            <h2>Envie por chave Pix.</h2>
            <Operation type="MUTATION" name="sendPixPayment(input: SendPixPaymentRequest!)">Inicia o envio a partir da conta autenticada. O backend consulta a chave destinatária e obtém os dados bancários necessários antes de solicitar a transferência.</Operation>
            <div className={styles.tableWrap}><table><caption>Campos de SendPixPaymentRequest</caption><thead><tr><th scope="col">Campo</th><th scope="col">Contrato</th></tr></thead><tbody>
              <tr><td><code>amount</code></td><td><code>Float!</code> obrigatório. Valor positivo em reais, de pelo menos R$ 0,01, com no máximo duas casas decimais e sem símbolo de moeda.</td></tr>
              <tr><td><code>pixKey</code></td><td><code>String!</code> obrigatória. Chave Pix do destinatário.</td></tr>
              <tr><td><code>description</code></td><td>Texto opcional. Padrão: string vazia.</td></tr>
              <tr><td><code>initializationType</code></td><td>Texto opcional, com padrão <code>Key</code>. O fluxo descrito aqui é o envio por chave.</td></tr>
            </tbody></table></div>
            <Example title="Envio Pix · GraphQL">{sendOperation}</Example>
            <Example title="Variáveis do envio · JSON">{sendVariables}</Example>
            <details className={styles.details}><summary>Ver corpo HTTP completo do envio</summary>
              <p>Use o JWT nos cabeçalhos apresentados na seção de autenticação. Este exemplo inicia uma transferência quando executado contra uma API habilitada; prepare-o para homologação e não o envie para produção como teste.</p>
              <Example title="POST /graphql · envio JSON">{JSON.stringify({ query: sendOperation, variables: JSON.parse(sendVariables) }, null, 2)}</Example>
            </details>
            <p>Não envie <code>sender</code> ou <code>endToEndId</code> no input. O backend monta o remetente a partir da conta autenticada e obtém o identificador na consulta da chave Pix.</p>
            <h3>Como ler o retorno</h3>
            <p>O schema declara a união <code>PixPaymentDone</code> ou <code>Error</code>. O sucesso expõe <code>authenticationCode</code>, <code>amount</code> como texto e <code>recipient</code>. Porém, a classe de erro usada pelo backend deriva de <code>GraphQLError</code>: as falhas desse fluxo podem aparecer no campo <code>errors</code>, com <code>data: null</code>, em vez de retornar como um objeto da união. Verifique <code>errors</code> antes de acessar <code>data</code> ou <code>__typename</code>.</p>
            <div className={styles.note}><b>Guarde o código de autenticação.</b><p>Use o <code>authenticationCode</code> retornado no campo <code>authCode</code> da consulta. A resposta de envio não expõe um campo <code>status</code>; consulte a transferência para acompanhar o estado informado pelo parceiro.</p></div>
          </section>

          <section id="consultar" className={styles.section}>
            <span className={styles.kicker}>06 / ACOMPANHAMENTO</span>
            <h2>Consulte pelo código de autenticação.</h2>
            <Operation type="QUERY" name="findPixByAuth(input: FindPixsByAuthCodeRequest!)">Recebe <code>authCode</code> e consulta a transferência no parceiro bancário, utilizando a conta da sessão.</Operation>
            <Example title="Consulta Pix · GraphQL">{findOperation}</Example>
            <Example title="Variáveis da consulta · JSON">{JSON.stringify({ input: { authCode: "<AUTHENTICATION_CODE_RETORNADO_NO_ENVIO>" } }, null, 2)}</Example>
            <details className={styles.details}><summary>Ver corpo HTTP completo da consulta</summary><Example title="POST /graphql · JSON">{findRequest}</Example></details>
            <p>Em caso de sucesso, o tipo retornado é <code>PixByAuthCode</code>. O campo <code>status</code> é texto vindo do parceiro; o contrato não define um enum de estados bancários. O <code>amount</code> dessa consulta é uma string formatada em reais, não um número para cálculos.</p>
            <p><code>authenticationCode</code> identifica a operação consultada. <code>endToEndId</code> identifica o Pix de ponta a ponta, e <code>correlationId</code> auxilia o rastreamento. Não use esses identificadores como se fossem intercambiáveis.</p>
            <Operation type="QUERY" name="listPixContacts">Consulta contatos Pix da conta. Não representa um extrato nem substitui a consulta de uma transferência.</Operation>
          </section>

          <section id="confirmacao" className={styles.section}>
            <span className={styles.kicker}>07 / CONFIRMAÇÃO</span>
            <h2>O evento concilia o recebimento.</h2>
            <div className={styles.flow} aria-label="Fluxo de confirmação do recebimento Pix"><span>Parceiro bancário</span><span aria-hidden="true">→</span><span>Webhook autenticado</span><span aria-hidden="true">→</span><span>Fila de processamento</span><span aria-hidden="true">→</span><span>Pedido conciliado</span></div>
            <p>O endpoint <code>POST /webhook</code> recebe uma lista de eventos e exige autenticação específica para webhooks. Ele é destinado à integração bancária, não ao envio de confirmações pelo navegador ou pelo lojista.</p>
            <h3><code>PIX_CASH_IN_WAS_CLEARED</code></h3>
            <p>É o evento Pix tratado pelo worker analisado. Ele localiza o carrinho pelo identificador de conciliação, exige estado <code>PROCESSING</code> e aceita valor recebido com diferença de até R$ 0,10 em relação ao total do carrinho.</p>
            <p>O recebimento aguarda a confirmação de inclusão dos eventos na fila. Se a inclusão falhar, a requisição falha; o processamento do pedido ocorre depois. Quando as verificações passam, o worker atualiza o pedido WooCommerce para <code>completed</code>. Em seguida, grava <code>COMPLETED</code> e <code>paidAt</code> no carrinho local. A fila está configurada para até cinco tentativas de processamento. A confirmação de inclusão não garante processamento único: reenvios e falhas parciais precisam de conciliação.</p>
            <h3>Estado do pedido e estado bancário</h3>
            <div className={styles.tableWrap}><table><caption>Estados locais de pagamento do pedido</caption><thead><tr><th scope="col">Estado</th><th scope="col">Significado</th></tr></thead><tbody>
              <tr><td><code>PENDING</code></td><td>Pagamento pendente.</td></tr>
              <tr><td><code>PROCESSING</code></td><td>Pagamento em processamento; é o estado exigido para a conciliação Pix pelo worker.</td></tr>
              <tr><td><code>COMPLETED</code></td><td>Pedido marcado como pago após o processamento da confirmação.</td></tr>
              <tr><td><code>CANCELLED</code></td><td>Pedido cancelado. Sua presença no modelo não significa que o worker Pix execute essa transição.</td></tr>
            </tbody></table></div>
            <p>Esses estados são do pedido e não definem os valores de <code>status</code> retornados por <code>findPixByAuth</code>. O worker analisado não trata eventos Pix de saída, cancelamento, desfazimento ou devolução.</p>
            <p>Receber a requisição HTTP do webhook não comprova que o pedido já foi conciliado: o processamento acontece na fila e pode falhar. Este contrato também não define um webhook de saída configurável para cada lojista.</p>
          </section>

          <section id="erros" className={styles.section}>
            <span className={styles.kicker}>08 / ERROS E TENTATIVAS</span>
            <h2>Confira o resultado da operação.</h2>
            <ul className={styles.checklist}>
              <li><b>Erro de transporte:</b> confira o código HTTP e se a resposta pode ser lida como JSON.</li>
              <li><b>Erro GraphQL ou de negócio:</b> trate primeiro o campo <code>errors</code> da resposta, mesmo com HTTP 200. O formatador local pode expor o código em <code>errors[].code</code>; outros erros podem usar <code>errors[].extensions.code</code>. O campo <code>data</code> pode ser nulo.</li>
              <li><b>Resultado da união:</b> apenas quando houver dados válidos, confira <code>__typename</code>. Se retornar <code>Error</code>, leia <code>code</code> e <code>message</code>. Esse teste não substitui o tratamento de <code>errors</code>.</li>
              <li><b>Sessão indisponível:</b> confira tanto o JWT quanto a sessão bancária mantida no servidor. As operações Pix dependem das duas.</li>
              <li><b>Tempo esgotado após um envio:</b> não repita a transferência automaticamente. Concilie a operação com a equipe; se houver código de autenticação, use a consulta.</li>
            </ul>
            <Example title="Falha de sessão bancária · resposta JSON ilustrativa">{errorResponse}</Example>
            <details className={styles.details}><summary>Ver tratamento de uma consulta em Node.js</summary>
              <p>Use a operação <code>ConsultarPix</code> e as variáveis da seção de consulta como <code>query</code> e <code>variables</code>. Execute no servidor da sua integração. O exemplo não repete requisições automaticamente.</p>
              <Example title="Consulta · leitura defensiva da resposta">{handleResponse}</Example>
            </details>
            <p>O input de <code>sendPixPayment</code> não recebe chave de idempotência e o fluxo analisado não implementa deduplicação de novas chamadas. Uma nova tentativa pode produzir outra transferência.</p>
            <p>Não interprete <code>PixPaymentDone</code>, isoladamente, como uma promessa de estado bancário final: consulte a operação e valide o significado do estado retornado no seu ambiente.</p>
          </section>

          <section id="pendencias" className={styles.section}>
            <span className={styles.kicker}>09 / DEFINIÇÕES PENDENTES</span>
            <h2>O que falta para homologar.</h2>
            <div className={styles.tableWrap}><table><caption>Pontos a confirmar antes de usar a integração em produção</caption><thead><tr><th scope="col">Item</th><th scope="col">Definição necessária</th></tr></thead><tbody>
              <tr><td>Ambiente e acesso</td><td>Endpoint oficial, conta de testes, operações habilitadas e versão do schema implantado.</td></tr>
              <tr><td>Cobrança e recebimento</td><td>Criação de cobranças, emissão de QR Code, identificadores e regras finais de conciliação.</td></tr>
              <tr><td>Envio e consulta</td><td>Limites, tarifas, estados retornados pelo parceiro e tratamento de resultados inconclusivos.</td></tr>
              <tr><td>Webhooks</td><td>Cadastro do callback, autenticação, eventos, payloads, validade dos tokens, renovação e tratamento de reenvios.</td></tr>
              <tr><td>Duplicidade e recuperação</td><td>Estratégia de idempotência, conciliação após falha e processo de suporte antes de uma nova transferência.</td></tr>
            </tbody></table></div>
            <p>A configuração administrativa dos webhooks ficará para uma documentação específica após a definição do fluxo bancário. Não é necessário criar credenciais de webhook para acompanhar este guia ou preparar o cliente da integração.</p>
            <p>As regras de valor, sessão, estados do pedido e conciliação apresentadas acima descrevem a implementação local atual e poderão ser revisadas. A versão definitiva deverá ser publicada após os testes integrados e a aprovação do contrato com o parceiro.</p>
            <div className={styles.helpFooter}><div><b>Prepare sua homologação.</b><p>Solicite acesso e confirme as definições pendentes com a equipe.</p></div><Link href="/contato" className="btn btn-primary">Falar com a Geopay ↗</Link></div>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
