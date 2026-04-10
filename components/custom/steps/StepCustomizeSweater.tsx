"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { OrderFormData, FontStyle } from "@/lib/types";
import { YARN_COLORS, findYarnColor } from "@/lib/data/yarnColors";
import { BABY_TODDLER_SWEATER_COLORS } from "@/lib/data/babyToddlerSweaterColors";
import { ADULT_KID_SWEATER_COLORS } from "@/lib/data/adultKidSweaterColors";
import SweaterVisualPreview from "../SweaterVisualPreview";

// Each sweater type has its own color set: same shape, different images.
// Big-kid and adult share the AliExpress set; baby/toddler has its own.
const SWEATER_COLOR_SETS: Record<
  string,
  ReadonlyArray<{ id: string; label: string; hex: string; image: string }>
> = {
  "baby-toddler-sweater": BABY_TODDLER_SWEATER_COLORS,
  "big-kid-sweater": ADULT_KID_SWEATER_COLORS,
  "adult-sweater": ADULT_KID_SWEATER_COLORS,
};

interface Props {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_WORDING_LENGTH = 14;

const FONT_OPTIONS: { value: FontStyle; src: string }[] = [
  { value: "font-1", src: "/images/assets/font1.png" },
  { value: "font-2", src: "/images/assets/font2.png" },
  { value: "font-3", src: "/images/assets/font3.png" },
  { value: "font-4", src: "/images/assets/font4.png" },
  { value: "font-5", src: "/images/assets/font5.png" },
  { value: "font-6", src: "/images/assets/font6.png" },
  { value: "font-7", src: "/images/assets/font7.png" },
  { value: "font-8", src: "/images/assets/font8.png" },
];

export default function StepCustomizeSweater({
  formData,
  onChange,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<{
    wording?: string;
    font?: string;
    yarnColor?: string;
    sweaterColor?: string;
  }>({});

  // Pick the right color set based on the current sweater item type.
  // Fallback to baby/toddler if the itemType somehow doesn't match.
  const sweaterColors =
    SWEATER_COLOR_SETS[formData.itemType] ?? BABY_TODDLER_SWEATER_COLORS;

  // Current selections: yarn is 1 color stored as single-element array in yarnColors[0]
  const yarnName = formData.yarnColors[0] ?? "";
  const yarn = findYarnColor(yarnName);
  const sweater =
    sweaterColors.find((c) => c.id === formData.itemColor) ?? sweaterColors[0];

  // If the user switched sweater types (e.g. baby-toddler → adult), the old
  // itemColor may not exist in the new color set. Clear it so they re-pick.
  useEffect(() => {
    if (
      formData.itemColor &&
      !sweaterColors.some((c) => c.id === formData.itemColor)
    ) {
      onChange({ itemColor: "" });
    }
  }, [formData.itemColor, sweaterColors, onChange]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!formData.wording.trim()) errs.wording = "Please enter a name.";
    if (!formData.fontStyle) errs.font = "Please choose a font.";
    if (!yarnName) errs.yarnColor = "Please pick a yarn color.";
    if (!formData.itemColor) errs.sweaterColor = "Please pick a sweater color.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const selectYarn = (name: string) => {
    onChange({ yarnColors: [name] });
    if (errors.yarnColor) setErrors((p) => ({ ...p, yarnColor: undefined }));
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Customize your sweater</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Play with the preview until it looks the way you want.
      </p>

      {/* Sticky visual preview */}
      <div className="sticky top-0 z-10 bg-warm-white pt-2 pb-4 -mx-6 px-6 md:-mx-0 md:px-0">
        <div className="bg-cream rounded p-6 md:p-8">
          <SweaterVisualPreview
            name={formData.wording}
            sweaterImage={sweater.image}
            yarnColor={yarn?.hex ?? "#1C1917"}
            yarnSwatch={yarn?.swatch}
            showDaisies={formData.daisies}
          />
        </div>
        <p className="font-sans text-xs text-muted text-center mt-3 whitespace-normal md:whitespace-nowrap px-2">
          Want something different? I can create fully custom designs too - just leave a note!
        </p>
      </div>

      {/* Name */}
      <div className="mt-8 mb-8">
        <label
          htmlFor="wording"
          className="block font-sans text-sm font-medium text-ink mb-2"
        >
          Name <span className="text-rose">*</span>
        </label>
        <input
          id="wording"
          type="text"
          value={formData.wording}
          onChange={(e) => {
            onChange({ wording: e.target.value.slice(0, MAX_WORDING_LENGTH) });
            if (errors.wording) setErrors((p) => ({ ...p, wording: undefined }));
          }}
          placeholder="Enter the name"
          maxLength={MAX_WORDING_LENGTH}
          className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors ${
            errors.wording ? "border-rose" : "border-border focus:border-rose/50"
          }`}
        />
        <p className="font-sans text-xs text-muted mt-1.5 text-right">
          {formData.wording.length}/{MAX_WORDING_LENGTH}
        </p>
        {errors.wording && (
          <p className="font-sans text-xs text-rose mt-1">{errors.wording}</p>
        )}
      </div>

      {/* Daisies toggle */}
      <div className="mb-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="relative inline-block w-10 h-5">
            <input
              type="checkbox"
              checked={formData.daisies}
              onChange={(e) => onChange({ daisies: e.target.checked })}
              className="sr-only peer"
            />
            <span className="block w-full h-full rounded-full bg-border peer-checked:bg-rose transition-colors" />
            <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
          </span>
          <span className="font-sans text-sm text-ink">Add daisies</span>
        </label>
        {formData.daisies && (
          <p className="font-sans text-xs text-muted mt-1.5">
            Flower colors can be customized. Just mention your preference in the order notes, otherwise they&#39;ll match the name color.
          </p>
        )}
      </div>

      {/* Sweater color */}
      <div className="mb-8">
        <p className="font-sans text-sm font-medium text-ink mb-1">
          Sweater color <span className="text-rose">*</span>
          {formData.itemColor && (
            <span className="font-normal text-muted ml-1.5">{sweater.label}</span>
          )}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {sweaterColors.map((c) => {
            const selected = formData.itemColor === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChange({ itemColor: c.id });
                  if (errors.sweaterColor)
                    setErrors((p) => ({ ...p, sweaterColor: undefined }));
                }}
                title={c.label}
                aria-pressed={selected}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  selected ? "border-rose scale-110" : "border-border hover:border-rose/40"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        {errors.sweaterColor && (
          <p className="font-sans text-xs text-rose mt-2">{errors.sweaterColor}</p>
        )}
        <p className="font-sans text-xs text-muted mt-3">
          * Subject to availability. I&apos;ll confirm when I follow up.
        </p>
      </div>

      {/* Yarn color */}
      <div className="mb-8">
        <p className="font-sans text-sm font-medium text-ink mb-1">
          Yarn color <span className="text-rose">*</span>
          {yarn && <span className="font-normal text-muted ml-1.5">{yarn.name}</span>}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {YARN_COLORS.map((c) => {
            const selected = yarnName === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => selectYarn(c.name)}
                title={c.name}
                aria-pressed={selected}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  selected ? "border-rose scale-110" : "border-border hover:border-rose/40"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        {errors.yarnColor && (
          <p className="font-sans text-xs text-rose mt-2">{errors.yarnColor}</p>
        )}
      </div>

      {/* Font */}
      <div className="mb-10">
        <p className="font-sans text-sm font-medium text-ink mb-1">
          Font style <span className="text-rose">*</span>
        </p>
        <p className="font-sans text-xs text-muted mb-3">
          The preview font is just for placement. Your chosen font will be used in the actual
          embroidery, and I&apos;ll send a final mockup with the name in your chosen font before
          I start stitching.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FONT_OPTIONS.map((font) => {
            const selected = formData.fontStyle === font.value;
            return (
              <button
                key={font.value}
                type="button"
                onClick={() => {
                  onChange({ fontStyle: font.value });
                  if (errors.font) setErrors((p) => ({ ...p, font: undefined }));
                }}
                className={`relative flex items-center justify-center p-3 h-16 rounded border-2 bg-warm-white transition-all duration-200 cursor-pointer ${
                  selected
                    ? "border-rose bg-rose/5"
                    : "border-border hover:border-rose/40 hover:bg-oat"
                }`}
                aria-pressed={selected}
              >
                <Image
                  src={font.src}
                  alt={`Font ${font.value.replace("font-", "")}`}
                  width={140}
                  height={48}
                  className="max-h-full w-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </button>
            );
          })}
        </div>
        {errors.font && (
          <p className="font-sans text-xs text-rose mt-2">{errors.font}</p>
        )}
      </div>

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
