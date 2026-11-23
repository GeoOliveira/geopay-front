import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Sections";
import { SvgDefs, Topo } from "./SvgDefs";

type Props = {
  crumb: string;
  kicker: string;
  title: React.ReactNode;
  lead: string;
  meta?: string[];
  children: React.ReactNode;
};

export function PageShell({ crumb, kicker, title, lead, meta, children }: Props) {
  return (
    <>
      <SvgDefs />
      <Header />
      <main>
        <section className="page-hero">
          <Topo opacity={0.45} />
          <div className="wrap z">
            <div className="crumbs"><Link href="/">GEOPAY</Link>/<b>{crumb.toUpperCase()}</b></div>
            <span className="eyebrow">{kicker}</span>
            <h1>{title}</h1>
            <p className="lead">{lead}</p>
            {meta && <div className="meta-row">{meta.map((m) => <span key={m}>{m}</span>)}</div>}
          </div>
        </section>
        <div className="wrap">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export type LegalSection = { title: string; intro?: React.ReactNode; clauses?: React.ReactNode[]; groups?: { title: string; clauses: React.ReactNode[] }[] };

export function LegalDoc({ intro, sections }: { intro: React.ReactNode; sections: LegalSection[] }) {
  let n = 0;
  return (
    <div className="doc">
      <aside className="toc">
        <p>NAVEGUE PELO DOCUMENTO</p>
        {sections.map((s, i) => (
          <a key={s.title} href={`#s${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</a>
        ))}
      </aside>
      <article className="doc-body">
        <div className="doc-intro">{intro}</div>
        {sections.map((s, i) => {
          n = 0;
          const num = i + 1;
          const clause = (c: React.ReactNode) => { n += 1; return <div className="clause" key={n}><span>{num}.{n}</span><div>{c}</div></div>; };
          return (
            <section className="doc-sec" id={`s${num}`} key={s.title} style={{ padding: 0 }}>
              <h2><span>{String(num).padStart(2, "0")}</span>{s.title}</h2>
              {s.intro && <p>{s.intro}</p>}
              {s.clauses?.map(clause)}
              {s.groups?.map((g) => (
                <div key={g.title}><h3>{g.title}</h3>{g.clauses.map(clause)}</div>
              ))}
            </section>
          );
        })}
      </article>
    </div>
  );
}
