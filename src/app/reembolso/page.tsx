import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RequestForm, SideInfo } from "@/components/RequestForm";

export const metadata: Metadata = { title: "Reembolso | Geopay", description: "Solicite o reembolso de uma compra paga por Pix ou boleto através da Geopay." };

export default function Page() {
  return (
    <PageShell crumb="Reembolso" kicker="Compradores" title={<>Solicitar <span className="hl">reembolso</span>.</>}
      lead="Pagou uma compra por Pix ou boleto processado pela Geopay e precisa da devolução? Envie os dados abaixo. Encaminhamos o pedido ao vendedor e acompanhamos até a resposta."
      meta={["RESPOSTA EM ATÉ 7 DIAS ÚTEIS", "PIX E BOLETO"]}>
      <div className="form-wrap">
        <SideInfo items={[
          ["Fale com o vendedor primeiro", "A Geopay processa o pagamento, mas quem vende o produto ou serviço é o lojista. Na maioria dos casos, o contato direto com ele resolve mais rápido."],
          ["Direito de arrependimento", "Em compras feitas pela internet, o Código de Defesa do Consumidor garante 7 dias para desistir, contados da compra ou do recebimento (art. 49)."],
          ["Como a devolução é feita", "Aprovado o reembolso, o valor volta por Pix para a conta de origem do pagamento, sem custo para você."],
          ["Golpe ou fraude?", <>Nesse caso use a página <Link key="d" className="inline" href="/denuncia">Denúncia</Link> e procure o seu banco para abrir o MED.</>],
        ]} />
        <RequestForm form="reembolso" submitLabel="Solicitar reembolso →"
          consent="Autorizo a Geopay a compartilhar estes dados com o vendedor para análise do reembolso."
          fields={[
            { name: "nome", label: "Nome do pagador", required: true, half: true },
            { name: "cpf", label: "CPF do pagador", required: true, half: true },
            { name: "email", label: "E-mail", type: "email", required: true, half: true },
            { name: "telefone", label: "Telefone", type: "tel", half: true },
            { name: "data_pagamento", label: "Data do pagamento", type: "date", required: true, half: true },
            { name: "valor", label: "Valor pago (R$)", required: true, half: true, placeholder: "0,00" },
            { name: "id_transacao", label: "ID da transação Pix (E2E) ou linha digitável do boleto", required: true },
            { name: "vendedor", label: "Loja ou vendedor", required: true, placeholder: "Nome, site ou CNPJ de quem vendeu" },
            { name: "motivo", label: "Motivo", type: "select", required: true, options: ["Desisti da compra (até 7 dias)", "Produto não entregue", "Produto diferente do anunciado", "Cobrança em duplicidade", "Valor cobrado incorreto", "Outro"] },
            { name: "detalhes", label: "Detalhes", type: "textarea", required: true, placeholder: "Conte o que aconteceu e se já falou com o vendedor" },
          ]} />
      </div>
    </PageShell>
  );
}
