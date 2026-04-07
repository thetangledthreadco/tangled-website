import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Holly, the maker behind The Tangled Thread Co. Custom embroidery and upcycled clothing out of Spokane, WA.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            About
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight max-w-xl">
            How it started.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-oat">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-24">
            <Image
              src="/images/portfolio/IMG_0433.jpg"
              alt="Holly, maker behind The Tangled Thread Co."
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-3xl text-brown mb-5 font-light">
                Hi, I&apos;m Holly.
              </h2>
              <div className="space-y-4 font-sans text-base text-ink leading-relaxed">
                <p>
                  The Tangled Thread Co. started with a baby shower gift and a few small
                  keepsakes for my own two kids, something I loved making with no intention
                  of turning it into anything more.
                </p>
                <p>
                  Then Christmas 2025 happened. Twenty-five custom orders for friends and
                  family. Those pieces became my portfolio, and on January 5, 2026,
                  The Tangled Thread Co. officially opened.
                </p>
                <p>
                  I&apos;m based in Spokane, WA. By day I&apos;m a software engineer (yes, I built this site too). Every order is made by my own hands, and every piece gets my full attention from start to finish.
                </p>
                <p>
                  The name came from a season of life that felt a little tangled. Picking up a needle and thread was something I could control, something that made sense even when other things didn&apos;t. And tangled threads still make something beautiful in the end, so it stuck.
                </p>
                <p>
                  I&apos;ve also started reworking and upcycling clothing, and have
                  a lot in the works on that front.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-brown mb-5 font-light">
                What I believe in
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Handmade",
                    desc: "Every stitch is placed by hand. No machines, no shortcuts.",
                  },
                  {
                    title: "Small batch",
                    desc: "A limited number of orders at a time, so quality never slips.",
                  },
                  {
                    title: "Personal",
                    desc: "Custom orders are made for real people: gifts, milestones, keepsakes.",
                  },
                  {
                    title: "Sustainable",
                    desc: "Upcycled drops keep good clothing out of landfills and in wardrobes.",
                  },
                ].map((v) => (
                  <li key={v.title} className="flex gap-4">
                    <span className="w-px h-full min-h-[1rem] bg-rose mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-sm font-medium text-ink">{v.title}</p>
                      <p className="font-sans text-sm text-muted">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
              >
                Start a Custom Order
              </Link>
              <a
                href="https://instagram.com/the.tangled.thread.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-brown font-sans font-medium text-sm rounded hover:bg-cream transition-colors tracking-wide"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
