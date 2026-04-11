"use client";

import { useMemo, useState } from "react";
import SweaterVisualPreview from "@/components/custom/SweaterVisualPreview";
import { BABY_TODDLER_SWEATER_COLORS } from "@/lib/data/babyToddlerSweaterColors";
import { YARN_COLORS, findYarnColor, type YarnColor } from "@/lib/data/yarnColors";
import { INITIAL_FORM_DATA, type CartItem } from "@/lib/types";

// Shared storage contract with OrderForm. This component and OrderForm both
// read/write the same key, so the hero preview doubles as a seed for the full
// order form — no URL params, no restore indirection.
const ORDER_FORM_STORAGE_KEY = "ttc_order_form";
const SWEATER_CUSTOMIZE_STEP = 2;

// Defaults — a soft, warm, on-brand starting point.
//   Name: Olivia  ·  Sweater: Rosewood  ·  Yarn: Salt  ·  Daisies: on
// "baby-toddler-sweater" is the item type whose palette includes Rosewood and
// is also the entry point users land on in StepCustomizeSweater.
const DEFAULT_ITEM_TYPE = "baby-toddler-sweater";
const DEFAULT_NAME = "Olivia";
const DEFAULT_SWEATER_ID = "rosewood";
const DEFAULT_YARN_NAME = "Salt";
const DEFAULT_DAISIES = true;

const MAX_NAME_LENGTH = 14;

// Curated yarn subset for the hero — 10 colors that span the full palette so
// users understand the range without drowning the hero in 40 swatches. The
// full /custom designer still shows every yarn; the "+ more" line hints at it.
const HERO_YARN_NAMES = [
  "Salt",
  "Sunflower",
  "Framboise",
  "Rose Water",
  "Sea Glass",
  "Moss",
  "Magic Hour",
  "Hyacinth",
  "Macchiato",
  "Werewolf",
] as const;

const HERO_YARNS: YarnColor[] = HERO_YARN_NAMES.map((n) => findYarnColor(n)).filter(
  (y): y is YarnColor => !!y
);

const REMAINING_YARN_COUNT = YARN_COLORS.length - HERO_YARNS.length;

export default function HeroPreviewInteractive() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [sweaterId, setSweaterId] = useState<string>(DEFAULT_SWEATER_ID);
  const [yarnName, setYarnName] = useState<string>(DEFAULT_YARN_NAME);
  const [daisies, setDaisies] = useState(DEFAULT_DAISIES);

  const sweater = useMemo(
    () =>
      BABY_TODDLER_SWEATER_COLORS.find((c) => c.id === sweaterId) ??
      BABY_TODDLER_SWEATER_COLORS[0],
    [sweaterId]
  );
  const yarn = useMemo(
    () => findYarnColor(yarnName) ?? HERO_YARNS[0],
    [yarnName]
  );

  // On "Continue" click, write the current selections into the shared
  // ttc_order_form localStorage bucket that OrderForm restores from on mount.
  // Any in-progress cart from a prior session is preserved — we only replace
  // the current-item fields. Runs synchronously before navigation, so by the
  // time /custom mounts, the storage is already seeded.
  const handleContinue = () => {
    if (typeof window === "undefined") return;
    try {
      // Preserve any existing cart from a prior session.
      let existingCart: CartItem[] = [];
      try {
        const prior = localStorage.getItem(ORDER_FORM_STORAGE_KEY);
        if (prior) {
          const parsed = JSON.parse(prior);
          existingCart = parsed?.formData?.cart ?? [];
        }
      } catch {}

      // Match the exact shape OrderForm serializes (referenceImageFile is
      // stripped on save; null round-trips as null through JSON).
      const seededFormData = {
        ...INITIAL_FORM_DATA,
        cart: existingCart,
        itemType: DEFAULT_ITEM_TYPE,
        wording: name.trim() || DEFAULT_NAME,
        itemColor: sweater.id,
        yarnColors: [yarn.name],
        daisies,
        referenceImageFile: null,
      };

      localStorage.setItem(
        ORDER_FORM_STORAGE_KEY,
        JSON.stringify({ step: SWEATER_CUSTOMIZE_STEP, formData: seededFormData })
      );
      // Clear any stale image blob from a prior session — the seeded item
      // has no reference image attached.
      localStorage.removeItem("ttc_order_image");
    } catch {}
  };

  return (
    <div>
      {/* ── Visual preview ── */}
      <SweaterVisualPreview
        name={name || "Name"}
        sweaterImage={sweater.image}
        yarnColor={yarn.hex}
        yarnSwatch={yarn.swatch}
        showDaisies={daisies}
        className="relative w-full max-w-[260px] sm:max-w-xs mx-auto"
      />

      <p className="mt-4 text-center font-sans text-xs text-muted italic">
        Start with this design and make it your own
      </p>

      {/* ── Controls ── */}
      <div className="mt-6 space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="hero-name"
            className="block font-sans text-xs font-medium text-ink mb-1.5"
          >
            Name
          </label>
          <input
            id="hero-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Enter a name"
            className="w-full px-3 py-2.5 rounded border border-border bg-warm-white font-sans text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
          />
        </div>

        {/* Sweater color */}
        <div>
          <p className="font-sans text-xs font-medium text-ink mb-1.5">
            Sweater color
            <span className="font-normal text-muted ml-1.5">{sweater.label}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {BABY_TODDLER_SWEATER_COLORS.map((c) => {
              const selected = sweaterId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSweaterId(c.id)}
                  title={c.label}
                  aria-label={c.label}
                  aria-pressed={selected}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    selected
                      ? "border-rose scale-110"
                      : "border-border hover:border-rose/40"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* Yarn color */}
        <div>
          <p className="font-sans text-xs font-medium text-ink mb-1.5">
            Yarn color
            <span className="font-normal text-muted ml-1.5">{yarn.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {HERO_YARNS.map((c) => {
              const selected = yarnName === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setYarnName(c.name)}
                  title={c.name}
                  aria-label={c.name}
                  aria-pressed={selected}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                    selected
                      ? "border-rose scale-110"
                      : "border-border hover:border-rose/40"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
          <p className="font-sans text-[11px] text-muted/80 mt-2">
            + {REMAINING_YARN_COUNT} more colors in the full designer
          </p>
        </div>

        {/* Daisies */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="relative inline-block w-10 h-5">
              <input
                type="checkbox"
                checked={daisies}
                onChange={(e) => setDaisies(e.target.checked)}
                className="sr-only peer"
              />
              <span className="block w-full h-full rounded-full bg-border peer-checked:bg-rose transition-colors" />
              <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
            <span className="font-sans text-sm text-ink">Add daisies</span>
          </label>
        </div>
      </div>

      {/* ── CTA ── */}
      {/* Plain <a> (not next/link) intentionally: we want a hard navigation
          so OrderForm definitely remounts and re-runs its localStorage
          restore effect. Link's client-side navigation can reuse a cached
          /custom route tree (if the user visited it earlier in the session)
          and skip the mount effect entirely, leaving our seeded state
          unread. localStorage survives the reload, so the seed is intact
          on the other side. */}
      <a
        href="/custom#order"
        onClick={handleContinue}
        className="group mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors"
      >
        Continue your custom sweater
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  );
}
