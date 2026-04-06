import type { DropItem } from "@/lib/types";
import DropCard from "./DropCard";

interface DropsGridProps {
  items: DropItem[];
}

export default function DropsGrid({ items }: DropsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {items.map((item) => (
        <DropCard key={item.id} item={item} />
      ))}
    </div>
  );
}
