"use client";

import { useState } from "react";
import Image from "next/image";
import type { OrderFormData, FontStyle, SpecialtyDesign } from "@/lib/types";

interface StepCustomizeProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const fontOptions: { value: FontStyle; label: string }[] = [
  { value: "font-1", label: "Font 1" },
  { value: "font-2", label: "Font 2" },
  { value: "font-3", label: "Font 3" },
  { value: "font-4", label: "Font 4" },
  { value: "font-5", label: "Font 5" },
  { value: "font-6", label: "Font 6" },
  { value: "font-7", label: "Font 7" },
  { value: "font-8", label: "Font 8" },
];

const yarnColors: string[] = [
  "Desert", "Salt", "Rose Water", "Bellini", "Ozone", "Magic Hour", "Peacoat",
  "Warm Stone", "Macchiato", "Terra", "Arrowwood", "Spicy", "Love Song", "Haze",
  "Iris", "Cement", "Smoke", "Shadow", "Werewolf", "Sea Glass", "Agave", "Fatigues",
  "Juniper", "Grapefruit", "Toast", "Saffron", "Mustard", "Night Forest", "Moss",
  "Dirty Chartreuse", "Artichoke", "Pink Earth", "Harbor", "Marine", "Whisper",
  "Crush", "Deep Sea", "Gamay", "Framboise", "Hyacinth", "Aubergine", "Sunflower",
];

const MAX_COLORS = 3;
const MAX_WORDING_LENGTH = 50;

