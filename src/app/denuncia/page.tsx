import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RequestForm, SideInfo } from "@/components/RequestForm";
import { COMPANY } from "@/data/content";

export const metadata: Metadata = { title: "Denúncia | Geopay", description: "Canal de denúncia de golpes, fraudes e uso indevido da plataforma Geopay." };

export default function Page() {
  return (
    <PageShell crumb="Denúncia" kicker="Canal de denúncia" title={<>Viu algo errado? <span className="hl">Denuncie.</span></>}
      lead="Use este canal para relatar golpes, fraudes, venda de produtos ilícitos ou qualquer uso indevido de uma conta Geopay. Todas as denúncias são analisadas pela equipe de compliance."
      meta={["CONFIDENCIAL", "ANÁLISE PELO COMPLIANCE", "ANÔNIMO OPCIONAL"]}>
      <div className="form-wrap">
        <SideInfo items={[
          ["Caiu em um golpe via Pix?", "Procure primeiro o seu banco e peça a abertura do MED (Mecanismo Especial de Devolução). É o caminho mais rápido para tentar recuperar o valor. Depois, registre a denúncia aqui."],
          ["Boletim de ocorrência", "Registre um B.O. na delegacia ou online. Ele ajuda nas apurações e no pedido de devolução."],
          ["Sigilo", "A identidade de quem denuncia é mantida em sigilo. Você pode deixar nome e contato em branco, mas sem eles não conseguimos dar retorno."],
          ["E-mail", <a key="e" className="inline" href={`mailto:${COMPANY.complianceEmail}`}>{COMPANY.complianceEmail}</a>],
        ]} />
        <RequestForm form="denuncia" submitLabel="Enviar denúncia →"
          consent="Declaro que as informações são verdadeiras e autorizo seu uso para apuração dos fatos."
          fields={[
            { name: "tipo", label: "Tipo de denúncia", type: "select", required: true, options: ["Golpe / fraude", "Produto ou serviço ilícito", "Uso de dados de terceiros", "Cobrança indevida", "Phishing / site falso usando a marca Geopay", "Outro"] },
            { name: "data_ocorrido", label: "Data do ocorrido", type: "date", half: true },
            { name: "valor", label: "Valor envolvido (R$)", half: true, placeholder: "0,00" },
            { name: "id_transacao", label: "ID da transação Pix (E2E) ou do boleto", hint: "Aparece no comprovante. Começa com E seguido de números e letras." },
            { name: "denunciado", label: "Quem está sendo denunciado", placeholder: "Nome, CNPJ, chave Pix, site ou perfil" },
            { name: "relato", label: "Descreva o que aconteceu", type: "textarea", required: true },
            { name: "nome", label: "Seu nome (opcional)", half: true },
            { name: "email", label: "Seu e-mail (opcional)", type: "email", half: true },
          ]} />
      </div>
    </PageShell>
  );
}
