"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

// ── Sweater colors — each maps to a real product photo ──
const SWEATER_COLORS = [
  { name: "Oatmilk",         hex: "#E8DFD0", image: "/images/products/sweaters/oatmilk.png" },
  { name: "Soft White",      hex: "#F0EDE6", image: "/images/products/sweaters/soft-white.png" },
  { name: "Peach Blossom",   hex: "#E8C4B8", image: "/images/products/sweaters/peach-blossom.png" },
  { name: "Rosewood",        hex: "#C9A09A", image: "/images/products/sweaters/rosewood.png" },
  { name: "Lavender",        hex: "#B8A4C8", image: "/images/products/sweaters/lavender.png" },
  { name: "Sky Blue",        hex: "#A8C4DC", image: "/images/products/sweaters/sky-blue.png" },
  { name: "Olive Green",     hex: "#7A8C6A", image: "/images/products/sweaters/olive-green.png" },
  { name: "Chestnut Hearth", hex: "#5C3425", image: "/images/products/sweaters/chestnut-hearth.png" },
  { name: "Cranberry",       hex: "#7A1A2E", image: "/images/products/sweaters/cranberry.png" },
  { name: "Dusty Violet",    hex: "#5E4E64", image: "/images/products/sweaters/dusty-violet.png" },
  { name: "Lake Blue",       hex: "#5A8A8C", image: "/images/products/sweaters/lake-blue.png" },
  { name: "Vintage Denim",   hex: "#7A8BA0", image: "/images/products/sweaters/vintage-denim.png" },
] as const;

// ── Yarn colors (Lion Brand Hue + Me — sampled from actual swatches) ──
const YARN_COLORS = [
  // Neutrals & lights
  { name: "Salt",              hex: "#EBE8E0", swatch: "/images/yarn/salt.jpg" },
  { name: "Whisper",           hex: "#B5B6AB", swatch: "/images/yarn/whisper.jpg" },
  { name: "Desert",            hex: "#B6A597", swatch: "/images/yarn/desert.jpg" },
  { name: "Macchiato",         hex: "#5D4E47", swatch: "/images/yarn/macchiato.jpg" },
  { name: "Toast",             hex: "#86724B", swatch: "/images/yarn/toast.jpg" },
  { name: "Warm Stone",        hex: "#7E6F65", swatch: "/images/yarn/warm-stone.jpg" },
  { name: "Terra",             hex: "#54504B", swatch: "/images/yarn/terra.jpg" },
  { name: "Cement",            hex: "#657981", swatch: "/images/yarn/cement.jpg" },
  { name: "Smoke",             hex: "#3D3E40", swatch: "/images/yarn/smoke.jpg" },
  { name: "Shadow",            hex: "#423F46", swatch: "/images/yarn/shadow.jpg" },
  { name: "Werewolf",          hex: "#0D1117", swatch: "/images/yarn/werewolf.jpg" },
  // Pinks & reds
  { name: "Rose Water",        hex: "#CEA293", swatch: "/images/yarn/rose-water.jpg" },
  { name: "Bellini",           hex: "#B28069", swatch: "/images/yarn/bellini.jpg" },
  { name: "Pink Earth",        hex: "#A06C69", swatch: "/images/yarn/pink-earth.jpg" },
  { name: "Grapefruit",        hex: "#B36B3C", swatch: "/images/yarn/grapefruit.jpg" },
  { name: "Spicy",             hex: "#743328", swatch: "/images/yarn/spicy.jpg" },
  { name: "Love Song",         hex: "#713F40", swatch: "/images/yarn/love-song.jpg" },
  { name: "Crush",             hex: "#432A34", swatch: "/images/yarn/crush.jpg" },
  { name: "Framboise",         hex: "#781015", swatch: "/images/yarn/framboise.jpg" },
  { name: "Gamay",             hex: "#430B11", swatch: "/images/yarn/gamay.jpg" },
  // Oranges & yellows
  { name: "Arrowwood",         hex: "#64400E", swatch: "/images/yarn/arrowwood.jpg" },
  { name: "Saffron",           hex: "#773D24", swatch: "/images/yarn/saffron.jpg" },
  { name: "Mustard",           hex: "#A4741E", swatch: "/images/yarn/mustard.jpg" },
  { name: "Sunflower",         hex: "#E7AB26", swatch: "/images/yarn/sunflower.jpg" },
  // Greens
  { name: "Dirty Chartreuse",  hex: "#9F9336", swatch: "/images/yarn/dirty-chartreuse.jpg" },
  { name: "Artichoke",         hex: "#7C9A7B", swatch: "/images/yarn/artichoke.jpg" },
  { name: "Fatigues",          hex: "#515847", swatch: "/images/yarn/fatigues.jpg" },
  { name: "Moss",              hex: "#4A4D30", swatch: "/images/yarn/moss.jpg" },
  { name: "Agave",             hex: "#517E7E", swatch: "/images/yarn/agave.jpg" },
  { name: "Juniper",           hex: "#2B4343", swatch: "/images/yarn/juniper.jpg" },
  { name: "Night Forest",      hex: "#2C3A2C", swatch: "/images/yarn/night-forest.jpg" },
  // Blues & purples
  { name: "Ozone",             hex: "#98B2C7", swatch: "/images/yarn/ozone.jpg" },
  { name: "Sea Glass",         hex: "#72AAA6", swatch: "/images/yarn/sea-glass.jpg" },
  { name: "Magic Hour",        hex: "#213D5D", swatch: "/images/yarn/magic-hour.jpg" },
  { name: "Harbor",            hex: "#6F7B7D", swatch: "/images/yarn/harbor.jpg" },
  { name: "Marine",            hex: "#495966", swatch: "/images/yarn/marine.jpg" },
  { name: "Deep Sea",          hex: "#083650", swatch: "/images/yarn/deep-sea.jpg" },
  { name: "Peacoat",           hex: "#0E1523", swatch: "/images/yarn/peacoat.jpg" },
  { name: "Haze",              hex: "#979BAD", swatch: "/images/yarn/haze.jpg" },
  { name: "Iris",              hex: "#5D5A63", swatch: "/images/yarn/iris.jpg" },
  { name: "Hyacinth",          hex: "#8D7587", swatch: "/images/yarn/hyacinth.jpg" },
  { name: "Aubergine",         hex: "#44233F", swatch: "/images/yarn/aubergine.jpg" },
] as const;

