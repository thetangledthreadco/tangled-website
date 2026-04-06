import type { Metadata } from "next";
import FaqClient from "@/components/faq/FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about custom orders, drops, shipping, and more from The Tangled Thread Co.",
};

export default function FaqPage() {
  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            FAQ
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brown font-light">
            Questions &amp; answers
          </h1>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-oat">
        <FaqClient />
      </section>
    </>
  );
}
