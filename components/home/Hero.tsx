import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-32 pb-20 md:pb-28 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto">

        {/* Hero — Custom Embroidery */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-start">

          <div className="group relative overflow-hidden aspect-[4/5]">
            <Image
              src="/images/portfolio/portfolio-flatlay.jpeg"
              alt="Custom hand-embroidered sweaters laid flat"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
          </div>

          <div className="md:mt-16">
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted mb-4">
              Custom Embroidery · Spokane, WA
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-brown font-light leading-tight mb-5">
              Tell me what<br className="hidden sm:block" /> to stitch.
            </h1>
            <p className="font-sans text-sm text-muted leading-relaxed mb-2 max-w-sm">
              Custom hand-embroidered pieces made just for you — sweaters, rompers,
              blankets, and more. Submit your idea and I&apos;ll follow up to
              finalize every detail before getting started.
            </p>
            <p className="font-sans text-xs text-muted/70 mb-8">
              Sweaters starting at $45.
            </p>
            <Link
              href="/custom"
              className="group/cta inline-flex items-center gap-2 font-sans text-sm font-medium text-brown transition-colors duration-300 hover:text-rose"
            >
              Order Your Custom Piece
              <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
