import { NextResponse } from "next/server";

const FORMS = ["contato", "denuncia", "reembolso"] as const;

/**
 * Recebe os formulários do site e encaminha para FORMS_WEBHOOK_URL
 * (ex.: endpoint do geopay-backend, Zapier, n8n, Slack). Sem a variável,
 * responde 503 para que o usuário seja orientado a usar o e-mail.
 */
export async function POST(req: Request) {
  let body: { form?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
  const { form, data } = body;
  if (!form || !FORMS.includes(form as (typeof FORMS)[number]) || !data || typeof data !== "object") {
    return NextResponse.json({ error: "Formulário inválido." }, { status: 400 });
  }
  // honeypot preenchido = robô; finge sucesso
  if (data.website) return NextResponse.json({ ok: true, protocol: "000000" });
  if (data.consent !== "sim") return NextResponse.json({ error: "É preciso aceitar o tratamento dos dados." }, { status: 400 });

  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "website") continue;
    clean[k] = String(v ?? "").slice(0, 4000);
  }

  const protocol = `${Date.now().toString(36).toUpperCase()}`;
  const target = process.env.FORMS_WEBHOOK_URL;
  if (!target) {
    return NextResponse.json({ error: "O envio de formulários ainda não está configurado." }, { status: 503 });
  }
  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORMS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.FORMS_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ form, protocol, receivedAt: new Date().toISOString(), data: clean }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "Falha ao registrar sua solicitação." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, protocol });
}
