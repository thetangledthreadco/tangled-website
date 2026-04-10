"use client";

import { useState } from "react";
import { createManualOrder } from "@/lib/actions/adminActions";
import type { Order } from "@/lib/db/orderTypes";

const itemOptions = [
  { value: "baby-toddler-sweater", label: "Baby & Toddler Sweater" },
  { value: "big-kid-sweater",      label: "Big Kid Sweater" },
  { value: "adult-sweater",        label: "Adult Sweater" },
  { value: "fine-gauge-romper",    label: "Fine-Gauge Knit Romper" },
  { value: "blanket-cotton",       label: "Baby Blanket, 100% Cotton" },
  { value: "custom",               label: "Custom Inquiry" },
];

const empty = {
  first_name: "", last_name: "", email: "", phone: "",
  preferred_contact: "", instagram_handle: "",
  item_type: "", wording: "", inquiry_description: "",
  yarn_colors: "", size: "", item_color: "", notes: "",
  delivery: "", shipping_address: "", shipping_city: "",
  shipping_state: "", shipping_zip: "",
};

interface Props {
  onCreated: (order: Order) => void;
  onCancel: () => void;
}

export default function NewOrderForm({ onCreated, onCancel }: Props) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof empty, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.item_type) {
      setError("First name and item type are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { id } = await createManualOrder(form);
      // Build a minimal Order object so it appears in the list immediately
      const newOrder: Order = {
        id,
        created_at: new Date().toISOString(),
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        preferred_contact: form.preferred_contact,
        instagram_handle: form.instagram_handle,
        item_type: form.item_type,
        items: null,
        specialty_design: "",
        wording: form.wording,
        font_style: "",
        yarn_colors: form.yarn_colors ? form.yarn_colors.split(",").map((s) => s.trim()).filter(Boolean) : [],
        inquiry_description: form.inquiry_description,
        size: form.size,
        item_color: form.item_color,
        romper_style: "",
        notes: form.notes,
        delivery: form.delivery,
        shipping_address: form.shipping_address,
        shipping_city: form.shipping_city,
        shipping_state: form.shipping_state,
        shipping_zip: form.shipping_zip,
        status: "new",
        deposit_paid: false,
        final_paid: false,
        photo_taken: false,
        internal_notes: "",
      };
      onCreated(newOrder);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const field = (label: string, key: keyof typeof empty, opts?: { placeholder?: string; required?: boolean }) => (
    <div>
      <label className="block font-sans text-xs font-medium text-muted uppercase tracking-wide mb-1.5">
        {label}{opts?.required && <span className="text-rose ml-0.5">*</span>}
      </label>
      <input
        type="text"
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={opts?.placeholder ?? ""}
        className="w-full px-3 py-2.5 rounded border border-border bg-cream font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
      />
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-cream px-6 md:px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl text-brown">New Order</h2>
        <button onClick={onCancel} className="font-sans text-sm text-muted hover:text-rose transition-colors cursor-pointer">
          ✕ Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        {/* Customer */}
        <section className="p-5 bg-warm-white border border-border rounded space-y-4">
          <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase">Customer</p>
          <div className="grid grid-cols-2 gap-4">
            {field("First name", "first_name", { required: true })}
            {field("Last name", "last_name")}
          </div>
          {field("Email", "email", { placeholder: "name@example.com" })}
          {field("Phone", "phone", { placeholder: "509-555-0100" })}
          <div>
            <label className="block font-sans text-xs font-medium text-muted uppercase tracking-wide mb-1.5">
              Preferred contact
            </label>
            <select
              value={form.preferred_contact}
              onChange={(e) => set("preferred_contact", e.target.value)}
              className="w-full px-3 py-2.5 rounded border border-border bg-cream font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
            >
              <option value="">Select...</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          {form.preferred_contact === "instagram" && field("Instagram handle", "instagram_handle", { placeholder: "@handle" })}
        </section>

        {/* Order */}
        <section className="p-5 bg-warm-white border border-border rounded space-y-4">
          <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase">Order</p>
          <div>
            <label className="block font-sans text-xs font-medium text-muted uppercase tracking-wide mb-1.5">
              Item<span className="text-rose ml-0.5">*</span>
            </label>
            <select
              value={form.item_type}
              onChange={(e) => set("item_type", e.target.value)}
              className="w-full px-3 py-2.5 rounded border border-border bg-cream font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
            >
              <option value="">Select…</option>
              {itemOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {form.item_type && form.item_type !== "custom"
            ? field("Wording / name", "wording", { placeholder: "e.g. Oliver" })
            : form.item_type === "custom"
            ? (
              <div>
                <label className="block font-sans text-xs font-medium text-muted uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  value={form.inquiry_description}
                  onChange={(e) => set("inquiry_description", e.target.value)}
                  rows={3}
                  placeholder="What are they looking for?"
                  className="w-full px-3 py-2.5 rounded border border-border bg-cream font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none transition-colors"
                />
              </div>
            ) : null}
          {field("Yarn colors", "yarn_colors", { placeholder: "Cream, dusty rose (comma-separated)" })}
          {field("Size", "size", { placeholder: "e.g. 12–18 months" })}
          {field("Item color", "item_color", { placeholder: "e.g. Oatmeal" })}
        </section>

        {/* Delivery */}
        <section className="p-5 bg-warm-white border border-border rounded space-y-4">
          <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase">Delivery</p>
          <div className="flex gap-3">
            {["shipping", "pickup"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => set("delivery", d)}
                className={`flex-1 py-2.5 rounded border font-sans text-sm font-medium transition-colors cursor-pointer ${
                  form.delivery === d
                    ? "bg-rose border-rose text-warm-white"
                    : "border-border text-brown hover:bg-oat"
                }`}
              >
                {d === "shipping" ? "Ship" : "Local pickup"}
              </button>
            ))}
          </div>
          {form.delivery === "shipping" && (
            <div className="space-y-3">
              {field("Address", "shipping_address")}
              <div className="grid grid-cols-3 gap-3">
                {field("City", "shipping_city")}
                {field("State", "shipping_state", { placeholder: "WA" })}
                {field("ZIP", "shipping_zip")}
              </div>
            </div>
          )}
        </section>

        {/* Notes */}
        <section className="p-5 bg-warm-white border border-border rounded">
          <label className="block font-sans text-xs font-medium text-muted uppercase tracking-wide mb-3">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            placeholder="Any special instructions…"
            className="w-full px-3 py-2.5 rounded border border-border bg-cream font-sans text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none transition-colors"
          />
        </section>

        {error && <p className="font-sans text-xs text-rose">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving…" : "Add Order"}
        </button>
      </form>
    </div>
  );
}
