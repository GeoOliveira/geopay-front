import Link from "next/link";
import Image from "next/image";
import { FAQ, LINKS, type Plan } from "@/data/content";
import { Topo } from "./SvgDefs";

export function HowItWorks() {
  const steps = [
    ["~2 min", "Crie sua conta", "CPF ou CNPJ, e-mail e telefone validados na hora por SMS."],
    ["~3 min", "Verifique a identidade", "Envie documentos e selfie. KYC automatizado e análise cadastral."],
    ["~1 min", "Escolha o plano", "Confira as condições da conta e solicite acesso à integração."],
    ["agora", "Comece a receber", "Cobre pelo painel, pela API ou pelo checkout da sua loja."],
  ];
  return (
    <section>
      <div className="wrap">
        <div className="head">
          <div><span className="eyebrow"><span className="n">03</span> Como funciona</span><h2>Do cadastro ao<br />primeiro Pix.</h2></div>
          <p className="lead">Onboarding 100% digital. Sem papelada, sem agência, sem fila.</p>
        </div>
        <div className="route">
          {steps.map(([t, h, p], i) => (
            <div className="step" key={h}>
              <div className="dot">ETAPA 0{i + 1}<span>{t}</span></div>
              <h4>{h}</h4><p>{p}</p>
              <div className="bar"><i style={{ width: `${(i + 1) * 25}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Integrations() {
  const items = [
    { lg: "Wo", bg: "#7f54b3", color: "#fff", h: "WooCommerce", p: "Pix no checkout da sua loja WordPress.", soon: false },
    { lg: "{ }", bg: "var(--ink-4)", color: "var(--lime)", h: "API GraphQL", p: "Envio e consulta Pix com autenticação JWT.", soon: false },
    { lg: "⇄", bg: "var(--ink-4)", color: "var(--cyan)", h: "Conciliação", p: "Confirmações bancárias relacionadas aos pedidos.", soon: false },
    { lg: "+", bg: "var(--ink-4)", color: "var(--muted)", h: "Outras plataformas", p: "Shopify, Nuvemshop e mais.", soon: true },
  ];
  return (
    <section id="integracoes">
      <div className="wrap">
        <div className="head">
          <div><span className="eyebrow"><span className="n">05</span> Integrações</span><h2>Conecte onde<br />você já vende.</h2></div>
          <p className="lead">Plugins prontos e uma API aberta para qualquer plataforma.</p>
        </div>
        <div className="int-grid">
          {items.map((it) => (
            <div className="int" key={it.h}>
              <div className="lg" style={{ background: it.bg, color: it.color }}>{it.lg}</div>
              <h4>{it.h}</h4><p>{it.p}</p>
              <span className={`st${it.soon ? " soon" : ""}`}>{it.soon ? "○ EM BREVE" : "● DISPONÍVEL"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({ plans }: { plans: Plan[] }) {
  return (
    <section id="tarifas" style={{ background: "var(--ink-2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="head" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
          <div><span className="eyebrow"><span className="n">06</span> Tarifas</span><h2>Preço justo.<br />Sem letra miúda.</h2></div>
          <p className="lead" style={{ maxWidth: 520 }}>Confirme tarifas, limites e recursos disponíveis com a equipe. As condições dependem da contratação.</p>
          {plans.some((plan) => plan.illustrative) ? <p>Valores de exemplo para apresentação. Não representam uma oferta contratada.</p> : null}
        </div>
        <div className="price-grid">
          {plans.map((p) => (
            <div key={p.id} className={`price${p.featured ? " feat" : ""}`}>
              <span className="pl">{p.label}</span>
              <div className="fee">{p.fee}<small> {p.unit}</small></div>
              <span className="sub">{p.sub}</span>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href={LINKS.signup} className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const rows: [string, string, string, boolean?][] = [
    ["Dinheiro na conta", "Na hora (D+0)", "D+30 ou antecipação paga"],
    ["Taxa por venda", "Conforme contratação", "Conforme o fornecedor"],
    ["Chargeback", "Não existe no Pix", "Risco constante"],
    ["Conta nominal no seu CNPJ", "✓ Sim", "✕ Conta bolsão", true],
    ["Acesso à API", "Mediante habilitação", "Conforme o fornecedor"],
    ["Mensalidade", "R$ 0", "R$ 30 – R$ 150"],
  ];
  return (
    <section>
      <div className="wrap">
        <div className="head">
          <div><span className="eyebrow"><span className="n">07</span> Comparativo</span><h2>Por que a Geopay?</h2></div>
          <p className="lead">Compare com maquininhas e processadoras de cartão tradicionais.</p>
        </div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead><tr><th>RECURSO</th><th>GEOPAY</th><th>TRADICIONAL</th></tr></thead>
            <tbody>
              {rows.map(([a, b, c, no]) => (
                <tr key={a}><td>{a}</td><td className="yes">{b}</td><td className={no ? "no" : undefined}>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Security() {
  const items = [
    ["◎", "Conta nominal", "O dinheiro fica no seu CPF ou CNPJ, nunca numa conta bolsão de terceiros."],
    ["⚿", "Autenticação em dois fatores", "Código por SMS ou e-mail em cada acesso e operação sensível."],
    ["☰", "KYC e prevenção à fraude", "Validação de documentos, verificação PEP e revisão cadastral contínua."],
    ["▣", "Limites e bloqueio imediato", "Defina limites por operação e bloqueie a conta em um clique."],
  ];
  return (
    <section id="seguranca" style={{ background: "var(--ink-2)", borderBlock: "1px solid var(--line)" }}>
      <div className="wrap sec-grid">
        <div className="shield">
          <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
          <div className="lock">
            <svg width="50%" viewBox="0 0 24 24" fill="none" stroke="#05080F" strokeWidth="2.2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          </div>
          <span className="orb" style={{ top: "4%", left: "40%" }}>MFA</span>
          <span className="orb" style={{ top: "30%", right: "-2%" }}>KYC</span>
          <span className="orb" style={{ bottom: "22%", right: "4%" }}>PLD/FT</span>
          <span className="orb" style={{ bottom: "6%", left: "20%" }}>LGPD</span>
          <span className="orb" style={{ top: "40%", left: "-4%" }}>JWT</span>
        </div>
        <div>
          <span className="eyebrow"><span className="n">08</span> Segurança</span>
          <h2>Seu dinheiro protegido em cada coordenada.</h2>
          <div className="sec-list">
            {items.map(([i, b, p]) => (
              <div className="sec-item" key={b}><span className="ic">{i}</span><div><b>{b}</b><p>{p}</p></div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <div className="cta" id="contato">
      <Topo opacity={0.12} style={{ filter: "invert(1)" }} />
      <div className="cta-grid">
        <div>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".16em" }}>VAMOS CONVERSAR</span>
          <h2 style={{ marginTop: 14 }}>Coloque o seu negócio no mapa do Pix.</h2>
          <p>Conte como é a sua operação. A gente mostra o caminho mais curto até o seu primeiro Pix recebido.</p>
          <a href={LINKS.signup} className="btn btn-primary">Criar minha conta grátis →</a>
          <div className="cta-list"><span>✓ Sem mensalidade</span><span>✓ Onboarding em 5 min</span><span>✓ Suporte humano</span></div>
        </div>
        <div className="cta-stats">
          <div><b>24/7</b><span>PIX TODOS OS DIAS</span></div>
          <div><b>D+0</b><span>SALDO DISPONÍVEL NA HORA</span></div>
          <div><b>99,9%</b><span>DISPONIBILIDADE</span></div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq">
      <div className="wrap faq-grid">
        <div>
          <span className="eyebrow"><span className="n">09</span> Ajuda</span>
          <h2>Tudo o que você quer saber.</h2>
          <p className="lead">Não achou sua pergunta? Fale com a gente.</p>
          <div className="help">
            <a href={LINKS.docs}><div>Documentação técnica<small>GRAPHQL · PIX · CONCILIAÇÃO</small></div>↗</a>
            <a href="#contato"><div>Falar com especialista<small>RESPOSTA EM ATÉ 2H ÚTEIS</small></div>↗</a>
            <Link href="/contato"><div>Central de ajuda<small>TUTORIAIS E GUIAS</small></div>↗</Link>
          </div>
        </div>
        <div>
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary><span className="q">{String(i + 1).padStart(2, "0")}</span>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 16 }}>
              <Image src="/logo-geopay.png" alt="Geopay" width={136} height={32} />
            </Link>
            <p style={{ maxWidth: 300 }}>Gateway de pagamento Pix, conta digital e API para negócios que querem receber sem fricção.</p>
          </div>
          <div><h5>Produtos</h5><Link href="/#solucoes">Pix cash-in</Link><Link href="/#solucoes">Pix cash-out</Link><Link href="/#solucoes">Boleto</Link><Link href="/#solucoes">Conta digital</Link><Link href="/#integracoes">WooCommerce</Link></div>
          <div><h5>Desenvolvedores</h5><a href={LINKS.docs}>Documentação</a><a href={LINKS.docs}>Referência da API</a><a href={`${LINKS.docs}#confirmacao`}>Confirmação Pix</a><a href="/contato">Solicitar acesso</a></div>
          <div><h5>Atendimento</h5><Link href="/contato">Contato</Link><Link href="/denuncia">Denúncia</Link><Link href="/reembolso">Reembolso</Link><Link href="/exclusao-de-conta">Exclusão de conta</Link></div>
          <div><h5>Legal</h5><Link href="/termos-de-compra">Termos de compra</Link><Link href="/politica-de-privacidade">Política de privacidade</Link></div>
        </div>
        <div className="legal mono"><span>© {new Date().getFullYear()} Geopay · CNPJ 51.274.896/0001-38</span><span>Feito no Brasil 🇧🇷</span></div>
        <div className="mega">geopay</div>
      </div>
    </footer>
  );
}
