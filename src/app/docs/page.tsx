import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Documentação Pix | Geopay",
  description: "Entenda o envio Pix por GraphQL, a consulta por código de autenticação e a confirmação de recebimentos na Geopay.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentação Pix | Geopay",
    description: "Envio, consulta e confirmação de pagamentos Pix com GraphQL.",
    url: "/docs",
  },
};

const navigation = [
  ["visao-geral", "Visão geral"],
  ["autenticacao", "Acesso e autenticação"],
  ["receber", "Receber um Pix"],
  ["enviar", "Enviar um Pix"],
  ["consultar", "Consultar um Pix"],
  ["confirmacao", "Confirmação e estados"],
  ["erros", "Erros e tentativas"],
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
    <PageShell crumb="Documentação" kicker="Guia de integração · Pix"
      title={<>Do envio à consulta.<br /><span className="hl">Entenda seu Pix.</span></>}
      lead="Conheça as operações GraphQL para enviar e consultar Pix, e acompanhe como os recebimentos são conciliados com os pedidos."
      meta={["ENVIO E CONFIRMAÇÃO", "GRAPHQL", "PT-BR"]}>
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
            <h2>Um fluxo, duas direções.</h2>
            <p>O envio Pix é iniciado pela operação <code>sendPixPayment</code>. A consulta <code>findPixByAuth</code> acompanha uma transferência pelo código de autenticação. No recebimento, a confirmação bancária é processada para conciliar o pedido relacionado.</p>
            <div className={styles.cards}>
              <a href="#receber" className={styles.card}><span>↙ CASH-IN</span><h3>Receber</h3><p>Entenda como a confirmação bancária é relacionada ao pedido e à loja.</p><b>Conhecer o fluxo →</b></a>
              <a href="#enviar" className={styles.card}><span>↗ CASH-OUT</span><h3>Enviar</h3><p>Envie por chave Pix e guarde o código para consultar o resultado.</p><b>Conhecer o fluxo →</b></a>
            </div>
            <div className={styles.note}><b>Contrato de referência: GraphQL.</b><p>Este guia foi revisado com base na implementação local disponível. Confirme com a equipe o endereço da API e o schema implantado no seu ambiente antes de integrar.</p></div>
            <p className={styles.caption}>Os exemplos são fictícios e não executam operações. As demonstrações da página inicial não substituem o contrato apresentado neste guia.</p>
          </section>

          <section id="autenticacao" className={styles.section}>
            <span className={styles.kicker}>02 / ACESSO E AUTENTICAÇÃO</span>
            <h2>Uma API, operações GraphQL.</h2>
            <p>Envie as operações por <code>POST /graphql</code>, em um corpo JSON com <code>query</code> e <code>variables</code>. Use o endereço base fornecido para seu ambiente.</p>
            <Operation type="MUTATION" name="loginBusinessOwner">Recebe e-mail e senha. Quando o resultado é <code>LoggedUserOutput</code>, o campo <code>accessToken</code> contém o JWT usado nas operações protegidas.</Operation>
            <details className={styles.details}><summary>Ver operação de autenticação</summary>
              <Example title="Login · GraphQL">{loginOperation}</Example>
              <Example title="Variáveis do login · JSON">{JSON.stringify({ email: "lojista@example.com", password: "<SENHA_DA_CONTA>" }, null, 2)}</Example>
            </details>
            <Example title="Cabeçalhos das operações Pix">{"Authorization: Bearer <ACCESS_TOKEN>\nContent-Type: application/json"}</Example>
            <p>O envio e a consulta exigem JWT válido. O backend também utiliza a sessão bancária da conta, mantida no servidor. Ter um JWT não garante que essa sessão bancária esteja disponível.</p>
            <p>Não envie senha nas operações Pix, nem exponha tokens do parceiro bancário. Este contrato não utiliza versionamento pelo cabeçalho <code>version</code>. Utilize as operações GraphQL deste guia como referência para a integração.</p>
          </section>

          <section id="receber" className={styles.section}>
            <span className={styles.kicker}>03 / RECEBIMENTO</span>
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
            <span className={styles.kicker}>04 / ENVIO</span>
            <h2>Envie por chave Pix.</h2>
            <Operation type="MUTATION" name="sendPixPayment(input: SendPixPaymentRequest!)">Inicia o envio a partir da conta autenticada. O backend consulta a chave destinatária e obtém os dados bancários necessários antes de solicitar a transferência.</Operation>
            <div className={styles.tableWrap}><table><caption>Campos de SendPixPaymentRequest</caption><thead><tr><th scope="col">Campo</th><th scope="col">Contrato</th></tr></thead><tbody>
              <tr><td><code>amount</code></td><td><code>Float!</code> obrigatório. Valor numérico, sem símbolo de moeda.</td></tr>
              <tr><td><code>pixKey</code></td><td><code>String!</code> obrigatória. Chave Pix do destinatário.</td></tr>
              <tr><td><code>description</code></td><td>Texto opcional. Padrão: string vazia.</td></tr>
              <tr><td><code>initializationType</code></td><td>Texto opcional, com padrão <code>Key</code>. O fluxo descrito aqui é o envio por chave.</td></tr>
            </tbody></table></div>
            <Example title="Envio Pix · GraphQL">{sendOperation}</Example>
            <Example title="Variáveis do envio · JSON">{sendVariables}</Example>
            <p>Não envie <code>sender</code> ou <code>endToEndId</code> no input. O backend monta o remetente a partir da conta autenticada e obtém o identificador na consulta da chave Pix.</p>
            <h3>Como ler o retorno</h3>
            <p>O resultado é uma união: <code>PixPaymentDone</code> ou <code>Error</code>. Solicite <code>__typename</code> para identificar o caso. O sucesso expõe <code>authenticationCode</code>, <code>amount</code> como texto e <code>recipient</code>.</p>
            <div className={styles.note}><b>Guarde o código de autenticação.</b><p>Use o <code>authenticationCode</code> retornado no campo <code>authCode</code> da consulta. A resposta de envio não expõe um campo <code>status</code>; consulte a transferência para acompanhar o estado informado pelo parceiro.</p></div>
          </section>

          <section id="consultar" className={styles.section}>
            <span className={styles.kicker}>05 / ACOMPANHAMENTO</span>
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
            <span className={styles.kicker}>06 / CONFIRMAÇÃO</span>
            <h2>O evento concilia o recebimento.</h2>
            <div className={styles.flow} aria-label="Fluxo de confirmação do recebimento Pix"><span>Parceiro bancário</span><span aria-hidden="true">→</span><span>Webhook autenticado</span><span aria-hidden="true">→</span><span>Fila de processamento</span><span aria-hidden="true">→</span><span>Pedido conciliado</span></div>
            <p>O endpoint <code>POST /webhook</code> recebe uma lista de eventos e exige autenticação específica para webhooks. Ele é destinado à integração bancária, não ao envio de confirmações pelo navegador ou pelo lojista.</p>
            <h3><code>PIX_CASH_IN_WAS_CLEARED</code></h3>
            <p>É o evento Pix tratado pelo worker analisado. Ele localiza o carrinho pelo identificador de conciliação, exige estado <code>PROCESSING</code> e aceita valor recebido com diferença de até R$ 0,10 em relação ao total do carrinho.</p>
            <p>Quando as verificações passam, o worker atualiza o pedido WooCommerce para <code>completed</code>. Em seguida, grava <code>COMPLETED</code> e <code>paidAt</code> no carrinho local. A fila está configurada para até cinco tentativas de processamento.</p>
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
            <span className={styles.kicker}>07 / ERROS E TENTATIVAS</span>
            <h2>Confira o resultado da operação.</h2>
            <ul className={styles.checklist}>
              <li><b>Erro de transporte:</b> confira o código HTTP e se a resposta pode ser lida como JSON.</li>
              <li><b>Erro GraphQL:</b> trate o campo <code>errors</code> da resposta. Não considere apenas o status HTTP.</li>
              <li><b>Erro de negócio:</b> quando <code>__typename</code> for <code>Error</code>, leia <code>code</code> e <code>message</code>. Uma resposta HTTP 200 pode conter uma operação recusada.</li>
              <li><b>Sessão indisponível:</b> confira tanto o JWT quanto a sessão bancária mantida no servidor. As operações Pix dependem das duas.</li>
              <li><b>Tempo esgotado após um envio:</b> não repita a transferência automaticamente. Concilie a operação com a equipe; se houver código de autenticação, use a consulta.</li>
            </ul>
            <p>O input de <code>sendPixPayment</code> não recebe chave de idempotência e o fluxo analisado não implementa deduplicação de novas chamadas. Uma nova tentativa pode produzir outra transferência.</p>
            <p>Não interprete <code>PixPaymentDone</code>, isoladamente, como uma promessa de estado bancário final: consulte a operação e valide o significado do estado retornado no seu ambiente.</p>
            <div className={styles.helpFooter}><div><b>Vamos validar sua integração?</b><p>Confirme acesso, schema e ambiente de testes com a equipe.</p></div><Link href="/contato" className="btn btn-primary">Falar com a Geopay ↗</Link></div>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
