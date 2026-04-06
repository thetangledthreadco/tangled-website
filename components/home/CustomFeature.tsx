import Link from "next/link";
import Image from "next/image";

export default function CustomFeature() {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80"
              alt="Custom embroidered baby sweater"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating label */}
            <div className="absolute bottom-6 left-6 right-6 bg-warm-white/92 backdrop-blur-sm px-5 py-4 border-l-2 border-rose">
              <p className="font-serif text-brown text-base italic">&ldquo;baby Emma&rdquo;</p>
              <p className="font-sans text-xs text-muted mt-0.5">
                Baby sweater &bull; Sage yarn &bull; Script font
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-5">
              Custom Embroidery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brown font-light leading-tight mb-6">
              A name. A word. A memory.{" "}
              <span className="italic">Stitched in.</span>
            </h2>
            <p className="font-sans text-base text-muted leading-relaxed mb-6">
              Choose your item, your colors, and the words to stitch. Whether it&apos;s a
              baby gift, a personalized blanket, or a custom sweater. Every order is made
              to order, by hand.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Sweaters, blankets, rompers, jackets",
                "Custom names, words, and initials",
                "5+ font styles",
                "Wide yarn color palette",
                "~2 week turnaround",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-sm text-ink">
                  <span className="w-px h-4 bg-rose flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
              >
                Start Your Order
              </Link>
              <Link
                href="/custom#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-brown font-sans font-medium text-sm rounded hover:bg-oat transition-colors tracking-wide"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
