"use client";

import { useState, useEffect, useRef } from "react";
import type { Order, OrderStatus } from "@/lib/db/orderTypes";
import { STATUS_LABELS, STATUS_FLOW } from "@/lib/db/orderTypes";
import { setOrderStatus, setOrderFlags, saveInternalNotes } from "@/lib/actions/adminActions";

interface Props {
  order: Order;
  onUpdate: (updated: Partial<Order> & { id: string }) => void;
  onClose: () => void;
}

const itemLabels: Record<string, string> = {
  "baby-toddler-sweater": "Baby & Toddler Sweater",
  "big-kid-sweater": "Big Kid Sweater",
  "adult-sweater": "Adult Sweater",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "blanket-cotton": "Baby Blanket, 100% Cotton",
  "custom": "Custom Inquiry",
};

export default function OrderPanel({ order, onUpdate, onClose }: Props) {
  const [notes, setNotes] = useState(order.internal_notes);
  const [notesSaving, setNotesSaving] = useState(false);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync notes when switching to a different order
  useEffect(() => {
    if (notesTimer.current) clearTimeout(notesTimer.current);
    setNotes(order.internal_notes);
  }, [order.id, order.internal_notes]);

  const currentIdx = STATUS_FLOW.indexOf(order.status);

  const handleStatusChange = async (status: OrderStatus) => {
    onUpdate({ id: order.id, status });
    await setOrderStatus(order.id, status);
  };

  const handleFlag = async (
    flag: "deposit_paid" | "final_paid" | "photo_taken",
    value: boolean
  ) => {
    onUpdate({ id: order.id, [flag]: value });
    await setOrderFlags(order.id, { [flag]: value });
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(async () => {
      setNotesSaving(true);
      await saveInternalNotes(order.id, value);
      onUpdate({ id: order.id, internal_notes: value });
      setNotesSaving(false);
    }, 1000);
  };

  const contactLine =
    order.preferred_contact === "instagram"
      ? `Instagram @${order.instagram_handle}`
      : order.preferred_contact === "email"
      ? `Email — ${order.email}`
      : order.preferred_contact === "phone"
      ? `Phone — ${order.phone}`
      : order.preferred_contact;

  const detailRows: Array<[string, string] | null> = [
    ["Item", itemLabels[order.item_type] ?? order.item_type],
    order.item_type === "custom"
      ? ["Description", order.inquiry_description]
      : order.wording ? ["Wording", order.wording] : null,
    order.specialty_design ? ["Specialty design", order.specialty_design] : null,
    order.font_style ? ["Font", order.font_style] : null,
    order.yarn_colors?.length ? ["Yarn colors", order.yarn_colors.join(", ")] : null,
    order.size ? ["Size", order.size] : null,
    order.item_color ? ["Item color", order.item_color] : null,
    order.romper_style ? ["Romper style", order.romper_style === "ruffled" ? "Ruffled" : "Non-Ruffled"] : null,
    order.notes ? ["Customer notes", order.notes] : null,
    ["Delivery", order.delivery === "shipping" ? "Ship" : "Local pickup — Spokane, WA"],
    order.delivery === "shipping"
      ? ["Ship to", `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}`]
      : null,
    ["Contact", contactLine],
    order.email ? ["Email", order.email] : null,
    order.phone ? ["Phone", order.phone] : null,
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-cream px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-sans text-xs text-muted mb-1">
            {new Date(order.created_at).toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric", year: "numeric",
            })}
          </p>
          <h2 className="font-serif text-3xl text-brown">
            {order.first_name} {order.last_name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="font-sans text-sm text-muted hover:text-rose transition-colors mt-1 cursor-pointer"
        >
          ✕ Close
        </button>
      </div>

      {/* Status stepper */}
      <section className="mb-6 p-5 bg-warm-white border border-border rounded">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-4">Status</p>
        <div className="flex items-center gap-3 mb-4">
          <button
            disabled={currentIdx <= 0}
            onClick={() => handleStatusChange(STATUS_FLOW[currentIdx - 1])}
            className="px-3 py-1.5 rounded border border-border font-sans text-sm text-brown hover:bg-oat disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <span className="font-sans text-sm font-medium text-ink flex-1 text-center">
            {STATUS_LABELS[order.status]}
          </span>
          <button
            disabled={currentIdx >= STATUS_FLOW.length - 1}
            onClick={() => handleStatusChange(STATUS_FLOW[currentIdx + 1])}
            className="px-3 py-1.5 rounded bg-rose text-warm-white font-sans text-sm hover:bg-rose-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next →
          </button>
        </div>
        {/* Step dots — click to jump directly */}
        <div className="flex gap-1.5 justify-center">
          {STATUS_FLOW.map((s, i) => (
            <button
              key={s}
              title={STATUS_LABELS[s]}
              onClick={() => handleStatusChange(s)}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                i === currentIdx
                  ? "bg-rose"
                  : i < currentIdx
                  ? "bg-rose/30"
                  : "bg-border hover:bg-muted/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Tracking flags */}
      <section className="mb-6 p-5 bg-warm-white border border-border rounded">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-4">Tracking</p>
        <div className="space-y-3">
          {(
            [
              { key: "deposit_paid", label: "50% deposit paid" },
              { key: "final_paid",   label: "Final payment paid" },
              { key: "photo_taken",  label: "Pre-ship photo taken" },
            ] as const
          ).map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={order[key]}
                onChange={(e) => handleFlag(key, e.target.checked)}
                className="w-4 h-4 accent-rose cursor-pointer"
              />
              <span className={`font-sans text-sm ${order[key] ? "text-ink line-through opacity-50" : "text-ink"}`}>
                {label}
              </span>
              {order[key] && <span className="font-sans text-xs text-green-600">✓ Done</span>}
            </label>
          ))}
        </div>
      </section>

      {/* Order details */}
      {order.items && order.items.length > 0 ? (
        order.items.map((item, i) => (
          <section key={i} className="mb-4 p-5 bg-warm-white border border-border rounded">
            <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-4">
              {order.items!.length > 1 ? `Item ${i + 1}` : "Order Details"}
            </p>
            <div className="divide-y divide-border">
              {([
                ["Item", itemLabels[item.itemType] ?? item.itemType],
                item.itemType === "custom" ? ["Description", item.inquiryDescription] : item.wording ? ["Wording", item.wording] : null,
                item.specialtyDesign ? ["Specialty design", item.specialtyDesign] : null,
                item.fontStyle ? ["Font", item.fontStyle] : null,
                item.yarnColors?.length ? ["Yarn colors", item.yarnColors.join(", ")] : null,
                item.size ? ["Size", item.size] : null,
                item.itemColor ? ["Color", item.itemColor] : null,
                item.romperStyle ? ["Romper style", item.romperStyle === "ruffled" ? "Ruffled" : "Non-Ruffled"] : null,
                item.notes ? ["Notes", item.notes] : null,
                item.referenceImageName ? ["Reference image", item.referenceImageName] : null,
              ].filter(Boolean) as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                  <span className="font-sans text-xs text-muted shrink-0 pt-0.5">{label}</span>
                  <span className="font-sans text-sm text-ink text-right">{value}</span>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="mb-6 p-5 bg-warm-white border border-border rounded">
          <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-4">Order Details</p>
          <div className="divide-y divide-border">
            {(detailRows.filter(Boolean) as [string, string][]).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                <span className="font-sans text-xs text-muted shrink-0 pt-0.5">{label}</span>
                <span className="font-sans text-sm text-ink text-right">{value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internal notes */}
      <section className="mb-6 p-5 bg-warm-white border border-border rounded">
        <div className="flex items-center justify-between mb-4">
          <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase">My Notes</p>
          {notesSaving && <span className="font-sans text-xs text-muted animate-pulse">Saving…</span>}
        </div>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={5}
          placeholder="Notes for yourself — not visible to the customer."
          className="w-full px-4 py-3 rounded border border-border bg-cream font-sans text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none transition-colors"
        />
      </section>
    </div>
  );
}
