import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://geopay.digital"),
  title: "Geopay | Gateway de pagamento via Pix",
  description:
    "Gateway de pagamento Pix com confirmação em segundos. Receba pelo painel, pela API ou no checkout da sua loja. Conta nominal PF e PJ, boletos e conciliação automática.",
  keywords: ["gateway de pagamento", "pix", "api pix", "boleto", "conta digital pj", "woocommerce pix"],
  openGraph: {
    title: "Geopay | Gateway de pagamento via Pix",
    description: "Receba por Pix em segundos, pelo painel, pela API ou no checkout da sua loja.",
    url: "https://geopay.digital",
    siteName: "Geopay",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
