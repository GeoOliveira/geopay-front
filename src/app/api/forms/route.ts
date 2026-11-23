import { NextResponse } from "next/server";

const FORMS = {
  contato: { subject: "Contato pelo site", to: () => process.env.FORMS_TO_CONTATO ?? process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "suporte@geopay.digital" },
  denuncia: { subject: "Nova denúncia", to: () => process.env.FORMS_TO_DENUNCIA ?? process.env.NEXT_PUBLIC_COMPLIANCE_EMAIL ?? "denuncia@geopay.digital" },
  reembolso: { subject: "Pedido de reembolso", to: () => process.env.FORMS_TO_REEMBOLSO ?? process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "suporte@geopay.digital" },
} as const;
type FormName = keyof typeof FORMS;

const LABELS: Record<string, string> = {
  nome: "Nome", email: "E-mail", telefone: "Telefone", documento: "CPF/CNPJ", cpf: "CPF", assunto: "Assunto",
  mensagem: "Mensagem", tipo: "Tipo", data_ocorrido: "Data do ocorrido", data_pagamento: "Data do pagamento",
  valor: "Valor (R$)", id_transacao: "ID da transação", denunciado: "Denunciado", relato: "Relato",
  vendedor: "Vendedor", motivo: "Motivo", detalhes: "Detalhes", consent: "Consentimento",
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/**
 * Recebe os formulários do site e envia por e-mail usando a API da Resend.
 * Variáveis: RESEND_API_KEY, FORMS_FROM_EMAIL (endereço em domínio verificado na Resend)
 * e, opcionalmente, FORMS_TO_CONTATO / FORMS_TO_DENUNCIA / FORMS_TO_REEMBOLSO.
 */
export async function POST(req: Request) {
  let body: { form?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
  const { form, data } = body;
  if (!form || !(form in FORMS) || !data || typeof data !== "object") {
    return NextResponse.json({ error: "Formulário inválido." }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ ok: true, protocol: "000000" }); // honeypot
  if (data.consent !== "sim") return NextResponse.json({ error: "É preciso aceitar o tratamento dos dados." }, { status: 400 });

  const fields: [string, string][] = [];
  for (const [k, v] of Object.entries(data)) {
    if (k === "website") continue;
    const val = String(v ?? "").trim().slice(0, 4000);
    if (val) fields.push([k, val]);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORMS_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "O envio de formulários ainda não está configurado." }, { status: 503 });
  }

  const cfg = FORMS[form as FormName];
  const protocol = Date.now().toString(36).toUpperCase();
  const replyTo = String(data.email ?? "");
  const rows = fields.map(([k, v]) => `<tr><td style="padding:8px 12px;color:#666;vertical-align:top;white-space:nowrap">${esc(LABELS[k] ?? k)}</td><td style="padding:8px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`).join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px"><h2 style="margin:0 0 6px">${esc(cfg.subject)}</h2><p style="color:#666;margin:0 0 16px">Protocolo ${protocol} · ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p><table style="border-collapse:collapse;border:1px solid #eee">${rows}</table></div>`;
  const text = fields.map(([k, v]) => `${LABELS[k] ?? k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `form-${protocol}` },
      body: JSON.stringify({
        from: from.includes("<") ? from : `Site Geopay <${from}>`,
        to: [cfg.to()],
        ...(isEmail(replyTo) ? { reply_to: replyTo } : {}),
        subject: `[${protocol}] ${cfg.subject}`,
        html,
        text: `Protocolo ${protocol}

${text}`,
        tags: [{ name: "form", value: form }],
      }),
    });
    if (!res.ok) {
      console.error("Resend", res.status, await res.text());
      throw new Error();
    }
  } catch {
    return NextResponse.json({ error: "Falha ao registrar sua solicitação." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, protocol });
}
