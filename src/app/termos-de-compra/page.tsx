import Link from "next/link";
import type { Metadata } from "next";
import { LegalDoc, PageShell } from "@/components/PageShell";
import { COMPANY } from "@/data/content";

export const metadata: Metadata = { title: "Termos de Compra | Geopay", description: "Condições para compradores que pagam por Pix ou boleto a lojistas que usam a Geopay." };

const mail = <a className="inline" href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>;

export default function Page() {
  return (
    <PageShell crumb="Termos de compra" kicker="Documento legal" title="Termos de Compra"
      lead="Condições aplicáveis a quem paga, por Pix ou boleto, compras feitas com lojistas que usam a Geopay."
      meta={["ÚLTIMA ATUALIZAÇÃO · 23 DE NOVEMBRO DE 2026", "9 SEÇÕES", "PT-BR"]}>
      <LegalDoc
        intro={<>Estes Termos regulam a relação entre você, comprador, e a Geopay, CNPJ {COMPANY.cnpj}, quando um pagamento é processado pela nossa plataforma. Ao concluir o pagamento, você declara estar de acordo com eles.</>}
        sections={[
          { title: "Papel da Geopay", clauses: [
            <>A Geopay é uma plataforma de pagamentos: ela gera a cobrança, recebe o valor e o repassa ao lojista. <b>A Geopay não é a vendedora</b> dos produtos ou serviços.</>,
            <>A oferta, o preço, a entrega, a garantia e a qualidade são de responsabilidade exclusiva do lojista, identificado no momento do pagamento.</>,
          ]},
          { title: "Formas de pagamento", clauses: [
            <><b>Pix:</b> QR Code ou código copia e cola. A confirmação costuma ocorrer em segundos.</>,
            <><b>Boleto:</b> a compensação ocorre em até 1 dia útil após o pagamento.</>,
            <>Cobranças Pix e boletos têm prazo de validade definido pelo lojista. Pagamentos feitos após o vencimento podem não ser processados e serão devolvidos.</>,
          ]},
          { title: "Confirmação e comprovante", clauses: [
            <>O comprovante emitido pelo seu banco e o identificador da transação (E2E ou linha digitável) são a prova do pagamento. Guarde-os.</>,
            <>A Geopay avisa o lojista da confirmação. A liberação do produto ou serviço depende dele.</>,
          ]},
          { title: "Cancelamento e arrependimento", clauses: [
            <>Em compras feitas fora do estabelecimento comercial, você pode desistir em até 7 dias da compra ou do recebimento, conforme o art. 49 do Código de Defesa do Consumidor.</>,
            <>O pedido deve ser feito primeiro ao lojista. Se não houver resposta, use a página <Link className="inline" href="/reembolso">Reembolso</Link>.</>,
          ]},
          { title: "Reembolsos", clauses: [
            <>Aprovado o reembolso pelo lojista, ou determinado pela Geopay nas hipóteses destes Termos, o valor é devolvido por Pix para a conta de origem do pagamento.</>,
            <>A Geopay pode reter valores do lojista para garantir devoluções em casos de fraude, não entrega ou determinação legal.</>,
            <>Não há cobrança de tarifa do comprador para devoluções.</>,
          ]},
          { title: "Golpes e MED", clauses: [
            <>Se você foi vítima de golpe, procure o seu banco e solicite a abertura do <b>Mecanismo Especial de Devolução (MED)</b>, regulado pelo Banco Central.</>,
            <>A Geopay colabora com as instituições envolvidas, pode bloquear cautelarmente os valores do recebedor e recebe denúncias pela página <Link className="inline" href="/denuncia">Denúncia</Link>.</>,
          ]},
          { title: "Usos proibidos", clauses: [
            <>É proibido usar a Geopay para pagar produtos ou serviços ilícitos, apostas não autorizadas, ou com recursos de origem ilícita.</>,
            <>Transações suspeitas podem ser recusadas, bloqueadas e comunicadas às autoridades, conforme a Lei 9.613/1998.</>,
          ]},
          { title: "Dados pessoais", clauses: [
            <>Os dados do pagador (nome, CPF e dados da transação) são tratados conforme a <Link className="inline" href="/politica-de-privacidade">Política de Privacidade</Link> e compartilhados com o lojista apenas no necessário para a venda.</>,
          ]},
          { title: "Disposições gerais", clauses: [
            <>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro do domicílio do consumidor para resolver eventuais conflitos.</>,
            <>Atendimento: {mail}. Geopay · CNPJ {COMPANY.cnpj}.</>,
          ]},
        ]}
      />
    </PageShell>
  );
}
