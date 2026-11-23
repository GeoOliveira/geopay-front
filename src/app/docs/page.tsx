import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Documentação Pix | Geopay",
  description: "Entenda como gerar cobranças, enviar Pix e acompanhar a confirmação de transações na Geopay.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentação Pix | Geopay",
    description: "Do QR Code à confirmação: conheça os fluxos de transações Pix.",
    url: "/docs",
  },
};

const navigation = [
  ["visao-geral", "Visão geral"],
  ["autenticacao", "Antes de começar"],
  ["receber", "Receber um Pix"],
  ["enviar", "Enviar um Pix"],
  ["consultar", "Consultar transações"],
  ["confirmacao", "Confirmação e estados"],
  ["erros", "Erros e tentativas"],
] as const;

const staticQr = JSON.stringify({
  addressingKey: { type: "EMAIL", value: "recebedor@example.com" },
  recipientName: "Loja Exemplo",
  amount: 49.9,
  location: { city: "Sao Paulo", zipCode: "01001000" },
}, null, 2);

const dynamicQr = JSON.stringify({
  recipientName: "Loja Exemplo",
  addressingKey: { type: "EMAIL", value: "recebedor@example.com" },
  singlePayment: true,
  changeAmountType: "NOT_ALLOWED",
  amount: 49.9,
  payer: {
    name: "Cliente Exemplo",
    document: "00000000000",
    type: "CUSTOMER",
    address: { addressLine: "Rua Exemplo, 100", state: "SP", city: "Sao Paulo", zipCode: "01001000" },
  },
}, null, 2);

