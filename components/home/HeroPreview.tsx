"use client";

import { useEffect, useState } from "react";
import SweaterVisualPreview from "@/components/custom/SweaterVisualPreview";

// Hand-picked presets that show off the full range of the designer:
// different sweaters, different yarn colors, daisies on/off, varied names.
const PRESETS = [
  {
    name: "Lily",
    sweaterImage: "/images/products/sweaters/oatmilk.png",
    yarnColor: "#EBE8E0", // Salt
    yarnSwatch: "/images/yarn/salt.jpg",
    showDaisies: true,
  },
  {
    name: "Theo",
    sweaterImage: "/images/products/sweaters/sky-blue.png",
    yarnColor: "#213D5D", // Magic Hour
    yarnSwatch: "/images/yarn/magic-hour.jpg",
    showDaisies: false,
  },
  {
    name: "Hazel",
    sweaterImage: "/images/products/sweaters/rosewood.png",
    yarnColor: "#5D4E47", // Macchiato
    yarnSwatch: "/images/yarn/macchiato.jpg",
    showDaisies: true,
  },
  {
    name: "August",
    sweaterImage: "/images/products/sweaters/soft-white.png",
    yarnColor: "#781015", // Framboise
    yarnSwatch: "/images/yarn/framboise.jpg",
    showDaisies: false,
  },
  {
    name: "Juni",
    sweaterImage: "/images/products/sweaters/olive-green.png",
    yarnColor: "#E7AB26", // Sunflower
    yarnSwatch: "/images/yarn/sunflower.jpg",
    showDaisies: true,
  },
] as const;

const CYCLE_MS = 3000;

export default function HeroPreview() {
  const [i, setI] = useState(0);

  // Preload all sweater + yarn swatch images once on mount so cycling is smooth.
  useEffect(() => {
    PRESETS.forEach((p) => {
      const sweater = new window.Image();
      sweater.src = p.sweaterImage;
      if (p.yarnSwatch) {
        const swatch = new window.Image();
        swatch.src = p.yarnSwatch;
      }
    });
  }, []);

  // Cycle through presets.
  useEffect(() => {
    const id = window.setInterval(() => {
      setI((prev) => (prev + 1) % PRESETS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const current = PRESETS[i];

  return (
    <div>
      {/* "Live" indicator, centered above the preview so it never collides */}
      <div className="flex justify-center mb-5">
        <div className="flex items-center gap-2 bg-cream px-3 py-1.5 rounded-full border border-border shadow-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-rose animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-rose" />
          </span>
          <span className="font-sans text-[10px] font-medium tracking-widest text-brown uppercase">
            Live preview
          </span>
        </div>
      </div>

      <SweaterVisualPreview
        key={i}
        name={current.name}
        sweaterImage={current.sweaterImage}
        yarnColor={current.yarnColor}
        yarnSwatch={current.yarnSwatch}
        showDaisies={current.showDaisies}
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto animate-[fadeIn_0.6s_ease-out]"
      />

      {/* Caption showing what's currently being previewed */}
      <p className="mt-5 text-center font-sans text-xs text-muted">
        &ldquo;{current.name}&rdquo; &middot; see it update as you design
      </p>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
