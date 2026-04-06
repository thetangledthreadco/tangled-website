import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Tangled Thread Co. Questions about custom orders, drops, or anything else.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            Contact
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brown font-light">
            Say hello
          </h1>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-oat">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="font-sans text-base text-muted leading-relaxed mb-10 max-w-sm">
              Have a question about a custom order, a drop, or anything else? Instagram DM
              is the fastest way to reach me - or use the form and I&apos;ll get back to you
              within 1–2 business days.
            </p>

            <div className="space-y-8">
              <div>
                <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-2">
                  Instagram (fastest)
                </p>
                <a
                  href="https://instagram.com/the.tangled.thread.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-rose hover:text-rose-dark transition-colors font-medium"
                >
                  @the.tangled.thread.co ↗
                </a>
              </div>
              <div>
                <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:thetangledthreadco@gmail.com"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  thetangledthreadco@gmail.com
                </a>
              </div>
              <div>
                <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-2">
                  Custom Orders
                </p>
                <Link
                  href="/custom"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  Use the order form →
                </Link>
              </div>
              <div>
                <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-2">
                  Shopify Store
                </p>
                <a
                  href="https://shop.thetangledthreadco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  shop.thetangledthreadco.com ↗
                </a>
              </div>
              <div>
                <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-2">
                  Questions &amp; Answers
                </p>
                <Link
                  href="/faq"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  Browse the FAQ →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-warm-white p-8 md:p-10 border border-border">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
