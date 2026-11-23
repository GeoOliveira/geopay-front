import { LINKS } from "@/data/content";
import { BrazilMap } from "./BrazilMap";
import { Topo } from "./SvgDefs";

export function Hero() {
  return (
    <section className="hero">
      <Topo />
      <div className="wrap z">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Gateway de pagamento · Pix em tempo real</span>
            <h1><span className="hl">Gateway de pagamento</span> via Pix que o seu negócio pode confiar.</h1>
            <p className="lead">
              Receba em segundos pelo painel, pela API ou direto no checkout da sua loja. Conta nominal PF e PJ,
              boletos e conciliação automática, sobre infraestrutura bancária regulada.
            </p>
            <div className="hero-actions">
              <a href={LINKS.signup} className="btn btn-primary">Começar a receber agora →</a>
              <a href="#contato" className="btn btn-ghost">Falar com especialista</a>
            </div>
          </div>
          <BrazilMap />
        </div>
        <div className="hero-stats">
          <div><b>24/7</b><span>PIX TODOS OS DIAS</span></div>
          <div><b>&lt; 3s</b><span>CONFIRMAÇÃO DE PAGAMENTO</span></div>
          <div><b>99,9%</b><span>DISPONIBILIDADE DA API</span></div>
          <div><b>D+0</b><span>DINHEIRO DISPONÍVEL</span></div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    ["⛨", "Infraestrutura bancária regulada"],
    ["◎", "Conta nominal PF & PJ"],
    ["⚿", "Autenticação MFA"],
    ["☰", "KYC & PLD"],
    ["⌂", "LGPD"],
  ];
  return (
    <div className="trust">
      <div className="wrap">
        <p>Segurança e conformidade</p>
        <div className="badges">
          {items.map(([i, t]) => <span key={t} className="badge"><i>{i}</i>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
