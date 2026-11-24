"use client";
import { useMemo, useRef } from "react";

function Barcode() {
  const bars = useMemo(() => {
    const out: { x: number; w: number }[] = [];
    const widths = [2, 3, 5, 2, 3, 2, 5, 3];
    let x = 0, i = 0;
    while (x < 175) { const w = widths[i++ % widths.length]; out.push({ x, w }); x += w + 3; }
    return out;
  }, []);
  return <svg width="180" height="60"><g fill="#C6F432">{bars.map((b) => <rect key={b.x} x={b.x} width={b.w} height="60" />)}</g></svg>;
}

function Qr() {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90"><rect x="5" y="5" width="80" height="80" rx="12" fill="#fff" />
      <g fill="#05080F"><rect x="14" y="14" width="20" height="20" rx="3" /><rect x="56" y="14" width="20" height="20" rx="3" /><rect x="14" y="56" width="20" height="20" rx="3" /><rect x="40" y="40" width="8" height="8" /><rect x="56" y="56" width="8" height="8" /><rect x="68" y="66" width="8" height="10" /><rect x="40" y="62" width="8" height="14" /></g>
    </svg>
  );
}

const ITEMS: { art: React.ReactNode; cat: string; title: string; text: string; metric: string }[] = [
  { art: <Qr />, cat: "EM TEMPO REAL", title: "Pix cash-in", text: "QR Code dinâmico ou copia e cola, com confirmação instantânea por webhook.", metric: "CONFIRMAÇÃO · <3s" },
  { art: <span className="mono" style={{ fontSize: 32, color: "var(--lime)" }}>→ R$</span>, cat: "PAGAMENTOS", title: "Pix cash-out", text: "Pague fornecedores e faça saques para qualquer chave Pix, a qualquer hora.", metric: "SAQUE · D+0" },
  { art: <Barcode />, cat: "BOLETO", title: "Boleto registrado", text: "Emita pelo painel ou API, com baixa automática e conciliação.", metric: "REGISTRADO · API" },
  { art: <span className="mono" style={{ fontSize: 13 }}>PJ · <b style={{ color: "var(--lime)" }}>NOMINAL</b> · PF</span>, cat: "CONTA", title: "Conta digital nominal", text: "Conta no seu CPF ou CNPJ, com sócios, representantes e limites configuráveis.", metric: "PF · MEI · PJ" },
  { art: <span className="mono" style={{ color: "var(--cyan)" }}>POST /graphql</span>, cat: "DESENVOLVEDORES", title: "API Pix", text: "Envio e consulta Pix com JWT, e confirmação bancária para conciliar pedidos.", metric: "GRAPHQL · JWT" },
  { art: <span style={{ fontSize: 15 }}>🛒 Pedido #4821 · <b style={{ color: "var(--lime)" }}>Pix aprovado</b></span>, cat: "E-COMMERCE", title: "Checkout WooCommerce", text: "Plugue sua loja WordPress e receba por Pix com métricas por integração.", metric: "PLUGIN OFICIAL" },
];

export function Solutions() {
  const track = useRef<HTMLDivElement>(null);
  const slide = (d: number) => track.current?.scrollBy({ left: d * 360, behavior: "smooth" });
  return (
    <section id="solucoes">
      <div className="wrap">
        <div className="head">
          <div><span className="eyebrow"><span className="n">01</span> Soluções</span><h2>Tudo para receber,<br />pagar e <span className="hl">crescer</span>.</h2></div>
          <div>
            <p className="lead">Seis produtos conectados ao mesmo saldo, ao mesmo painel e à mesma API.</p>
            <div className="sol-nav" style={{ marginTop: 20 }}>
              <button onClick={() => slide(-1)} aria-label="Anterior">←</button>
              <button onClick={() => slide(1)} aria-label="Próximo">→</button>
            </div>
          </div>
        </div>
        <div className="sol-track" ref={track}>
          {ITEMS.map((s, i) => (
            <div className="sol" key={s.title}>
              <span className="num">0{i + 1} / 06</span>
              <div className="art">{s.art}</div>
              <span className="cat">{s.cat}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="metric"><span>{s.metric}</span><span className="sol-arrow">→</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
