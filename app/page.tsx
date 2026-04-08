import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import { getReviews, type Review } from "@/lib/db/reviews";

export const metadata: Metadata = {
  title: "The Tangled Thread Co. - Custom Embroidery & Upcycled Drops",
  description:
    "Handmade custom embroidery on sweaters, blankets, rompers, and more. Shop one-of-a-kind upcycled drops. Everything small-batch and made with care.",
};

export const revalidate = 3600; // refresh reviews hourly

async function fetchReviews(): Promise<Review[]> {
  try {
    return await getReviews();
  } catch {
    return [];
  }
}

const inspirationPhotos = [
  "/images/portfolio/IMG_1024.jpeg",
  "/images/portfolio/IMG_1003.jpeg",
  "/images/portfolio/IMG_1497.jpeg",
  "/images/portfolio/IMG_1499.jpeg",
  "/images/portfolio/IMG_1504.jpeg",
  "/images/portfolio/IMG_1748.jpeg",
  "/images/portfolio/IMG_1957.jpeg",
  "/images/portfolio/IMG_2450.jpeg",
  "/images/portfolio/IMG_2818.jpeg",
  "/images/portfolio/IMG_2824.jpeg",
];

export default async function HomePage() {
  const allReviews = await fetchReviews();
  const reviews = allReviews.slice(0, 4);

  return (
    <>
      <Hero />

      {/* ── How custom orders work ── */}
      <section className="w-full px-6 md:px-12 py-20 bg-warm-white border-t border-border">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            The process
          </p>
          <h2 className="font-serif text-4xl text-brown font-light mb-10">
            How custom orders work.
          </h2>
          <ol className="space-y-7">
            {[
              {
                n: "1",
                text: "Tell me what you'd like stitched — the item, wording, colors, and any ideas you have. Don't worry about having every detail figured out yet.",
              },
              {
                n: "2",
                text: "I'll follow up personally within 1–2 business days to confirm the design, placement, yarn colors, and anything else we need to nail down.",
              },
              {
                n: "3",
                text: "Once everything is finalized, I collect a 50% deposit and get to stitching. I'll send a photo before it ships.",
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-6 items-start">
                <span className="font-serif text-3xl text-rose/25 font-light leading-none shrink-0 w-6 mt-0.5">
                  {step.n}
                </span>
                <p className="font-sans text-base text-ink leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link
              href="/custom"
              className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-brown hover:text-rose transition-colors"
            >
              Start a custom order
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      {reviews.length > 0 && (
        <section className="w-full px-6 md:px-12 py-20 bg-cream border-t border-border">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Reviews
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">
              Kind words from past orders.
            </h2>
            <p className="font-sans text-sm text-muted mb-12 max-w-md leading-relaxed">
              Each piece is made by hand, and I work closely with you to get every detail right.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {reviews.map((review) => (
                <div key={review.id} className="border-t border-border pt-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-rose text-xs">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-ink leading-relaxed mb-4 italic">
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <p className="font-sans text-xs font-medium text-brown">{review.name}</p>
                  {review.item && (
                    <p className="font-sans text-xs text-muted mt-0.5">{review.item}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/reviews"
                className="font-sans text-sm text-muted hover:text-rose transition-colors"
              >
                See all reviews →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Inspiration ── */}
      <section className="w-full px-6 md:px-12 py-20 bg-oat border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
                Past work
              </p>
              <h2 className="font-serif text-4xl text-brown font-light">
                Need inspiration?
              </h2>
            </div>
            <a
              href="https://instagram.com/the.tangled.thread.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-brown hover:text-rose transition-colors shrink-0"
            >
              Browse more on Instagram →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {inspirationPhotos.map((src) => (
              <a
                key={src}
                href="https://instagram.com/the.tangled.thread.co"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden aspect-square block"
              >
                <Image
                  src={src}
                  alt="Past custom embroidery work"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                />
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/custom"
              className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors"
            >
              Order Your Custom Piece
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
