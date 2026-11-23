import Link from "next/link";
import type { Metadata } from "next";
import { LegalDoc, PageShell } from "@/components/PageShell";
import { COMPANY } from "@/data/content";

export const metadata: Metadata = { title: "Exclusão de Conta | Geopay", description: "Como solicitar a exclusão da sua conta Geopay e dos dados pessoais associados." };

const mail = <a className="inline" href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>;

export default function Page() {
  return (
    <PageShell crumb="Exclusão de conta" kicker="Documento legal" title="Exclusão de Conta"
      lead="Como pedir o encerramento da sua conta Geopay e a exclusão dos dados associados a ela."
      meta={["ÚLTIMA ATUALIZAÇÃO · 23 DE NOVEMBRO DE 2026", "5 SEÇÕES", "PT-BR"]}>
      <LegalDoc
        intro={<>Esta página explica como solicitar o encerramento da sua conta Geopay e a exclusão dos dados pessoais vinculados a ela. O pedido vale para a conta inteira: depois de concluído, o acesso ao painel, à API e às integrações é encerrado de forma definitiva.</>}
        sections={[
          { title: "Antes de solicitar", intro: "Para que a conta possa ser encerrada, verifique os pontos abaixo:", clauses: [
            <><b>Saldo zerado.</b> Saque todo o saldo disponível para uma conta bancária de sua titularidade. Contas com saldo ou valores bloqueados não podem ser encerradas.</>,
            <><b>Sem pendências.</b> Contestações, devoluções (MED), cobranças em aberto e boletos emitidos ainda não vencidos precisam estar resolvidos ou cancelados.</>,
            <><b>Integrações desativadas.</b> Revogue as chaves de API, remova webhooks e desinstale o plugin WooCommerce. Eles param de funcionar no momento do encerramento.</>,
          ]},
          { title: "Como solicitar", groups: [
            { title: "Pelo painel Geopay", clauses: [
              <>Acesse o painel com o seu login e o código de verificação (MFA).</>,
              <>Vá em <b>Configurações › Conta</b> e clique em <b>Solicitar exclusão</b>.</>,
            ]},
            { title: "Por e-mail", clauses: [
              <>Envie, a partir do e-mail cadastrado na conta, uma mensagem para {mail} com o assunto <b>&quot;Exclusão de conta&quot;</b>, informando o CPF ou CNPJ titular.</>,
            ]},
            { title: "Depois do pedido", clauses: [
              <>Nossa equipe confirma o recebimento e pode pedir uma verificação adicional de identidade para proteger o titular.</>,
              <>Confirmada a identidade e sem pendências, a conta é encerrada em até 15 dias, prazo previsto na Lei Geral de Proteção de Dados (Lei 13.709/2018).</>,
            ]},
          ]},
          { title: "O que é excluído", intro: "Com o encerramento, excluímos ou anonimizamos:", clauses: [
            <><b>Dados de acesso:</b> login, senha, configurações de autenticação em dois fatores e dispositivos autorizados.</>,
            <><b>Perfil e preferências:</b> dados de contato não obrigatórios, preferências de notificação e configurações do painel.</>,
            <><b>Recursos da conta:</b> chaves de API, webhooks, integrações, chaves Pix vinculadas e configurações de cobrança.</>,
            <><b>Dados de navegação</b> e identificadores usados para análise de uso do site e do painel.</>,
          ]},
          { title: "O que é mantido e por quanto tempo", intro: "Por operar pagamentos, a Geopay tem obrigações legais de guarda de alguns registros mesmo após o encerramento. Esses dados ficam bloqueados, são usados apenas para cumprir a lei e são eliminados ao fim do prazo.", clauses: [
            <><b>Transações, comprovantes e dados cadastrais (KYC):</b> 5 anos após o encerramento, conforme a lei de prevenção à lavagem de dinheiro (Lei 9.613/1998) e normas do Banco Central.</>,
            <><b>Registros de acesso:</b> 6 meses, conforme o Marco Civil da Internet (Lei 12.965/2014).</>,
            <><b>Registros de disputas e prevenção a fraudes:</b> pelo tempo necessário ao exercício de direitos em processos judiciais ou administrativos, como permite a LGPD.</>,
          ]},
          { title: "Dúvidas", clauses: [
            <>Fale com o suporte em {mail} ou consulte a nossa <Link className="inline" href="/politica-de-privacidade">Política de Privacidade</Link>.</>,
          ]},
        ]}
      />
    </PageShell>
  );
}
