"use client";
import { useState } from "react";
import { COMPANY } from "@/data/content";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  half?: boolean;
};

type Status = { kind: "idle" | "sending" | "ok" | "err"; msg?: string };

export function RequestForm({ form, fields, submitLabel, consent }: { form: string; fields: Field[]; submitLabel: string; consent: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = Object.fromEntries(new FormData(el).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, data }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error);
      el.reset();
      setStatus({ kind: "ok", msg: `Recebemos sua solicitação. Protocolo ${body.protocol}. Responderemos no e-mail informado.` });
    } catch (err) {
      const msg = err instanceof Error && err.message ? err.message : "Não foi possível enviar agora.";
      setStatus({ kind: "err", msg: `${msg} Se preferir, escreva para ${COMPANY.supportEmail}.` });
    }
  }

  const rows: Field[][] = [];
  fields.forEach((f) => {
    const last = rows[rows.length - 1];
    if (f.half && last && last.length === 1 && last[0].half) last.push(f);
    else rows.push([f]);
  });

  return (
    <form className="form" onSubmit={onSubmit}>
      {/* honeypot anti-spam */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      {rows.map((row, i) => (
        <div key={i} className={row.length > 1 ? "grid2" : undefined}>
          {row.map((f) => (
            <div className="field" key={f.name}>
              <label htmlFor={f.name}>{f.label} {f.required && <em>*</em>}</label>
              {f.type === "textarea" ? (
                <textarea id={f.name} name={f.name} required={f.required} placeholder={f.placeholder} maxLength={4000} />
              ) : f.type === "select" ? (
                <select id={f.name} name={f.name} required={f.required} defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={f.name} name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} maxLength={300} />
              )}
              {f.hint && <small>{f.hint}</small>}
            </div>
          ))}
        </div>
      ))}
      <label className="check"><input type="checkbox" name="consent" value="sim" required /><span>{consent}</span></label>
      {status.kind === "ok" && <div className="form-msg ok">{status.msg}</div>}
      {status.kind === "err" && <div className="form-msg err">{status.msg}</div>}
      <button className="btn btn-primary" style={{ justifyContent: "center" }} disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Enviando..." : submitLabel}
      </button>
    </form>
  );
}

export function SideInfo({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <aside className="side-card">
      {items.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}
    </aside>
  );
}
