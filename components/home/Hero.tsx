import Link from "next/link";
import PhotoStrip from "@/components/home/PhotoStrip";

export default function Hero() {
  return (
    <section className="bg-cream pt-28 pb-24 md:pt-32 md:pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-[56fr_40fr] gap-10 md:gap-16 items-start">

          {/* Left - Custom Embroidery */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted mb-3">
              Custom Embroidery
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown font-light leading-snug mb-5">
              Designed with you,{" "}
              <span className="italic">stitched by hand.</span>
            </h2>
            <Link
              href="/custom"
              className="group inline-flex items-center gap-2 font-sans text-sm text-brown transition-colors duration-300 hover:text-rose"
            >
              Start a Custom Order
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Right - Drops */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-muted mb-3">
              One-of-a-Kind Drops
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-brown font-light leading-snug mb-5">
              Ready-to-ship pieces,{" "}
              <span className="italic">released in small batches.</span>
            </h2>
            <a
              href="https://shop.thetangledthreadco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-sm text-brown transition-colors duration-300 hover:text-rose"
            >
              Shop Drops
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>

        {/* Photo strip */}
        <div className="mt-16 md:mt-24">
          <PhotoStrip />
        </div>

      </div>
    </section>
  );
}