const MAX_NAME_LENGTH = 14;

// Preview font — Pacifico (thick script, loaded via next/font/google)
const PREVIEW_FONT = "var(--font-script), 'Pacifico', cursive";

// ── Preview component ──
function Preview({
  name,
  sweaterImage,
  yarnColor,
  yarnSwatch,
}: {
  name: string;
  sweaterImage: string;
  yarnColor: string;
  yarnSwatch?: string;
}) {
  const fontSize = useMemo(() => {
    const len = name.length || 1;
    if (len <= 4) return "clamp(36px, 7vw, 54px)";
    if (len <= 7) return "clamp(30px, 5.5vw, 44px)";
    if (len <= 10) return "clamp(24px, 4.5vw, 36px)";
    return "clamp(18px, 3.5vw, 30px)";
  }, [name.length]);

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Sweater image with realistic shadow */}
      <div
        className="relative w-full aspect-square"
        style={{
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15)) drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
        }}
      >
        <Image
          src={sweaterImage}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80vw, 320px"
          priority
        />
        {/* Subtle vignette overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.06) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      {/* Name overlay — positioned on chest */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ paddingBottom: "10%" }}
      >
        <span
          className="block text-center transition-all duration-300 ease-out select-none px-4"
          style={{
            fontFamily: PREVIEW_FONT,
            fontWeight: 400,
            fontSize,
            lineHeight: 1.2,
            maxWidth: "70%",
            wordBreak: "break-word" as const,
            // Yarn texture fill when swatch available, flat color otherwise
            ...(yarnSwatch
              ? {
                  backgroundImage: `linear-gradient(${yarnColor}66, ${yarnColor}66), url(${yarnSwatch})`,
                  backgroundSize: "100% 100%, 3px 3px",
                  backgroundPosition: "center, center",
                  WebkitBackgroundClip: "text, text",
                  backgroundClip: "text, text",
                  color: "transparent",
                  WebkitTextStroke: `0.5px rgba(0,0,0,0.15)`,
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15)) contrast(1.05) saturate(1.05)",
                }
              : {
                  color: yarnColor,
                  textShadow: [
                    `0 -1px 0 rgba(255,255,255,0.25)`,
                    `0 1px 1px rgba(0,0,0,0.2)`,
                    `1px 0 0 ${yarnColor}`,
                    `-1px 0 0 ${yarnColor}`,
                    `0 1px 0 ${yarnColor}`,
                    `0 -1px 0 ${yarnColor}`,
                    `0 2px 3px rgba(0,0,0,0.1)`,
                  ].join(", "),
                  WebkitTextStroke: `0.5px ${yarnColor}`,
                  paintOrder: "stroke fill",
                }),
          }}
        >
          {name || "Name"}
        </span>
      </div>
    </div>
  );
}

// ── Main configurator ──
export default function SweaterConfigurator() {
  const [name, setName] = useState("");
  const [sweaterIdx, setSweaterIdx] = useState(0); // Oatmilk
  const [yarnIdx, setYarnIdx] = useState(38);      // Peacoat
  const sweater = SWEATER_COLORS[sweaterIdx];
  const yarn = YARN_COLORS[yarnIdx];

  return (
    <div>
      {/* Preview */}
      <div className="mb-8 bg-cream rounded p-6 md:p-8">
        <Preview
          name={name}
          sweaterImage={sweater.image}
          yarnColor={yarn.hex}
          yarnSwatch={yarn.swatch}
        />
      </div>

      {/* Controls */}
      <div className="space-y-7">

        {/* Name input */}
        <div>
          <label htmlFor="preview-name" className="block font-sans text-sm font-medium text-ink mb-2">
            Name
          </label>
          <input
            id="preview-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
            placeholder="Enter name"
            maxLength={MAX_NAME_LENGTH}
            className="w-full px-4 py-3 rounded border border-border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
          />
          <p className="font-sans text-xs text-muted mt-1.5 text-right">{name.length}/{MAX_NAME_LENGTH}</p>
        </div>

        {/* Yarn color */}
        <div>
          <p className="font-sans text-sm font-medium text-ink mb-1">
            Yarn color
            <span className="font-normal text-muted ml-1.5">{yarn.name}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {YARN_COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setYarnIdx(i)}
                title={c.name}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  yarnIdx === i ? "border-rose scale-110" : "border-border hover:border-rose/40"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Sweater color */}
        <div>
          <p className="font-sans text-sm font-medium text-ink mb-1">
            Sweater color
            <span className="font-normal text-muted ml-1.5">{sweater.name}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {SWEATER_COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setSweaterIdx(i)}
                title={c.name}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                  sweaterIdx === i ? "border-rose scale-110" : "border-border hover:border-rose/40"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <p className="font-sans text-xs text-muted/60 mt-8 text-center leading-relaxed">
        Preview is a mockup. Final embroidery may vary slightly in placement and lettering.
        Font shown is for preview only — choose your font style when placing your order.
      </p>
    </div>
  );
}
