import Link from "next/link";
import HeroPreviewInteractive from "./HeroPreviewInteractive";

export default function Hero() {
  return (
    <section className="w-full pt-28 md:pt-32 pb-16 md:pb-28 px-6 md:px-12 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
          {/* Copy: second on mobile (preview leads), first on desktop */}
          <div className="order-2 md:order-1">
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-rose mb-4 font-medium">
              Custom Designer · Play with it
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-brown font-light leading-tight mb-5">
              Design it.<br className="hidden sm:block" /> Watch it come to life.
            </h1>
            <p className="font-sans text-base text-ink/80 leading-relaxed mb-3 max-w-md">
              Pick the sweater, the yarn color, and the name, and see your custom
              piece come together in real time, before you ever hit order.
            </p>
            <p className="font-sans text-sm text-muted leading-relaxed mb-8 max-w-md">
              Baby, toddler, big kid, and adult sweaters. Rompers, blankets, and
              denim too. Everything hand-stitched in Spokane.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/custom#pricing"
                className="font-sans text-sm text-brown hover:text-rose transition-colors underline underline-offset-4"
              >
                See pricing
              </Link>
              <Link
                href="/custom#items"
                className="font-sans text-sm text-muted hover:text-rose transition-colors underline underline-offset-4"
              >
                What I can stitch
              </Link>
            </div>

            <p className="font-sans text-xs text-muted/70 mt-6">
              Sweaters starting at $45.
            </p>
          </div>

          {/* Preview: first on mobile (immediately visible), second on desktop */}
          <div className="order-1 md:order-2 bg-warm-white rounded-lg p-5 md:p-8 border border-border shadow-sm">
            <HeroPreviewInteractive />
          </div>
        </div>
      </div>
    </section>
  );
}
