"use client";
import { useEffect, useState } from "react";
import { BRAZIL_STATES } from "@/data/brazil-states";

const HOT: Record<string, number> = { SP: 0.55, RJ: 0.4, MG: 0.3, PR: 0.25, SC: 0.18, RS: 0.18, DF: 0.5, GO: 0.15, BA: 0.15, PE: 0.15 };
// Capitais no sistema de coordenadas do mapa (viewBox -3 -3 106 106). A primeira é o hub (São Paulo).
const CITIES: [number, number][] = [
  [69.6, 73.7], [78.3, 72.0], [76.4, 64.4], [66.5, 53.9], [90.2, 46.7], [99.2, 34.2],
  [90.1, 23.2], [35.8, 21.7], [64.9, 17.4], [58.0, 90.2], [63.0, 78.4], [45.7, 53.4],
];
const pct = (v: number) => `${(((v + 3) / 106) * 100).toFixed(1)}%`;

export function BrazilMap() {
  const [total, setTotal] = useState(284392);
  useEffect(() => {
    const id = setInterval(() => setTotal((t) => t + Math.floor(Math.random() * 900)), 1800);
    return () => clearInterval(id);
  }, []);
  const [hx, hy] = CITIES[0];

  return (
    <div className="radar">
      <svg className="br" viewBox="-3 -3 106 106" role="img" aria-label="Mapa do Brasil com pagamentos Pix em tempo real">
        <g className="ufs">
          {BRAZIL_STATES.map(({ uf, d }) => (
            <path key={uf} className={`uf${HOT[uf] ? " hot" : ""}`} d={d} style={{ "--h": HOT[uf] ?? 0 } as React.CSSProperties}>
              <title>{uf}</title>
            </path>
          ))}
        </g>
        <g fill="none" stroke="#C6F432" strokeWidth=".4" strokeLinecap="round">
          {CITIES.slice(1).map(([x, y], i) => (
            <path key={i} className="arc" style={{ animationDelay: `${i * 0.4}s` }}
              d={`M${x} ${y} Q${(x + hx) / 2} ${Math.min(y, hy) - 12} ${hx} ${hy}`} />
          ))}
        </g>
      </svg>
      <div className="br-label">
        <span className="flag"><i /></span>
        <div><b>BRASIL</b><small>27 UFs · cobertura nacional</small></div>
      </div>
      {CITIES.map(([x, y], i) => (
        <span key={i} className={`ping${i % 3 === 1 ? " c" : ""}`} style={{ left: pct(x), top: pct(y), animationDelay: `${i * 0.35}s` }} />
      ))}
      <div className="core">
        <small>RECEBIDO HOJE · BRASIL</small>
        <b>R$ {total.toLocaleString("pt-BR")}</b>
        <small style={{ color: "var(--muted)" }}>+18,4% vs ontem</small>
      </div>
      <div className="float f1"><span className="ic">✓</span><div>Pix aprovado<small>Loja Aurora · São Paulo</small></div><b style={{ color: "var(--lime)" }}>+R$ 289,90</b></div>
      <div className="float f2"><span className="ic" style={{ color: "var(--cyan)", background: "rgba(71,215,255,.12)" }}>⚡</span><div>Confirmado em<small>webhook entregue</small></div><b>1,8s</b></div>
      <div className="float f3"><span className="ic">↗</span><div>Saque realizado<small>conta nominal</small></div><b>R$ 12.400</b></div>
    </div>
  );
}
