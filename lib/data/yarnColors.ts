// Lion Brand Hue + Me yarn palette, sampled from actual swatches.
// Shared between the baby/toddler sweater customizer and any other step that
// needs hex + swatch paths.

export interface YarnColor {
  name: string;
  hex: string;
  swatch: string;
}

export const YARN_COLORS: readonly YarnColor[] = [
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
];

export function findYarnColor(name: string): YarnColor | undefined {
  return YARN_COLORS.find((c) => c.name === name);
}
