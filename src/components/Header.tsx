import Image from "next/image";
import { LINKS } from "@/data/content";

export function Header() {
  return (
    <>
      <div className="notice">
        ⚡ <b>Novo:</b> plugin oficial para WooCommerce — receba por Pix no checkout da sua loja.{" "}
        <a href="#integracoes"><u>Saiba mais →</u></a>
      </div>
      <nav>
        <div className="wrap">
          <a href="#" className="logo" aria-label="Geopay">
            <Image src="/logo-geopay.png" alt="Geopay" width={136} height={32} priority />
          </a>
          <div className="menu">
            <a href="#solucoes">Soluções</a>
            <a href="#dev">Desenvolvedores</a>
            <a href="#tarifas">Tarifas</a>
            <a href="#seguranca">Segurança</a>
            <a href="#faq">Ajuda</a>
          </div>
          <div className="nav-cta">
            <a href={LINKS.login} className="btn btn-ghost">Entrar</a>
            <a href={LINKS.signup} className="btn btn-primary">Criar conta →</a>
          </div>
        </div>
      </nav>
    </>
  );
}
