import Image from "next/image";
import Badge from "@/components/ui/Badge";

const previewItems = [
  {
    name: "Oversized Denim Jacket",
    price: 98,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
  },
  {
    name: "Vintage Crochet Vest",
    price: 72,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
  },
  {
    name: "Patchwork Linen Shirt",
    price: 64,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    soldOut: true,
  },
];

export default function DropsFeature() {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-oat">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Upcycled Drops
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brown font-light leading-tight">
              Each piece, <span className="italic">only once.</span>
            </h2>
          </div>
          <a
            href="https://shop.thetangledthreadco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-brown transition-colors self-start md:self-auto tracking-wide"
          >
            Full drop on Shopify &rarr;
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {previewItems.map((item) => (
            <div key={item.name} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.soldOut ? "grayscale opacity-60" : ""}`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="one-of-one">1 of 1</Badge>
                  {item.soldOut && <Badge variant="sold-out">Sold Out</Badge>}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-lg text-brown">{item.name}</h3>
                <p className="font-sans text-sm text-muted mt-1">${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://shop.thetangledthreadco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-brown text-brown font-sans font-medium text-sm rounded hover:bg-cream transition-colors tracking-wide"
          >
            Shop All Drops
          </a>
        </div>
      </div>
    </section>
  );
}
