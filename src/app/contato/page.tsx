import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RequestForm, SideInfo } from "@/components/RequestForm";
import { COMPANY } from "@/data/content";

export const metadata: Metadata = { title: "Contato | Geopay", description: "Fale com a Geopay: comercial, suporte técnico, integrações e parcerias." };

export default function Page() {
  return (
    <PageShell crumb="Contato" kicker="Atendimento" title={<>Fale com a <span className="hl">Geopay</span>.</>}
      lead="Dúvidas comerciais, suporte à sua conta, integração com a API ou parcerias. Respondemos em até 2 horas úteis.">
      <div className="form-wrap">
        <SideInfo items={[
          ["Suporte", <a key="s" className="inline" href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>],
          ["Horário", "Segunda a sexta, das 9h às 18h (horário de Brasília). O Pix e a API funcionam 24/7."],
          ["Desenvolvedores", "Para dúvidas de integração, informe o endpoint e o horário da requisição para agilizar a análise."],
          ["Outros canais", <>Para denúncias use a página <Link className="inline" href="/denuncia">Denúncia</Link>; para devoluções, <Link className="inline" href="/reembolso">Reembolso</Link>.</>],
        ]} />
        <RequestForm form="contato" submitLabel="Enviar mensagem →"
          consent="Autorizo a Geopay a usar estes dados para responder à minha solicitação, conforme a Política de Privacidade."
          fields={[
            { name: "nome", label: "Nome completo", required: true, half: true },
            { name: "email", label: "E-mail", type: "email", required: true, half: true },
            { name: "telefone", label: "Telefone / WhatsApp", type: "tel", half: true },
            { name: "documento", label: "CPF ou CNPJ", half: true, hint: "Se você já é cliente" },
            { name: "assunto", label: "Assunto", type: "select", required: true, options: ["Quero abrir uma conta", "Comercial / tarifas", "Suporte à minha conta", "Integração / API", "Parcerias", "Outro"] },
            { name: "mensagem", label: "Mensagem", type: "textarea", required: true, placeholder: "Conte como podemos ajudar" },
          ]} />
      </div>
    </PageShell>
  );
}
