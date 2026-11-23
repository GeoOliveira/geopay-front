import { SvgDefs } from "@/components/SvgDefs";
import { Header } from "@/components/Header";
import { Hero, TrustBar } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LiveOps } from "@/components/LiveOps";
import { Developers } from "@/components/Developers";
import { HowItWorks, Integrations, Pricing, Compare, Security, FinalCta, Faq, Footer } from "@/components/Sections";
import { SaleToast } from "@/components/SaleToast";
import { getPlans } from "@/lib/plans";

export default async function Home() {
  const plans = await getPlans();
  return (
    <>
      <SvgDefs />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Solutions />
        <LiveOps />
        <HowItWorks />
        <Developers />
        <Integrations />
        <Pricing plans={plans} />
        <Compare />
        <Security />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      <SaleToast />
    </>
  );
}
