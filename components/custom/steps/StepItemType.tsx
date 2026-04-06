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
}[] = [
  {
    type: "baby-toddler-sweater",
    label: "Baby & Toddler Sweater",
    desc: "0m – 5T · readily available",
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
    desc: "S – XL",
    price: "$55",
  },
  {
    type: "chunky-romper",
    label: "Chunky Knit Romper",
    desc: "Infant sizes",
    price: "$45",
  },
  {
    type: "fine-gauge-romper",
    label: "Fine-Gauge Knit Romper",
    desc: "Infant sizes",
    price: "$45",
  },
  {
    type: "ftcwhp-romper",
    label: '"For This Child We Have Prayed"',
    desc: "Specialty romper",
    price: "$60",
  },
  {
    type: "brave-little-one-romper",
    label: '"Brave Little One"',
    desc: "Specialty romper",
    price: "$50",
  },
  {
    type: "blanket-cotton",
    label: "Baby Blanket, 100% Cotton",
    desc: "90×70 cm",
    price: "$50",
  },
  {
    type: "blanket-acrylic",
    label: "Baby Blanket, Acrylic",
    desc: "Soft, durable, stretchy",
    price: "$45",
  },
  {
    type: "denim-jacket",
    label: "Denim Jacket",
    desc: "12m through big kid",
    price: "$60",
  },
  {
    type: "pillow-case",
    label: "Pillow Case",
    desc: "Standard size",
    price: "$40",
  },
  {
    type: "beanie",
    label: "Infant / Kids Beanie",
    desc: "Multiple sizes",
    price: "$25+",
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
              text-left p-5 rounded border-2 transition-all duration-200 cursor-pointer
              ${
                formData.itemType === item.type
                  ? "border-rose bg-rose/5"
                  : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
              }
            `}
          >
            <span className="font-serif text-base text-brown block leading-snug">
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