export default function StepCustomize({
  formData,
  onChange,
  onNext,
  onBack,
}: StepCustomizeProps) {
  const [errors, setErrors] = useState<{ wording?: string; font?: string; colors?: string }>({});
  const [showColorModal, setShowColorModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);

  const toggleColor = (colorName: string) => {
    const current = formData.yarnColors;
    if (current.includes(colorName)) {
      onChange({ yarnColors: current.filter((c) => c !== colorName) });
    } else if (current.length < MAX_COLORS) {
      onChange({ yarnColors: [...current, colorName] });
    }
  };

  const isLetterDesign = formData.specialtyDesign === "block-letter" || formData.specialtyDesign === "floral-letter";
  const maxColors = formData.specialtyDesign === "block-letter" ? 1 : formData.specialtyDesign === "floral-letter" ? 5 : MAX_COLORS;

  const isCustomInquiry = formData.itemType === "custom";

  const validate = () => {
    const errs: typeof errors = {};
    if (isCustomInquiry) {
      if (!formData.inquiryDescription.trim()) errs.wording = "Please describe what you have in mind.";
    } else {
      if (!formData.wording.trim()) {
        errs.wording = isLetterDesign ? "Please enter the letter to embroider." : "Please enter the wording to embroider.";
      } else if (isLetterDesign && formData.wording.trim().length > 1) {
        errs.wording = "Block and floral letter designs use a single letter.";
      }
      if (!isLetterDesign && !formData.fontStyle) errs.font = "Please choose a font style.";
      if (formData.yarnColors.length === 0) errs.colors = "Please select at least one yarn color.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const specialtyOptions: { value: SpecialtyDesign; label: string; price: string; desc: string }[] = [
    { value: "block-letter", label: "Block Letter", price: "$45", desc: "Large decorative block letter" },
    { value: "floral-letter", label: "Floral Letter", price: "$50", desc: "Letter with floral embellishments" },
  ];

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">
        {isCustomInquiry ? "Tell me what you're thinking" : "Customize your piece"}
      </h2>
      <p className="font-sans text-sm text-muted mb-8">
        {isCustomInquiry
          ? "Describe your idea and I'll reach out to talk through the details."
          : "Enter the wording, choose a font, and pick your yarn colors."}
      </p>

      {isCustomInquiry && (
        <div className="mb-10">
          <label htmlFor="inquiryDescription" className="block font-sans text-sm font-medium text-ink mb-2">
            What do you have in mind? <span className="text-rose">*</span>
          </label>
          <textarea
            id="inquiryDescription"
            rows={6}
            value={formData.inquiryDescription}
            onChange={(e) => onChange({ inquiryDescription: e.target.value })}
            placeholder="e.g. I'd love a custom denim jacket with my daughter's name and a floral design…"
            className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/50 resize-none transition-colors ${errors.wording ? "border-rose" : "border-border"}`}
          />
          {errors.wording && <p className="font-sans text-xs text-rose mt-1.5">{errors.wording}</p>}
        </div>
      )}

      {/* Specialty design - not shown for blankets or custom inquiries */}
      {!isCustomInquiry && formData.itemType !== "blanket-cotton" && (
        <div className="mb-8">
          <p className="font-sans text-sm font-medium text-ink mb-3">Specialty design <span className="font-normal text-muted">(optional)</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {specialtyOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  const next = formData.specialtyDesign === opt.value ? "" : opt.value;
                  const colorLimit = next === "block-letter" ? 1 : next === "floral-letter" ? 5 : MAX_COLORS;
                  onChange({
                    specialtyDesign: next,
                    wording: "",
                    fontStyle: "",
                    yarnColors: formData.yarnColors.slice(0, colorLimit),
                  });
                }}
                className={`
                  text-left p-3 rounded border-2 transition-all duration-200 cursor-pointer
                  ${formData.specialtyDesign === opt.value
                    ? "border-rose bg-rose/5"
                    : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
                  }
                `}
              >
                <span className="font-serif text-sm text-brown block">{opt.label}</span>
                <span className="font-sans text-xs text-muted block">{opt.desc}</span>
                <span className="font-sans text-xs font-medium text-rose block mt-1">{opt.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wording / Font / Yarn — hidden for custom inquiries */}
      {!isCustomInquiry && (<>
      <div className="mb-8">
        <label htmlFor="wording" className="block font-sans text-sm font-medium text-ink mb-2">
          {isLetterDesign ? "Letter" : "Wording"} <span className="text-rose">*</span>
        </label>
        <input
          id="wording"
          type="text"
          maxLength={isLetterDesign ? 1 : MAX_WORDING_LENGTH}
          value={formData.wording}
          onChange={(e) => {
            onChange({ wording: e.target.value });
            if (errors.wording) setErrors((prev) => ({ ...prev, wording: undefined }));
          }}
          placeholder={isLetterDesign ? "e.g. E" : 'e.g. Emma, baby girl, The Smiths, "brave little one"…'}
          className={`
            w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors
            ${errors.wording ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {!isLetterDesign && (
          <p className="font-sans text-xs text-muted mt-1.5">
            Capitalization matters. &lsquo;Emma&rsquo; vs &lsquo;emma&rsquo; will be stitched as written.
            {" "}
            <span className="text-ink/60">{formData.wording.length}/{MAX_WORDING_LENGTH}</span>
          </p>
        )}
        {errors.wording && <p className="font-sans text-xs text-rose mt-1">{errors.wording}</p>}
      </div>

      {/* Font style */}
      {!isLetterDesign && <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-sans text-sm font-medium text-ink">
            Font style <span className="text-rose">*</span>
          </p>
          <button
            type="button"
            onClick={() => setShowFontModal(true)}
            className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-2 cursor-pointer"
          >
            View font charts
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              type="button"
              onClick={() => {
                onChange({ fontStyle: font.value });
                if (errors.font) setErrors((prev) => ({ ...prev, font: undefined }));
              }}
              className={`
                text-left p-3 rounded border-2 transition-all duration-200 cursor-pointer
                ${formData.fontStyle === font.value
                  ? "border-rose bg-rose/5"
                  : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
                }
              `}
            >
              <span className="font-serif text-sm text-brown block">{font.label}</span>
            </button>
          ))}
        </div>
        {errors.font && <p className="font-sans text-xs text-rose mt-2">{errors.font}</p>}
      </div>}

      {/* Yarn colors */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <p className="font-sans text-sm font-medium text-ink">
            Yarn colors <span className="text-rose">*</span>{" "}
            <span className="font-normal text-muted">(up to {maxColors})</span>
          </p>
          <button
            type="button"
            onClick={() => setShowColorModal(true)}
            className="font-sans text-xs text-rose hover:text-rose-dark transition-colors underline underline-offset-2 cursor-pointer"
          >
            View color charts
          </button>
        </div>
        {!isLetterDesign && (
          <p className="font-sans text-xs text-muted mb-3">
            Need more than 3 colors or have a very custom design? Pick your closest matches and add a note in the personalization field. We&rsquo;ll finalize the details in follow-up.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {yarnColors.map((color) => {
            const selected = formData.yarnColors.includes(color);
            const disabled = !selected && formData.yarnColors.length >= maxColors;
            return (
              <button
                key={color}
                type="button"
                onClick={() => {
                  if (!disabled) {
                    toggleColor(color);
                    if (errors.colors) setErrors((prev) => ({ ...prev, colors: undefined }));
                  }
                }}
                disabled={disabled}
                className={`
                  text-left p-3 rounded border-2 transition-all duration-200
                  ${selected ? "border-rose bg-rose/5" : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"}
                  ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                `}
                aria-pressed={selected}
              >
                <span className="font-serif text-sm text-brown block">{color}</span>
              </button>
            );
          })}
        </div>

        {formData.yarnColors.length > 0 && (
          <p className="font-sans text-xs text-muted mt-2">
            Selected: {formData.yarnColors.join(", ")}
          </p>
        )}
        {errors.colors && <p className="font-sans text-xs text-rose mt-1">{errors.colors}</p>}
      </div>
      </>)}

      {/* Font modal */}
      {showFontModal && (
        <div
          className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center p-6"
          onClick={() => setShowFontModal(false)}
        >
          <div
            className="bg-warm-white max-w-lg w-full p-6 border border-border max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-brown">Font styles</h3>
              <button
                type="button"
                onClick={() => setShowFontModal(false)}
                className="font-sans text-sm text-muted hover:text-brown transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            <Image
              src="/images/assets/font-list.jpg"
              alt="Available embroidery font styles"
              width={600}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Color modal */}
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
              <h3 className="font-serif text-xl text-brown">Yarn color charts</h3>
              <button
                type="button"
                onClick={() => setShowColorModal(false)}
                className="font-sans text-sm text-muted hover:text-brown transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="font-sans text-sm text-muted mb-6 leading-relaxed">
              Reference the charts below, then select your colors using the swatches in the form.
            </p>
            <div className="space-y-4">
              {["/images/assets/yarn-colors-1.png", "/images/assets/yarn-colors-2.png", "/images/assets/yarn-colors-3.png"].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Yarn color chart ${i + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
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
