import Image from "next/image";
import Link from "next/link";

const images = [
  { src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80", alt: "Custom embroidered baby name sweater" },
  { src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80", alt: "Personalized adult sweater" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", alt: "Embroidered blanket detail" },
  { src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80", alt: "Embroidery close-up" },
  { src: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80", alt: "Upcycled denim jacket" },
  { src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80", alt: "Handmade knitwear" },
];

export default function GalleryPreview() {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-oat border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-3">
              Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brown font-light">
              The work
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-sm text-muted hover:text-brown transition-colors self-start sm:self-auto tracking-wide"
          >
            See all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-border ${
                i === 0 ? "aspect-[4/5] md:row-span-2 md:aspect-auto" : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
