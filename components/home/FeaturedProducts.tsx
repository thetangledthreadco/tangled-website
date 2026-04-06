import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

const products = [
  {
    name: "Baby Sweater, Custom Name",
    price: "from $45",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    href: "/custom",
    type: "custom",
  },
  {
    name: "Adult Sweater, Custom Name",
    price: "from $55",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    href: "/custom",
    type: "custom",
  },
  {
    name: "Custom Embroidered Blanket",
    price: "from $50",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    href: "/custom",
    type: "custom",
  },
  {
    name: "Vintage Levi's Jacket",
    price: "$120",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
    href: "https://shop.thetangledthreadco.com",
    type: "drop",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-warm-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-3">
              Featured
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brown font-light">
              Selected work
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-sm text-muted hover:text-brown transition-colors self-start sm:self-auto tracking-wide"
          >
            View gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const isExternal = product.type === "drop";
            const Tag = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? { href: product.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: product.href };

            return (
              <Tag
                key={product.name}
                {...linkProps}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-oat mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {product.type === "drop" && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="one-of-one">1 of 1</Badge>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-base text-brown leading-snug mb-1 group-hover:text-rose transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-muted">{product.price}</p>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
