import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drops",
  description:
    "One-of-a-kind upcycled clothing drops. Each piece is unique. Once it's gone, it's gone.",
};

export default function DropsPage() {
  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Upcycled Drops
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight mb-4">
              The current drop
            </h1>
            <p className="font-sans text-base text-muted max-w-md leading-relaxed">
              One-of-a-kind upcycled pieces. Each item is unique. When it&apos;s gone,
              it&apos;s gone. Checkout happens through the Shopify store.
            </p>
          </div>
          <a
            href="https://shop.thetangledthreadco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center self-start md:self-auto px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors shrink-0 tracking-wide"
          >
            View Full Drop on Shopify
          </a>
        </div>
      </section>

      {/* Coming soon */}
      <section className="w-full px-6 md:px-12 py-28 md:py-40 bg-oat">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-brown font-light mb-6">
            Something good is in the works.
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed mb-10">
            The next drop is being sourced and reworked. Follow on Instagram to be
            the first to know when it lands.
          </p>
          <a
            href="https://instagram.com/the.tangled.thread.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-brown text-brown font-sans font-medium text-sm rounded hover:bg-cream transition-colors tracking-wide"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-6 md:px-12 py-20 bg-cream border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brown font-light mb-4">
            Want something made just for you?
          </h2>
          <p className="font-sans text-sm text-muted mb-8 leading-relaxed">
            Drops are limited, but custom orders are always open.
          </p>
          <Link
            href="/custom"
            className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
          >
            Start a Custom Order
          </Link>
        </div>
      </section>
    </>
  );
}
