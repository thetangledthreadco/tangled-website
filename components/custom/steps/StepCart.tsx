"use client";

import type { OrderFormData, CartItem } from "@/lib/types";

const itemLabels: Record<string, string> = {
  "baby-toddler-sweater": "Baby & Toddler Sweater",
  "big-kid-sweater": "Big Kid Sweater",
  "adult-sweater": "Adult Sweater",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "blanket-cotton": "Baby Blanket, 100% Cotton",
  "custom": "Custom Inquiry",
};

interface Props {
  formData: OrderFormData;
  onAddAnother: () => void;
  onPlaceOrder: () => void;
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
}

function CartItemCard({
  item,
  index,
  onRemove,
  onEdit,
}: {
  item: CartItem;
  index: number;
  onRemove: () => void;
  onEdit: () => void;
}) {
  const label = itemLabels[item.itemType] ?? item.itemType;
  const descriptor =
    item.itemType === "custom"
      ? item.inquiryDescription
      : item.wording
      ? `"${item.wording}"`
      : null;

  return (
    <div className="bg-warm-white border border-border rounded p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-sans text-sm font-medium text-ink">{label}</p>
          {descriptor && (
            <p className="font-sans text-sm text-muted mt-0.5">{descriptor}</p>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onEdit}
            className="font-sans text-xs text-brown hover:text-rose transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={onRemove}
            className="font-sans text-xs text-muted hover:text-rose transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {item.size && (
          <span className="font-sans text-xs text-muted">Size: {item.size}</span>
        )}
        {item.itemColor && (
          <span className="font-sans text-xs text-muted capitalize">Color: {item.itemColor.replace(/-/g, " ")}</span>
        )}
        {item.yarnColors.length > 0 && (
          <span className="font-sans text-xs text-muted">Yarn: {item.yarnColors.join(", ")}</span>
        )}
        {item.referenceImageName && (
          <span className="font-sans text-xs text-muted">📎 {item.referenceImageName}</span>
        )}
        {item.notes && (
          <span className="font-sans text-xs text-muted italic">Note: {item.notes}</span>
        )}
      </div>
    </div>
  );
}

export default function StepCart({ formData, onAddAnother, onPlaceOrder, onRemove, onEdit }: Props) {
  const { cart } = formData;

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Your cart</h2>
      <p className="font-sans text-sm text-muted mb-8">
        {cart.length === 1
          ? "1 item. Add another or place your order."
          : `${cart.length} items. Add another or place your order.`}
      </p>

      <div className="space-y-3 mb-8">
        {cart.map((item, i) => (
          <CartItemCard
            key={i}
            item={item}
            index={i}
            onRemove={() => onRemove(i)}
            onEdit={() => onEdit(i)}
          />
        ))}
      </div>

      <button
        onClick={onAddAnother}
        className="w-full px-6 py-3 mb-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
      >
        + Add another item
      </button>

      <button
        onClick={onPlaceOrder}
        className="w-full px-6 py-4 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer"
      >
        Place order →
      </button>
    </div>
  );
}
