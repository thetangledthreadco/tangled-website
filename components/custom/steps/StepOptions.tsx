"use client";

import { useState } from "react";
import Image from "next/image";
import type { OrderFormData, RomperStyle } from "@/lib/types";

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
  "fine-gauge-romper": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "blanket-cotton": ["90×70 cm"],
  "blanket-acrylic": ["90×70 cm"],
  "denim-jacket": ["12M", "18M", "2T", "3T", "4T", "5T", "6", "7-8", "9-10", "11-12"],
  "pillow-case": ["Standard"],
  "beanie": ["Infant (0-6M)", "Baby (6-18M)", "Toddler (18M-3T)", "Kids (3-6T)"],
};

// Baby & Toddler sweater colors (0m–5T)
const babyToddlerSweaterColors = [
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

// Adult & Big Kid sweater colors
const adultKidSweaterColors = [
  { id: "black", label: "Black", hex: "#1A1A1A" },
  { id: "walnut", label: "Walnut", hex: "#7B4A20" },
  { id: "green", label: "Green", hex: "#1E3D2F" },
  { id: "orange", label: "Orange", hex: "#C85A20" },
  { id: "fire-truck-red", label: "Fire Truck Red", hex: "#B81C1C" },
  { id: "cranberry", label: "Cranberry", hex: "#7A1828" },
  { id: "white", label: "White", hex: "#F5F2EE" },
  { id: "khaki", label: "Khaki", hex: "#9E9178" },
  { id: "rosewood", label: "Rosewood", hex: "#C49090" },
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

const isFineGaugeRomper = (itemType: string) => itemType === "fine-gauge-romper";

const isBlanket = (itemType: string) => itemType === "blanket-cotton";

const blanketCottonColors = [
  { id: "ruffled-rose", label: "Ruffled Rose", hex: "#C99090" },
  { id: "ruffled-gray", label: "Ruffled Gray", hex: "#A8A8A8" },
  { id: "ruffled-soft-cream", label: "Ruffled Soft Cream", hex: "#F5F0E4" },
  { id: "ruffled-sage-green", label: "Ruffled Sage Green", hex: "#98B09A" },
  { id: "soft-cream", label: "Soft Cream", hex: "#F5F0E4" },
  { id: "blush-petal", label: "Blush Petal", hex: "#E8B8B8" },
  { id: "sage-green", label: "Sage Green", hex: "#98B09A" },
  { id: "warm-oat", label: "Warm Oat", hex: "#D8C8A8" },
];


const ruffledRomperColors = [
  { id: "mauve", label: "Mauve", hex: "#A85870" },
  { id: "cream", label: "Cream", hex: "#F5F0E0" },
  { id: "lavender", label: "Lavender", hex: "#C0B0D8" },
  { id: "olive", label: "Olive", hex: "#6B7040" },
  { id: "pink", label: "Pink", hex: "#F0B8C0" },
  { id: "beige", label: "Beige", hex: "#D4C4A0" },
  { id: "red", label: "Red", hex: "#C82020" },
  { id: "sage", label: "Sage", hex: "#8A9E80" },
  { id: "white", label: "White", hex: "#F8F6F2" },
];

const nonRuffledRomperColors = [
  { id: "grey", label: "Grey", hex: "#B8B8B4" },
  { id: "blue", label: "Blue", hex: "#88B8D0" },
  { id: "sage", label: "Sage", hex: "#8A9E80" },
  { id: "beige", label: "Beige", hex: "#D4C4A0" },
  { id: "brown", label: "Brown", hex: "#7A5840" },
  { id: "white", label: "White", hex: "#F8F6F2" },
  { id: "olive", label: "Olive", hex: "#6B7040" },
  { id: "red", label: "Red", hex: "#C82020" },
  { id: "cream", label: "Cream", hex: "#F5F0E0" },
];

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
  const showRomperStyle = isFineGaugeRomper(formData.itemType);
  const showBlanketColor = isBlanket(formData.itemType);
  const blanketColors = blanketCottonColors;
  const blanketChartSrc = "/images/assets/blanket-colors-cotton.png";
  const isAdultOrKid = ["adult-sweater", "big-kid-sweater"].includes(formData.itemType);
  const sweaterColors = isAdultOrKid ? adultKidSweaterColors : babyToddlerSweaterColors;
  const colorChartSrc = isAdultOrKid
    ? "/images/assets/sweater-colors-adult-kid.jpg"
    : "/images/assets/sweater-colors.png";

  const romperColors = formData.romperStyle === "ruffled"
    ? ruffledRomperColors
    : formData.romperStyle === "non-ruffled"
    ? nonRuffledRomperColors
    : [];
  const romperChartSrc = formData.romperStyle === "ruffled"
    ? "/images/assets/romper-colors-ruffled.png"
    : "/images/assets/romper-colors-non-ruffled.png";

  // Clear selected color if it doesn't exist in the current item's color list
  const validColorIds = new Set(sweaterColors.map((c) => c.id));
  if (formData.itemColor && showColorPicker && !validColorIds.has(formData.itemColor)) {
    onChange({ itemColor: "" });
  }

  // Blankets are one size — auto-set so validation passes
  if (showBlanketColor && !formData.size) {
    onChange({ size: "One size" });
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!showBlanketColor && !formData.size) errs.size = "Please select a size.";
    if (showColorPicker && !formData.itemColor)
      errs.itemColor = "Please select a sweater color.";
    if (showRomperStyle && !formData.romperStyle)
      errs.romperStyle = "Please choose a romper style.";
    if (showRomperStyle && formData.romperStyle && !formData.itemColor)
      errs.itemColor = "Please select a color.";
    if (showBlanketColor && !formData.itemColor)
      errs.itemColor = "Please select a color.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Size &amp; options</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Choose your size{showColorPicker ? ", sweater color," : ""} and any add-ons.
      </p>

      {/* Size — hidden for blankets (one size) */}
      {!showBlanketColor && (
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
          {isAdultOrKid && (
            <p className="font-sans text-xs text-muted mt-1.5">
              These sweaters are ordered in, so turnaround may be longer than usual. I'll give a better estimate when I follow up.
            </p>
          )}
        </div>
      )}

      {/* Fine-gauge romper style + color */}
      {showRomperStyle && (
        <div className="mb-8">
          <p className="font-sans text-sm font-medium text-ink mb-3">
            Style <span className="text-rose">*</span>
          </p>
          <div className="flex gap-3 mb-3">
            {(["ruffled", "non-ruffled"] as RomperStyle[]).filter(Boolean).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onChange({ romperStyle: style, itemColor: "" })}
                className={`px-5 py-2.5 rounded border font-sans text-sm font-medium transition-all cursor-pointer capitalize ${
                  formData.romperStyle === style
                    ? "border-rose bg-rose/5 text-rose"
                    : "border-border bg-warm-white text-ink hover:border-rose/40 hover:bg-oat"
                }`}
              >
                {style === "ruffled" ? "Ruffled" : "Non-Ruffled"}
              </button>
            ))}
          </div>
          {errors.romperStyle && <p className="font-sans text-xs text-rose mb-4">{errors.romperStyle}</p>}

          {formData.romperStyle && (
            <>
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="font-sans text-sm font-medium text-ink">
                  Color <span className="text-rose">*</span>
                </p>
                <button
                  type="button"
                  onClick={() => setShowColorModal(true)}
                  className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-2 cursor-pointer shrink-0"
                >
                  View color chart
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {romperColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onChange({ itemColor: color.id })}
                    title={color.label}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    aria-pressed={formData.itemColor === color.id}
                  >
                    <span
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200 block ${
                        formData.itemColor === color.id
                          ? "border-rose scale-110 shadow-md"
                          : "border-border group-hover:border-rose/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-sans text-[10px] text-muted text-center w-14 leading-tight">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.itemColor && <p className="font-sans text-xs text-rose mt-2">{errors.itemColor}</p>}
            </>
          )}
        </div>
      )}

      {/* Blanket color */}
      {showBlanketColor && (
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="font-sans text-sm font-medium text-ink">
              Color <span className="text-rose">*</span>
            </p>
            <button
              type="button"
              onClick={() => setShowColorModal(true)}
              className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-2 cursor-pointer shrink-0"
            >
              View color chart
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {blanketColors.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange({ itemColor: color.id })}
                title={color.label}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
                aria-pressed={formData.itemColor === color.id}
              >
                <span
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 block ${
                    formData.itemColor === color.id
                      ? "border-rose scale-110 shadow-md"
                      : "border-border group-hover:border-rose/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans text-[10px] text-muted text-center w-14 leading-tight">
                  {color.label}
                </span>
              </button>
            ))}
          </div>
          {errors.itemColor && <p className="font-sans text-xs text-rose mt-2">{errors.itemColor}</p>}
          <p className="font-sans text-xs text-muted mt-3">* Subject to availability. I'll confirm when I follow up.</p>
        </div>
      )}

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
          <p className="font-sans text-xs text-muted mt-3">* Subject to availability. I'll confirm when I follow up.</p>
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
              src={showRomperStyle ? romperChartSrc : showBlanketColor ? blanketChartSrc : colorChartSrc}
              alt="Available colors"
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
