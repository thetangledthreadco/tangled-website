"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Pacifico } from "next/font/google";

// Preview font: Pacifico (thick script). Loaded directly in this component
// so the className is applied on the span itself. Relying on
// `var(--font-script)` via the root layout was unreliable on iOS Safari,
// which would fall through to the `cursive` fallback (Snell Roundhand).
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// ── 5-petal daisy SVG ──
function Daisy({
  color,
  centerColor = "#FFFFFF",
  size = 16,
}: {
  color: string;
  centerColor?: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="12"
          cy="5"
          rx="3.5"
          ry="5.5"
          fill={color}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="3" fill={centerColor} />
    </svg>
  );
}

// Scattered positions for daisies, relative to the sweater container
const DAISY_POSITIONS = [
  { top: "22%", left: "28%", rotate: -20 },
  { top: "27%", right: "32%", rotate: 25 },
  { top: "57%", left: "32%", rotate: -10 },
  { top: "55%", right: "32%", rotate: 15 },
  { top: "68%", left: "42%", rotate: -35 },
];

const DAISY_SIZE = 20;

export interface SweaterVisualPreviewProps {
  name: string;
  sweaterImage: string;
  yarnColor: string; // hex
  yarnSwatch?: string;
  showDaisies: boolean;
  /** Override the outer container classes (default: "relative w-full max-w-xs mx-auto") */
  className?: string;
}

export default function SweaterVisualPreview({
  name,
  sweaterImage,
  yarnColor,
  yarnSwatch,
  showDaisies,
  className = "relative w-full max-w-xs mx-auto",
}: SweaterVisualPreviewProps) {
  const fontSize = useMemo(() => {
    const len = name.length || 1;
    if (len <= 4) return "clamp(36px, 7vw, 54px)";
    if (len <= 7) return "clamp(30px, 5.5vw, 44px)";
    if (len <= 10) return "clamp(24px, 4.5vw, 36px)";
    return "clamp(18px, 3.5vw, 30px)";
  }, [name.length]);

  // Salt yarn gets taupe daisy centers (it'd disappear against the cream sweater)
  const daisyCenter = yarnColor === "#EBE8E0" ? "#B8A99A" : "#FFFFFF";

  return (
    <div className={className}>
      {/* Sweater image with realistic shadow */}
      <div
        className="relative w-full aspect-square"
        style={{
          filter:
            "drop-shadow(0 8px 20px rgba(0,0,0,0.15)) drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
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
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.06) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>
      {/* Name overlay, positioned on chest */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ paddingBottom: "10%" }}
      >
        <span
          className={`${pacifico.className} relative block text-center transition-all duration-300 ease-out select-none px-4`}
          style={{
            fontWeight: 400,
            fontSize,
            lineHeight: 1.2,
            maxWidth: "70%",
            wordBreak: "break-word" as const,
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
          }}
        >
          {name || "Name"}
        </span>
      </div>
      {/* Scattered daisies */}
      {showDaisies &&
        DAISY_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              top: pos.top,
              left: "left" in pos ? pos.left : undefined,
              right: "right" in pos ? pos.right : undefined,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            <Daisy color={yarnColor} centerColor={daisyCenter} size={DAISY_SIZE} />
          </span>
        ))}
    </div>
  );
}
