import Image from "next/image";
import type { DropItem } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface DropCardProps {
  item: DropItem;
}

const SHOPIFY_BASE = "https://shop.thetangledthreadco.com/products";

export default function DropCard({ item }: DropCardProps) {
  return (
    <div className="group">
      <a
        href={item.soldOut ? undefined : `${SHOPIFY_BASE}/${item.handle}`}
        target={item.soldOut ? undefined : "_blank"}
        rel={item.soldOut ? undefined : "noopener noreferrer"}
        aria-disabled={item.soldOut}
        className={item.soldOut ? "cursor-default" : "cursor-pointer"}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-oat mb-5">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`
              object-cover transition-transform duration-500
              ${item.soldOut ? "grayscale opacity-50" : "group-hover:scale-105"}
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge variant="one-of-one">1 of 1</Badge>
            {item.soldOut && <Badge variant="sold-out">Sold Out</Badge>}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className={`font-serif text-lg leading-snug ${item.soldOut ? "text-muted" : "text-brown group-hover:text-rose transition-colors"}`}>
              {item.name}
            </h3>
            <span className={`font-sans text-base font-medium shrink-0 ${item.soldOut ? "text-muted" : "text-ink"}`}>
              ${item.price}
            </span>
          </div>
          <p className="font-sans text-xs text-muted mb-4 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          {!item.soldOut && (
            <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-rose group-hover:gap-2.5 transition-all">
              View on Shopify ↗
            </span>
          )}
        </div>
      </a>
    </div>
  );
}
