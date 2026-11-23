"use client";
import { useEffect, useMemo, useState } from "react";

const NAMES = ["Loja Aurora", "Studio Pixel", "Café Mapa", "Nebula Store", "Orbe&Co", "Veloz Log", "Casa Norte", "Rota Sul"];
const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
type Row = { id: number; boleto: boolean; name: string; value: number };

let seq = 0;
const makeRow = (): Row => ({ id: seq++, boleto: Math.random() < 0.2, name: NAMES[Math.floor(Math.random() * NAMES.length)], value: Math.random() * 1800 + 20 });

export function LiveOps() {
  const [rows, setRows] = useState<Row[]>([]);
  const [vol, setVol] = useState(2847650);
  const [tpm, setTpm] = useState(1284);

  useEffect(() => {
    setRows(Array.from({ length: 8 }, makeRow));
    const a = setInterval(() => {
      const r = makeRow();
      setRows((prev) => [r, ...prev].slice(0, 9));
      setVol((v) => v + r.value);
    }, 2200);
    const b = setInterval(() => setTpm(1200 + Math.floor(Math.random() * 180)), 1500);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const dots = useMemo(() => {
    const out: [number, number][] = [];
    for (let y = 10; y < 150; y += 7)
      for (let x = 30; x < 190; x += 7) {
        const dx = (x - 110) / 70, dy = (y - 80) / 62;
        if (dx * dx + dy * dy < 1 && !(x > 165 && y < 50) && !(x < 55 && y > 110)) out.push([x, y]);
      }
    return out;
  }, []);

  return (
    <section className="ops">
      <div className="wrap">
        <div className="head">
          <div><span className="eyebrow"><span className="n">02</span> Painel financeiro</span><h2>Sua operação,<br />ao vivo.</h2></div>
          <p className="lead">Volume, aprovação, extrato e conciliação atualizados em tempo real. Exatamente o que você vê no painel Geopay.</p>
        </div>
        <div className="ops-grid">
          <div className="panel p-vol">
            <div className="lbl"><span>VOLUME PROCESSADO · HOJE</span><span className="live">AO VIVO</span></div>
            <div className="big">R$ {Math.round(vol).toLocaleString("pt-BR")}</div>
            <div className="kpis">
              <div><b>{tpm.toLocaleString("pt-BR")}</b><span>TRANSAÇÕES/MIN</span></div>
              <div><b>98,7%</b><span>TAXA DE APROVAÇÃO</span></div>
              <div><b>142ms</b><span>LATÊNCIA MÉDIA</span></div>
            </div>
            <svg className="spark" viewBox="0 0 400 90" preserveAspectRatio="none">
              <path d="M0 70 L30 62 60 66 90 50 120 54 150 40 180 46 210 30 240 36 270 22 300 28 330 14 360 18 400 6 V90 H0Z" fill="url(#g)" />
              <path d="M0 70 L30 62 60 66 90 50 120 54 150 40 180 46 210 30 240 36 270 22 300 28 330 14 360 18 400 6" fill="none" stroke="#C6F432" strokeWidth="2" />
            </svg>
          </div>
          <div className="panel p-stream">
            <div className="lbl"><span>TRANSAÇÕES · STREAM</span><span className="live">AO VIVO</span></div>
            <div className="stream">
              {rows.map((r, i) => (
                <div className="row" key={r.id}>
                  <div>
                    <span className={`tag${r.boleto ? " b" : ""}`}>{r.boleto ? "BOLETO" : "PIX"} · IN</span>{r.name}
                    <div className="t">{i === 0 ? "agora" : `há ${i * 3}s`}</div>
                  </div>
                  <b>+R$ {fmt(r.value)}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-map">
            <div className="lbl"><span>REDE · BRASIL</span><span>27 UFs</span></div>
            <svg viewBox="0 0 200 150" style={{ width: "100%", marginTop: 14 }}>
              <g fill="#24304b">{dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />)}</g>
              <g fill="#C6F432"><circle cx="128" cy="104" r="3" /><circle cx="140" cy="98" r="2.5" /><circle cx="120" cy="118" r="2" /><circle cx="150" cy="70" r="2" /><circle cx="110" cy="82" r="2.5" /></g>
            </svg>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span><b style={{ color: "var(--lime)" }}>●</b> SP · RJ · MG</span><span>PR · BA · DF</span>
            </div>
          </div>
          <div className="panel p-uptime">
            <div className="lbl"><span>DISPONIBILIDADE · 90D</span></div>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-.04em", marginTop: 10 }}>99,98%</div>
            <div className="uptime">{Array.from({ length: 45 }, (_, i) => <i key={i} className={i === 17 || i === 33 ? "w" : undefined} />)}</div>
            <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>TODOS OS SISTEMAS OPERACIONAIS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
