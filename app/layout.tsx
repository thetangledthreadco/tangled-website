import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Tangled Thread Co.",
    default: "The Tangled Thread Co. - Custom Embroidery & Upcycled Drops",
  },
  description:
    "Handmade custom embroidery on sweaters, blankets, and more. Shop one-of-a-kind upcycled drops. Small-batch. Made with care.",
  metadataBase: new URL("https://thetangledthreadco.com"),
  openGraph: {
    siteName: "The Tangled Thread Co.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${pacifico.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
