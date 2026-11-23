import Link from "next/link";
import Image from "next/image";
import { LINKS } from "@/data/content";

export function Header() {
  return (
    <>
      <div className="notice">
        ⚡ <b>Novo:</b> plugin oficial para WooCommerce — receba por Pix no checkout da sua loja.{" "}
        <Link href="/#integracoes"><u>Saiba mais →</u></Link>
      </div>
      <nav>
        <div className="wrap">
          <Link href="/" className="logo" aria-label="Geopay">
            <Image src="/logo-geopay.png" alt="Geopay" width={136} height={32} priority />
          </Link>
          <div className="menu">
            <Link href="/#solucoes">Soluções</Link>
            <Link href="/#dev">Desenvolvedores</Link>
            <Link href="/#tarifas">Tarifas</Link>
            <Link href="/#seguranca">Segurança</Link>
            <Link href="/#faq">Ajuda</Link>
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
