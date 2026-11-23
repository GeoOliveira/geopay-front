"use client";
import { useState } from "react";
import { LINKS } from "@/data/content";
import { Topo } from "./SvgDefs";

const C = ({ c, children }: { c: string; children: React.ReactNode }) => <span className={c}>{children}</span>;

const SNIPPETS: Record<string, React.ReactNode> = {
  curl: (
    <>
      <C c="c"># Gera uma cobrança Pix com QR Code dinâmico</C>{"\n"}
      <C c="k">curl</C> -X POST https://api.geopay.digital/v1/pix/qr-code \{"\n"}
      {"  "}-H <C c="s">&quot;x-api-key: gp_live_••••••••&quot;</C> \{"\n"}
      {"  "}-H <C c="s">&quot;x-signature: 9f2c…a71e&quot;</C> \{"\n"}
      {"  "}-H <C c="s">&quot;Content-Type: application/json&quot;</C> \{"\n"}
      {"  "}-d <C c="s">{`'{\n    "amount": `}<C c="n">289.90</C>{`,\n    "description": "Pedido #10482",\n    "expiresIn": `}<C c="n">900</C>{`\n  }'`}</C>
    </>
  ),
  node: (
    <>
      <C c="k">const</C> res = <C c="k">await</C> fetch(<C c="s">&quot;https://api.geopay.digital/v1/pix/qr-code&quot;</C>, {"{"}{"\n"}
      {"  "}method: <C c="s">&quot;POST&quot;</C>,{"\n"}
      {"  "}headers: {"{"} <C c="s">&quot;x-api-key&quot;</C>: process.env.GEOPAY_KEY, <C c="s">&quot;x-signature&quot;</C>: signature {"}"},{"\n"}
      {"  "}body: JSON.stringify({"{"} amount: <C c="n">289.90</C>, description: <C c="s">&quot;Pedido #10482&quot;</C> {"}"}),{"\n"}
      {"}"});{"\n\n"}
      <C c="k">const</C> qr = <C c="k">await</C> res.json();{"\n"}
      console.log(qr.emv); <C c="c">{"// 00020126…6304A1F3"}</C>
    </>
  ),
  php: (
    <>
      <C c="k">$ch</C> = curl_init(<C c="s">&apos;https://api.geopay.digital/v1/pix/qr-code&apos;</C>);{"\n"}
      curl_setopt_array(<C c="k">$ch</C>, [{"\n"}
      {"  "}CURLOPT_POST =&gt; <C c="k">true</C>,{"\n"}
      {"  "}CURLOPT_HTTPHEADER =&gt; [<C c="s">&apos;x-api-key: &apos;</C> . getenv(<C c="s">&apos;GEOPAY_KEY&apos;</C>)],{"\n"}
      {"  "}CURLOPT_POSTFIELDS =&gt; json_encode([<C c="s">&apos;amount&apos;</C> =&gt; <C c="n">289.90</C>]),{"\n"}
      ]);{"\n"}
      <C c="k">echo</C> curl_exec(<C c="k">$ch</C>);
    </>
  ),
  py: (
    <>
      <C c="k">import</C> os, requests{"\n\n"}
      res = requests.post({"\n"}
      {"    "}<C c="s">&quot;https://api.geopay.digital/v1/pix/qr-code&quot;</C>,{"\n"}
      {"    "}headers={"{"}<C c="s">&quot;x-api-key&quot;</C>: os.environ[<C c="s">&quot;GEOPAY_KEY&quot;</C>]{"}"},{"\n"}
      {"    "}json={"{"}<C c="s">&quot;amount&quot;</C>: <C c="n">289.90</C>, <C c="s">&quot;description&quot;</C>: <C c="s">&quot;Pedido #10482&quot;</C>{"}"},{"\n"}
      ){"\n"}
      <C c="k">print</C>(res.json()[<C c="s">&quot;emv&quot;</C>])
    </>
  ),
};

const RESPONSE = (
  <>
    <C c="c"># → 201 Created · 142ms</C>{"\n"}
    {"{\n  "}<C c="s">&quot;id&quot;</C>: <C c="s">&quot;qr_7Hk2mP9x&quot;</C>,{"\n  "}
    <C c="s">&quot;status&quot;</C>: <C c="s">&quot;ACTIVE&quot;</C>,{"\n  "}
    <C c="s">&quot;amount&quot;</C>: <C c="n">289.90</C>,{"\n  "}
    <C c="s">&quot;emv&quot;</C>: <C c="s">&quot;00020126580014br.gov.bcb.pix…6304A1F3&quot;</C>{"\n}"}
  </>
);

const TABS = [["curl", "cURL"], ["node", "Node.js"], ["php", "PHP"], ["py", "Python"]] as const;

export function Developers() {
  const [tab, setTab] = useState<string>("curl");
  const [ran, setRan] = useState(false);
  return (
    <section id="dev" style={{ background: "var(--ink-2)", borderBlock: "1px solid var(--line)" }}>
      <Topo opacity={0.4} />
      <div className="wrap dev-grid z">
        <div>
          <span className="eyebrow"><span className="n">04</span> Desenvolvedores</span>
          <h2>Integre em minutos.<br /><span className="hl">Escale sem limite.</span></h2>
          <p className="lead">API REST versionada, documentação interativa em Swagger e webhooks para cada evento.</p>
          <div className="dx-stats">
            <div><b>5 min</b><span>PARA A 1ª COBRANÇA</span></div>
            <div><b>REST</b><span>API VERSIONADA /V1</span></div>
            <div><b>HMAC</b><span>REQUISIÇÕES ASSINADAS</span></div>
            <div><b>99,9%</b><span>SLA DA API</span></div>
          </div>
          <ul className="checks">
            <li>Webhooks com reenvio automático em caso de falha</li>
            <li>Consulta de saldo e limites em tempo real</li>
            <li>Ambiente sandbox para testar sem custo</li>
          </ul>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <a href={LINKS.docs} className="btn btn-primary">Ler a documentação →</a>
            <a href={LINKS.docs} className="btn btn-ghost">Abrir sandbox</a>
          </div>
        </div>
        <div className="code">
          <div className="code-top"><i /><i /><i /><span className="ep"><em>POST</em>/v1/pix/qr-code</span></div>
          <div className="tabs">
            {TABS.map(([k, l]) => (
              <button key={k} className={tab === k && !ran ? "on" : ""} onClick={() => { setTab(k); setRan(false); }}>{l}</button>
            ))}
          </div>
          <pre>{ran ? RESPONSE : SNIPPETS[tab]}</pre>
          <div className="resp"><span className="ok">● 201 Created</span><span>142ms</span><span>1,2 KB</span><button onClick={() => setRan(true)}>▶ EXECUTAR</button></div>
        </div>
      </div>
    </section>
  );
}
