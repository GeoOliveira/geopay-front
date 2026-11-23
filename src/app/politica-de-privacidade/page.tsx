import Link from "next/link";
import type { Metadata } from "next";
import { LegalDoc, PageShell } from "@/components/PageShell";
import { COMPANY } from "@/data/content";

export const metadata: Metadata = { title: "Política de Privacidade | Geopay", description: "Como a Geopay coleta, usa, compartilha e protege os seus dados pessoais, conforme a LGPD." };

const dpo = <a className="inline" href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>;

export default function Page() {
  return (
    <PageShell crumb="Política de privacidade" kicker="Documento legal" title="Política de Privacidade"
      lead="Como a Geopay trata os dados pessoais de clientes, compradores e visitantes, em conformidade com a LGPD."
      meta={["ÚLTIMA ATUALIZAÇÃO · 23 DE NOVEMBRO DE 2026", "10 SEÇÕES", "PT-BR"]}>
      <LegalDoc
        intro={<>Esta Política se aplica ao site {COMPANY.site}, ao painel, à API e às integrações da Geopay, inscrita no CNPJ {COMPANY.cnpj}. Ao usar nossos serviços, você declara ter lido e compreendido como tratamos os seus dados.</>}
        sections={[
          { title: "Quem somos", clauses: [
            <>A Geopay, CNPJ {COMPANY.cnpj}, é a <b>controladora</b> dos dados pessoais tratados para a prestação dos seus serviços de pagamento.</>,
            <>Em operações com parceiros bancários e de liquidação, cada parte responde pelos dados que trata dentro de suas atribuições legais.</>,
          ]},
          { title: "Dados que coletamos", groups: [
            { title: "Clientes (titulares de conta)", clauses: [
              <><b>Cadastro:</b> nome, CPF ou CNPJ, data de nascimento, filiação, endereço, e-mail, telefone, renda ou faturamento declarados, ocupação e dados de sócios e representantes legais.</>,
              <><b>Verificação de identidade:</b> documentos com foto, selfie e comprovantes, usados no processo de KYC.</>,
              <><b>Financeiros:</b> saldo, transações Pix, boletos, chaves Pix e dados bancários para saque.</>,
            ]},
            { title: "Compradores", clauses: [
              <>Nome, CPF, valor, data e identificadores das transações pagas a clientes Geopay.</>,
            ]},
            { title: "Todos os usuários", clauses: [
              <><b>Técnicos:</b> endereço IP, data e hora de acesso, dispositivo, navegador e cookies essenciais.</>,
            ]},
          ]},
          { title: "Para que usamos os dados", clauses: [
            <>Abrir e manter a conta, processar pagamentos, saques e boletos.</>,
            <>Confirmar a identidade, prevenir fraudes e cumprir as normas de prevenção à lavagem de dinheiro e ao financiamento do terrorismo (PLD/FT).</>,
            <>Proteger o acesso com autenticação em dois fatores e enviar avisos de segurança por e-mail e SMS.</>,
            <>Atender solicitações, denúncias e pedidos de reembolso.</>,
            <>Cumprir obrigações legais e regulatórias e atender autoridades competentes.</>,
            <>Melhorar o site e o painel, com dados agregados sempre que possível.</>,
          ]},
          { title: "Bases legais", intro: "Tratamos dados com fundamento no art. 7º da LGPD, principalmente:", clauses: [
            <><b>Execução de contrato</b> para prestar os serviços contratados.</>,
            <><b>Cumprimento de obrigação legal ou regulatória</b>, como a guarda de registros e o KYC.</>,
            <><b>Legítimo interesse</b> para prevenção a fraudes e segurança, respeitados os seus direitos.</>,
            <><b>Consentimento</b> quando exigido, como em comunicações de marketing, que podem ser canceladas a qualquer momento.</>,
          ]},
          { title: "Compartilhamento", intro: "Não vendemos dados pessoais. Compartilhamos apenas o necessário com:", clauses: [
            <>Instituições financeiras parceiras e o arranjo Pix, para liquidar as transações.</>,
            <>Fornecedores de tecnologia: hospedagem em nuvem, envio de e-mail e SMS, verificação de identidade e consulta cadastral.</>,
            <>O lojista envolvido, em casos de reembolso ou contestação.</>,
            <>Autoridades públicas, quando houver obrigação legal ou ordem judicial.</>,
          ]},
          { title: "Armazenamento e segurança", clauses: [
            <>Os dados ficam em provedores de nuvem com criptografia em trânsito e em repouso, controle de acesso por perfil e registro de auditoria.</>,
            <>O acesso ao painel exige autenticação em dois fatores e as requisições à API são assinadas com chave secreta.</>,
            <>Alguns fornecedores podem armazenar dados fora do Brasil, sempre com as garantias exigidas pelo art. 33 da LGPD.</>,
          ]},
          { title: "Por quanto tempo guardamos", clauses: [
            <>Enquanto a conta estiver ativa e, após o encerramento, pelos prazos legais: 5 anos para transações e dados cadastrais (Lei 9.613/1998) e 6 meses para registros de acesso (Lei 12.965/2014).</>,
            <>Encerrados os prazos, os dados são eliminados ou anonimizados. Veja os detalhes em <Link className="inline" href="/exclusao-de-conta">Exclusão de conta</Link>.</>,
          ]},
          { title: "Seus direitos", intro: "Conforme o art. 18 da LGPD, você pode solicitar:", clauses: [
            <>Confirmação de tratamento e acesso aos seus dados.</>,
            <>Correção de dados incompletos, inexatos ou desatualizados.</>,
            <>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.</>,
            <>Portabilidade, informação sobre compartilhamentos e revogação do consentimento.</>,
            <>Os pedidos são respondidos em até 15 dias pelo e-mail {dpo}. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</>,
          ]},
          { title: "Cookies", clauses: [
            <>Usamos cookies essenciais para o funcionamento e a segurança do site e do painel. Cookies de análise só são usados de forma agregada e podem ser bloqueados no seu navegador.</>,
          ]},
          { title: "Contato e atualizações", clauses: [
            <>Encarregado de dados (DPO): {dpo}.</>,
            <>Esta Política pode ser atualizada. Mudanças relevantes serão comunicadas no site ou por e-mail, e a data no topo indica a versão vigente.</>,
          ]},
        ]}
      />
    </PageShell>
  );
}
