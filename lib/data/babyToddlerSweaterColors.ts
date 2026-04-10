// Baby & toddler sweater colors (0m–5T) with matching product image paths.
// Shared between the StepCustomize baby-toddler visual configurator and StepOptions.

export interface BabyToddlerSweaterColor {
  id: string;
  label: string;
  hex: string;
  image: string;
}

export const BABY_TODDLER_SWEATER_COLORS: readonly BabyToddlerSweaterColor[] = [
  { id: "oatmilk",         label: "Oatmilk",         hex: "#E8DFD0", image: "/images/products/sweaters/oatmilk.png" },
  { id: "soft-white",      label: "Soft White",      hex: "#F0EDE6", image: "/images/products/sweaters/soft-white.png" },
  { id: "peach-blossom",   label: "Peach Blossom",   hex: "#E8C4B8", image: "/images/products/sweaters/peach-blossom.png" },
  { id: "rosewood",        label: "Rosewood",        hex: "#C9A09A", image: "/images/products/sweaters/rosewood.png" },
  { id: "lavender",        label: "Lavender",        hex: "#B8A4C8", image: "/images/products/sweaters/lavender.png" },
  { id: "sky-blue",        label: "Sky Blue",        hex: "#A8C4DC", image: "/images/products/sweaters/sky-blue.png" },
  { id: "olive-green",     label: "Olive Green",     hex: "#7A8C6A", image: "/images/products/sweaters/olive-green.png" },
  { id: "chestnut-hearth", label: "Chestnut Hearth", hex: "#5C3425", image: "/images/products/sweaters/chestnut-hearth.png" },
  { id: "cranberry",       label: "Cranberry",       hex: "#7A1A2E", image: "/images/products/sweaters/cranberry.png" },
  { id: "dusty-violet",    label: "Dusty Violet",    hex: "#5E4E64", image: "/images/products/sweaters/dusty-violet.png" },
  { id: "lake-blue",       label: "Lake Blue",       hex: "#5A8A8C", image: "/images/products/sweaters/lake-blue.png" },
  { id: "vintage-denim",   label: "Vintage Denim",   hex: "#7A8BA0", image: "/images/products/sweaters/vintage-denim.png" },
];

export function findBabyToddlerSweaterColor(
  id: string
): BabyToddlerSweaterColor | undefined {
  return BABY_TODDLER_SWEATER_COLORS.find((c) => c.id === id);
}
