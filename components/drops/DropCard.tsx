import Image from "next/image";
import type { DropItem } from "@/lib/types";
import Badge from "@/components/ui/Badge";

interface DropCardProps {
  item: DropItem;
}

export default function DropCard({ item }: DropCardProps) {
  return (
    <div>
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-oat mb-5">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="one-of-one">1 of 1</Badge>
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-serif text-lg leading-snug text-brown">
            {item.name}
          </h3>
          <span className="font-sans text-base font-medium shrink-0 text-ink">
            ${item.price}
          </span>
        </div>
        <p className="font-sans text-xs text-muted mb-4 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <button
          disabled
          className="inline-flex items-center justify-center px-4 py-2 rounded border border-border font-sans text-xs font-medium text-muted cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}
