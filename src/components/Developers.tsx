"use client";
import { useState } from "react";
import { LINKS } from "@/data/content";
import { Topo } from "./SvgDefs";

const LOOKUP_QUERY = `query ConsultarPix($input: FindPixsByAuthCodeRequest!) {
  findPixByAuth(input: $input) {
    __typename
    ... on PixByAuthCode { authenticationCode status }
    ... on Error { code message }
  }
}`;
const LOOKUP_VARIABLES = { input: { authCode: "<CODIGO_DE_AUTENTICACAO>" } };
const REQUEST = JSON.stringify({ query: LOOKUP_QUERY, variables: LOOKUP_VARIABLES });

const SNIPPETS = {
  curl: `# Endpoint e JWT fornecidos para seu ambiente
curl --request POST "$GEOPAY_GRAPHQL_URL" \\
  --header "Authorization: Bearer $GEOPAY_ACCESS_TOKEN" \\
  --header "Content-Type: application/json" \\
  --data '${REQUEST}'`,
  node: `// Consulta no servidor da sua integração
const query = ${JSON.stringify(LOOKUP_QUERY)};
const variables = ${JSON.stringify(LOOKUP_VARIABLES)};
const res = await fetch(process.env.GEOPAY_GRAPHQL_URL, {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.GEOPAY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query, variables }),
});
const body = await res.json();
if (!res.ok || body.errors?.length ||
    body.data?.findPixByAuth?.__typename !== "PixByAuthCode") {
  throw new Error("Consulta recusada ou sem resultado.");
}
console.log(body.data.findPixByAuth);`,
  php: `<?php
$ch = curl_init(getenv('GEOPAY_GRAPHQL_URL'));
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . getenv('GEOPAY_ACCESS_TOKEN'),
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => '${REQUEST}',
]);
$raw = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if ($raw === false) throw new RuntimeException('Falha de conexão.');
$body = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
if ($http < 200 || $http >= 300 || !empty($body['errors']) ||
    ($body['data']['findPixByAuth']['__typename'] ?? '') !== 'PixByAuthCode') {
  throw new RuntimeException('Consulta recusada ou sem resultado.');
}
print_r($body['data']['findPixByAuth']);`,
  py: `import os, requests

query = ${JSON.stringify(LOOKUP_QUERY)}
res = requests.post(
    os.environ["GEOPAY_GRAPHQL_URL"],
    headers={"Authorization": "Bearer " + os.environ["GEOPAY_ACCESS_TOKEN"]},
    json={"query": query, "variables": ${JSON.stringify(LOOKUP_VARIABLES)}},
    timeout=15,
)
res.raise_for_status()
body = res.json()
result = (body.get("data") or {}).get("findPixByAuth") or {}
if body.get("errors") or result.get("__typename") != "PixByAuthCode":
    raise RuntimeError("Consulta recusada ou sem resultado.")
print(result)`,
};

const RESPONSE = JSON.stringify({
  data: {
    findPixByAuth: {
      __typename: "PixByAuthCode",
      authenticationCode: "<CODIGO_DE_AUTENTICACAO>",
      status: "<ESTADO_RETORNADO_PELO_PARCEIRO>",
    },
  },
}, null, 2);
const TABS = [["curl", "cURL"], ["node", "Node.js"], ["php", "PHP"], ["py", "Python"]] as const;

export function Developers() {
  const [tab, setTab] = useState<keyof typeof SNIPPETS>("curl");
  const [showResponse, setShowResponse] = useState(false);
  return (
    <section id="dev" style={{ background: "var(--ink-2)", borderBlock: "1px solid var(--line)" }}>
      <Topo opacity={0.4} />
      <div className="wrap dev-grid z">
        <div>
          <span className="eyebrow"><span className="n">04</span> Desenvolvedores</span>
          <h2>Conheça o contrato.<br /><span className="hl">Integre seu Pix.</span></h2>
          <p className="lead">Operações GraphQL para envio e consulta Pix, com autenticação JWT e um guia de conciliação de recebimentos.</p>
          <div className="dx-stats">
            <div><b>GraphQL</b><span>OPERAÇÕES PIX</span></div>
            <div><b>JWT</b><span>ACESSO AUTENTICADO</span></div>
            <div><b>Consulta</b><span>CÓDIGO DE AUTENTICAÇÃO</span></div>
            <div><b>Guia</b><span>ENVIO E CONFIRMAÇÃO</span></div>
          </div>
          <ul className="checks">
            <li>Exemplos de envio e consulta por código de autenticação</li>
            <li>Tratamento de erros GraphQL e expiração das sessões</li>
            <li>Solicite o endpoint e um ambiente autorizado para testes</li>
          </ul>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <a href={LINKS.docs} className="btn btn-primary">Ler a documentação →</a>
            <a href="/contato" className="btn btn-ghost">Solicitar acesso</a>
          </div>
        </div>
        <div className="code">
          <div className="code-top"><i /><i /><i /><span className="ep"><em>POST</em>/graphql · consulta Pix</span></div>
          <div className="tabs" role="group" aria-label="Linguagem do exemplo">
            {TABS.map(([key, label]) => (
              <button key={key} aria-pressed={tab === key && !showResponse} className={tab === key && !showResponse ? "on" : ""} onClick={() => { setTab(key); setShowResponse(false); }}>{label}</button>
            ))}
          </div>
          <pre tabIndex={0} aria-label={showResponse ? "Resposta Pix ilustrativa" : `Exemplo Pix em ${TABS.find(([key]) => key === tab)?.[1]}`}><code>{showResponse ? RESPONSE : SNIPPETS[tab]}</code></pre>
          <div className="resp"><span className="ok">Exemplo ilustrativo</span><button aria-pressed={showResponse} onClick={() => setShowResponse((value) => !value)}>{showResponse ? "Ver requisição" : "Ver resposta"}</button></div>
        </div>
      </div>
    </section>
  );
}