function Endpoint({ method, path, children }: { method: "GET" | "POST"; path: string; children: React.ReactNode }) {
  return (
    <div className={styles.endpoint}>
      <div className={styles.endpointTitle}><span className={method === "GET" ? styles.get : styles.post}>{method}</span><code>{path}</code></div>
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
      title={<>Do primeiro QR Code<br />ao <span className="hl">Pix confirmado.</span></>}
      lead="Receba, envie e acompanhe pagamentos. Entenda cada etapa da transação e saiba quando uma operação está realmente concluída."
      meta={["RECEBIMENTO E ENVIO", "API REST", "PT-BR"]}>
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
            <p>No recebimento, você gera uma cobrança e acompanha o pagamento. No envio, você informa os dados da operação e acompanha sua liquidação.</p>
            <div className={styles.cards}>
              <a href="#receber" className={styles.card}><span>↙ CASH-IN</span><h3>Receber</h3><p>Gere um QR Code estático ou dinâmico para apresentar ao pagador.</p><b>Conhecer o fluxo →</b></a>
              <a href="#enviar" className={styles.card}><span>↗ CASH-OUT</span><h3>Enviar</h3><p>Inicie uma transferência Pix e consulte seu resultado.</p><b>Conhecer o fluxo →</b></a>
            </div>
            <div className={styles.note}><b>Gerar uma cobrança não significa receber um pagamento.</b><p>A confirmação financeira acontece depois, quando o parceiro bancário comunica a liquidação à Geopay.</p></div>
            <p className={styles.caption}>Este guia descreve as rotas do backend analisado. Os exemplos são fictícios e não executam transações. Os indicadores e o botão “Executar” da página inicial são demonstrações.</p>
          </section>

          <section id="autenticacao" className={styles.section}>
            <span className={styles.kicker}>02 / ANTES DE COMEÇAR</span>
            <h2>Acesso à sua conta.</h2>
            <p>As rotas Pix deste guia usam uma sessão autenticada, com token JWT no cabeçalho <code>Authorization</code>. O token de pré-cadastro não dá acesso às operações Pix.</p>
            <Example title="Cabeçalhos da requisição">{"Authorization: Bearer <TOKEN_DA_SESSAO>\nContent-Type: application/json"}</Example>
            <p>Use o endereço da API fornecido para seu ambiente. As rotas abaixo são relativas a esse endereço. Nunca exponha credenciais do parceiro bancário ou chaves privadas no navegador.</p>
            <div className={styles.note}><b>Qual contrato seguir?</b><p>O backend analisado expõe <code>/pix/generate-dynamic-qr-code</code>, por exemplo. A rota <code>/v1/pix/qr-code</code> e os cabeçalhos <code>x-api-key</code> e <code>x-signature</code> apresentados na vitrine do site são ilustrativos e não definem o contrato destas rotas.</p></div>
            <p className={styles.caption}>A versão é selecionada pelo cabeçalho <code>version</code>; sem ele, a aplicação utiliza o valor padrão <code>legacy</code>. Valide com a equipe o contrato implantado no seu ambiente.</p>
          </section>

          <section id="receber" className={styles.section}>
            <span className={styles.kicker}>03 / RECEBIMENTO</span>
            <h2>Da cobrança ao pagamento.</h2>
            <ol className={styles.steps}>
              <li><b>Gere a cobrança.</b><p>Informe a chave recebedora e os dados exigidos pelo tipo de QR Code.</p></li>
              <li><b>Apresente o QR Code ao cliente.</b><p>Use o conteúdo retornado pela API. O backend também registra a cobrança para consulta.</p></li>
              <li><b>O cliente paga no banco dele.</b><p>Exibir ou copiar o código ainda não confirma a transferência.</p></li>
              <li><b>Acompanhe a confirmação.</b><p>Após o evento de liquidação, a Geopay registra a transação e atualiza o QR Code relacionado.</p></li>
            </ol>
            <h3>QR Code estático</h3>
            <Endpoint method="POST" path="/pix/generate-static-qr-code">Gera um QR Code com chave recebedora, nome e localização. O valor é opcional; quando informado, deve ser positivo.</Endpoint>
            <Example title="Corpo da cobrança estática · JSON">{staticQr}</Example>
            <p>As chaves podem ser do tipo <code>EMAIL</code>, <code>CPF</code>, <code>CNPJ</code>, <code>PHONE</code> ou <code>EVP</code>. Os dados do exemplo devem ser substituídos por dados válidos da conta.</p>
            <h3>QR Code dinâmico</h3>
            <Endpoint method="POST" path="/pix/generate-dynamic-qr-code">Permite informar pagador, uso único e alteração do valor. Com <code>changeAmountType: NOT_ALLOWED</code>, o campo <code>amount</code> é obrigatório.</Endpoint>
            <details className={styles.details}><summary>Ver exemplo de cobrança dinâmica</summary><Example title="Corpo da cobrança dinâmica · JSON">{dynamicQr}</Example><p>O documento é fictício. <code>singlePayment</code> define o uso único. A expiração opcional usa <code>expiresAt</code>, e não <code>expiresIn</code>.</p></details>
            <h3>Como relacionar a cobrança ao pagamento</h3>
            <p>O campo <code>conciliationId</code> identifica a cobrança na conciliação. Se omitido, o backend gera um identificador. Quando informado, o estático exige 25 caracteres alfanuméricos; o dinâmico, de 26 a 35.</p>
            <p>As operações consultam a política de tarifas do plano antes de chamar o parceiro bancário. Não use os valores demonstrativos da página inicial como confirmação da tarifa contratada.</p>
          </section>

          <section id="enviar" className={styles.section}>
            <span className={styles.kicker}>04 / ENVIO</span>
            <h2>Inicie. Depois confirme.</h2>
            <Endpoint method="GET" path="/pix/validate-key/:key">Consulta os dados de uma chave Pix antes do envio. Confira o destinatário retornado.</Endpoint>
            <Endpoint method="POST" path="/pix/decode-qr-code">Recebe <code>{'{ "code": "<PIX_COPIA_E_COLA>" }'}</code> para decodificar um QR Code. Utilize os dados retornados, incluindo o identificador de ponta a ponta quando aplicável.</Endpoint>
            <Endpoint method="POST" path="/pix/transfer">Inicia a transferência. A resposta local é registrada como <code>PENDING</code>; o evento de conclusão atualiza a operação para <code>DONE</code>.</Endpoint>
            <div className={styles.tableWrap}><table><caption>Campos do envio Pix</caption><thead><tr><th scope="col">Campo</th><th scope="col">Uso</th></tr></thead><tbody>
              <tr><td><code>amount</code></td><td>Valor numérico da transferência.</td></tr>
              <tr><td><code>initializationType</code></td><td><code>Key</code>, <code>StaticQrCode</code>, <code>DynamicQrCode</code> ou <code>Manual</code>, conforme o contrato e a operação.</td></tr>
              <tr><td><code>sender</code></td><td>Nome, documento e conta do remetente. O número da conta deve corresponder à sessão.</td></tr>
              <tr><td><code>pixKey</code></td><td>Chave do destinatário no envio por chave.</td></tr>
              <tr><td><code>endToEndId</code></td><td>Identificador obtido no fluxo de consulta ou decodificação, conforme a operação.</td></tr>
              <tr><td><code>description</code></td><td>Descrição opcional.</td></tr>
            </tbody></table></div>
            <p>No objeto <code>sender.account</code>, use <code>accountBranch</code> e <code>accountNumber</code>. Para envio por chave, o backend também exige <code>type</code>. Confirme a modalidade e os campos com a equipe antes de integrar.</p>
            <div className={styles.note}><b>Resposta recebida não é liquidação confirmada.</b><p>Guarde o ID da operação e consulte o estado. Não apresente “Pix concluído” enquanto a transferência estiver pendente.</p></div>
          </section>

          <section id="consultar" className={styles.section}>
            <span className={styles.kicker}>05 / ACOMPANHAMENTO</span>
            <h2>Consulte a fonte da confirmação.</h2>
            <Endpoint method="GET" path="/pix/qr-codes">Lista os QR Codes da conta autenticada, separados em <code>staticQrCodes</code> e <code>dynamicQrCodes</code>.</Endpoint>
            <Endpoint method="GET" path="/pix/qr-code/:id">Consulta um QR Code pelo ID local, limitado à conta da sessão.</Endpoint>
            <Endpoint method="GET" path="/transactions?page=1&limit=10&type=Pix">Lista as transações Pix da conta. <code>page</code> e <code>limit</code> são obrigatórios. Há filtros opcionais de data, ordem e origem.</Endpoint>
            <Endpoint method="GET" path="/transactions/:id">Consulta os detalhes de uma transação da conta autenticada.</Endpoint>
            <Example title="Exemplo de consulta · cURL">{'curl "<BASE_DA_API>/transactions?page=1&limit=10&type=Pix" \\\n  -H "Authorization: Bearer <TOKEN_DA_SESSAO>"'}</Example>
            <p>O ID local da transação, o ID local do QR Code, o <code>conciliationId</code> e o <code>endToEndId</code> têm funções diferentes. Guarde cada identificador no campo correspondente.</p>
          </section>

          <section id="confirmacao" className={styles.section}>
            <span className={styles.kicker}>06 / CONFIRMAÇÃO</span>
            <h2>O evento fecha o ciclo.</h2>
            <div className={styles.flow} aria-label="Fluxo da confirmação"><span>Parceiro bancário</span><span aria-hidden="true">→</span><span>Webhook Geopay</span><span aria-hidden="true">→</span><span>Transação atualizada</span><span aria-hidden="true">→</span><span>Consulta na API</span></div>
            <p>Os eventos abaixo são recebidos pela Geopay a partir do parceiro bancário. Eles não representam um serviço de webhook de saída configurável pelo lojista neste guia.</p>
            <div className={styles.tableWrap}><table><caption>Eventos e efeito no registro financeiro</caption><thead><tr><th scope="col">Evento</th><th scope="col">Efeito</th></tr></thead><tbody>
              <tr><td><code>pixCashInWasCleared</code></td><td>Registra o recebimento como <code>DONE</code>. Para QR Code conciliado, marca a cobrança como <code>PAID</code>.</td></tr>
              <tr><td><code>pixCashOutWasCompleted</code></td><td>Localiza a saída pelo código de autenticação e atualiza para <code>DONE</code>.</td></tr>
              <tr><td><code>pixCashOutWasCanceled</code></td><td>Marca uma saída ainda não concluída como <code>CANCELED</code> e registra o motivo.</td></tr>
              <tr><td><code>pixCashOutWasUndone</code></td><td>Marca uma saída ainda não concluída como <code>UNDONE</code> e registra o motivo.</td></tr>
              <tr><td><code>pixRefundWasCleared</code></td><td>Registra uma transação de devolução com estado <code>REFUND</code>.</td></tr>
            </tbody></table></div>
            <p>O evento <code>pixCashInWasReceived</code> apenas registra o recebimento da notificação em log no código analisado. Ele não é a confirmação de liquidação.</p>
            <h3>Estado da cobrança ≠ estado da transação</h3>
            <p>QR Codes possuem os estados <code>PENDING</code>, <code>PAID</code>, <code>CANCELED</code> e <code>EXPIRED</code>. Esses são os valores previstos no modelo; a presença de um estado não garante uma rotina automática de transição. Para transações, use o estado financeiro retornado pela consulta.</p>
            <p>Quando a cobrança está vinculada a um carrinho WooCommerce, o processamento da confirmação também atualiza o carrinho relacionado para concluído.</p>
          </section>

          <section id="erros" className={styles.section}>
            <span className={styles.kicker}>07 / ERROS E TENTATIVAS</span>
            <h2>Antes de tentar outra vez.</h2>
            <ul className={styles.checklist}>
              <li><b>Sessão inválida ou expirada:</b> autentique novamente. As operações também dependem da sessão bancária mantida no servidor.</li>
              <li><b>Acesso negado:</b> verifique se a conta está habilitada e se o remetente corresponde à sessão.</li>
              <li><b>Dados inválidos:</b> confira campos obrigatórios, tipos de chave, valores e identificadores de conciliação.</li>
              <li><b>Tempo esgotado ou falha de conexão:</b> consulte a operação antes de repetir um envio. A ausência de resposta não comprova que o banco deixou de processá-lo.</li>
              <li><b>Pagamento ainda pendente:</b> acompanhe a consulta e procure o suporte com os identificadores da operação.</li>
            </ul>
            <p>O backend registra um <code>idempotencyKey</code>, mas este guia não promete deduplicação de novas chamadas de transferência. Não reenvie uma operação financeira automaticamente sem conciliação.</p>
            <div className={styles.helpFooter}><div><b>Vamos validar sua integração?</b><p>Confirme acesso, contrato da API e ambiente de testes com a equipe.</p></div><Link href="/contato" className="btn btn-primary">Falar com a Geopay ↗</Link></div>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
