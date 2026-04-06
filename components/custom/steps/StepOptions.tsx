"use client";

import { useState } from "react";
import Image from "next/image";
import type { OrderFormData } from "@/lib/types";

interface StepOptionsProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const sizesByItem: Record<string, string[]> = {
  "baby-toddler-sweater": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2T", "3T", "4T", "5T"],
  "big-kid-sweater": ["5-6", "7-8", "9-10", "11-12"],
  "adult-sweater": ["S", "M", "L", "XL"],
  "chunky-romper": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "fine-gauge-romper": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "ftcwhp-romper": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "brave-little-one-romper": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "blanket-cotton": ["90×70 cm"],
  "blanket-acrylic": ["90×70 cm"],
  "denim-jacket": ["12M", "18M", "2T", "3T", "4T", "5T", "6", "7-8", "9-10", "11-12"],
  "pillow-case": ["Standard"],
  "beanie": ["Infant (0-6M)", "Baby (6-18M)", "Toddler (18M-3T)", "Kids (3-6T)"],
};

// Baby & Toddler sweater colors (0m–5T readily available)
const sweaterColors = [
  { id: "lake-blue", label: "Lake Blue", hex: "#5A8AB0" },
  { id: "chestnut-hearth", label: "Chestnut Hearth", hex: "#6B3820" },
  { id: "olive-green", label: "Olive Green", hex: "#5A6830" },
  { id: "lavender", label: "Lavender", hex: "#B8A8D0" },
  { id: "dusty-violet", label: "Dusty Violet", hex: "#706080" },
  { id: "rosewood", label: "Rosewood", hex: "#C89090" },
  { id: "peach-blossom", label: "Peach Blossom", hex: "#E8B8A8" },
  { id: "oatmilk", label: "Oatmilk", hex: "#EDE0CC" },
  { id: "soft-white", label: "Soft White", hex: "#F8F4EE" },
  { id: "vintage-denim", label: "Vintage Denim", hex: "#3A5878" },
  { id: "sky-blue", label: "Sky Blue", hex: "#A8C8E0" },
  { id: "cranberry", label: "Cranberry", hex: "#8A1828" },
];

const addOnReference = [
  { label: "Middle name (up to 6 letters)", price: "+$5" },
  { label: "Each extra letter (7+)", price: "+$2 each" },
  { label: "Small design", price: "+$1.50 each" },
  { label: "Medium design", price: "+$5–$10" },
  { label: "Large design", price: "+$10–$15+" },
];

const isSweater = (itemType: string) =>
  ["baby-toddler-sweater", "big-kid-sweater", "adult-sweater"].includes(itemType);

export default function StepOptions({
  formData,
  onChange,
  onNext,
  onBack,
}: StepOptionsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showColorModal, setShowColorModal] = useState(false);
  const sizes = sizesByItem[formData.itemType] ?? [];
  const showColorPicker = isSweater(formData.itemType);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.size) errs.size = "Please select a size.";
    if (showColorPicker && !formData.itemColor)
      errs.itemColor = "Please select a sweater color.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Size &amp; options</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Choose your size{showColorPicker ? ", sweater color," : ""} and any add-ons.
      </p>

      {/* Size */}
      <div className="mb-8">
        <label
          htmlFor="size"
          className="block font-sans text-sm font-medium text-ink mb-2"
        >
          Size <span className="text-rose">*</span>
        </label>
        <select
          id="size"
          value={formData.size}
          onChange={(e) => onChange({ size: e.target.value })}
          className={`
            w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
            focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
            ${errors.size ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        >
          <option value="">Select a size…</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.size && (
          <p className="font-sans text-xs text-rose mt-1.5">{errors.size}</p>
        )}
        {formData.itemType === "big-kid-sweater" && (
          <p className="font-sans text-xs text-muted mt-1.5">
            Big kid and adult sweaters may have a longer turnaround - message me to confirm
            availability.
          </p>
        )}
      </div>

      {/* Sweater color (only for sweaters) */}
      {showColorPicker && (
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="font-sans text-sm font-medium text-ink">
              Sweater color <span className="text-rose">*</span>
            </p>
            <button
              type="button"
              onClick={() => setShowColorModal(true)}
              className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-2 cursor-pointer shrink-0"
            >
              View color chart
            </button>
          </div>
          {formData.itemType !== "baby-toddler-sweater" && (
            <p className="font-sans text-xs text-muted mb-3">
              Baby &amp; toddler colors shown. Adult and big kid colors vary - I&apos;ll
              confirm availability when I follow up.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {sweaterColors.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange({ itemColor: color.id })}
                title={color.label}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
                aria-pressed={formData.itemColor === color.id}
              >
                <span
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all duration-200 block
                    ${
                      formData.itemColor === color.id
                        ? "border-rose scale-110 shadow-md"
                        : "border-border group-hover:border-rose/50"
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans text-[10px] text-muted text-center w-14 leading-tight">
                  {color.label}
                </span>
              </button>
            ))}
          </div>
          {errors.itemColor && (
            <p className="font-sans text-xs text-rose mt-2">{errors.itemColor}</p>
          )}
        </div>
      )}

      {/* Add-ons reference */}
      <div className="mb-10">
        <p className="font-sans text-sm font-medium text-ink mb-1">Add-ons</p>
        <p className="font-sans text-xs text-muted mb-3">For reference. Pricing is finalized when I follow up.</p>
        <div className="divide-y divide-border border border-border rounded">
          {addOnReference.map((addon) => (
            <div key={addon.label} className="flex items-center justify-between px-4 py-2.5">
              <span className="font-sans text-sm text-ink">{addon.label}</span>
              <span className="font-sans text-sm font-medium text-rose">{addon.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sweater color modal */}
      {showColorModal && (
        <div
          className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-6"
          onClick={() => setShowColorModal(false)}
        >
          <div
            className="bg-warm-white max-w-lg w-full p-6 border border-border max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-brown">Sweater color chart</h3>
              <button
                type="button"
                onClick={() => setShowColorModal(false)}
                className="font-sans text-sm text-muted hover:text-brown transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            <Image
              src="/images/assets/sweater-colors.png"
              alt="Available sweater colors"
              width={600}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (validate()) onNext();
          }}
          className="flex-1 px-6 py-3 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
