import type { OrderFormData, ItemType } from "@/lib/types";

interface StepItemTypeProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
}

const items: {
  type: ItemType;
  label: string;
  desc: string;
  price: string;
  liveEditorSoon?: boolean;
}[] = [
  {
    type: "baby-toddler-sweater",
    label: "Baby & Toddler Sweater",
    desc: "0m - 5T · readily available",
    price: "$45",
  },
  {
    type: "big-kid-sweater",
    label: "Big Kid Sweater",
    desc: "Sizes 5-6, 7-8, 9-10, 11-12",
    price: "$50",
  },
  {
    type: "adult-sweater",
    label: "Adult Sweater",
    desc: "S - XL",
    price: "$55",
  },
  {
    type: "fine-gauge-romper",
    label: "Fine-Gauge Knit Romper",
    desc: "Infant sizes",
    price: "$45",
    liveEditorSoon: true,
  },
  {
    type: "blanket-cotton",
    label: "Baby Blanket, 100% Cotton",
    desc: "90×70 cm",
    price: "$50",
    liveEditorSoon: true,
  },
  {
    type: "custom",
    label: "Something else",
    desc: "Name basket, denim jacket, pillow case, backpack, tote bag, and more",
    price: "Let's chat",
  },
];

export default function StepItemType({ formData, onChange, onNext }: StepItemTypeProps) {
  const handleSelect = (type: ItemType) => {
    onChange({ itemType: type });
    onNext();
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">What would you like?</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Choose the item you&apos;d like to have embroidered.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <button
            key={item.type}
            onClick={() => handleSelect(item.type)}
            className={`
              relative text-left p-5 rounded border-2 transition-all duration-200 cursor-pointer
              ${
                formData.itemType === item.type
                  ? "border-rose bg-rose/5"
                  : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
              }
            `}
          >
            {item.liveEditorSoon && (
              <span className="absolute top-2 right-2 font-sans text-[9px] font-medium tracking-wider uppercase text-rose/80 bg-rose/10 border border-rose/20 px-1.5 py-0.5 rounded">
                Live editor coming soon
              </span>
            )}
            <span className="font-serif text-base text-brown block leading-snug pr-2">
              {item.label}
            </span>
            <span className="font-sans text-xs text-muted block mt-1">{item.desc}</span>
            <span className="font-sans text-xs font-medium text-rose block mt-2">
              {item.price}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
