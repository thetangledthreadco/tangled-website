// Adult & Big-Kid sweater colors, sourced from the AliExpress listing Holly
// selected. Images live under public/images/products/sweaters/adult-kid/.
//
// These are shared between the order-form color picker and (eventually) the
// adult/big-kid visual configurator preview.

export interface AdultKidSweaterColor {
  id: string;
  label: string;
  hex: string;
  image: string;
}

export const ADULT_KID_SWEATER_COLORS: AdultKidSweaterColor[] = [
  { id: "soft-white", label: "Soft White", hex: "#F4F1EA", image: "/images/products/sweaters/adult-kid/soft-white.avif" },
  { id: "oatmilk", label: "Oatmilk", hex: "#EBE2D2", image: "/images/products/sweaters/adult-kid/oatmilk.jpg" },
  { id: "dark-khaki", label: "Dark Khaki", hex: "#9B8C6E", image: "/images/products/sweaters/adult-kid/dark-khaki.avif" },
  { id: "walnut", label: "Walnut", hex: "#7A4A2E", image: "/images/products/sweaters/adult-kid/walnut.avif" },
  { id: "gray", label: "Gray", hex: "#8B8F92", image: "/images/products/sweaters/adult-kid/gray.avif" },
  { id: "black", label: "Black", hex: "#1C1917", image: "/images/products/sweaters/adult-kid/black.avif" },
  { id: "emerald-green", label: "Emerald Green", hex: "#254E3B", image: "/images/products/sweaters/adult-kid/emerald-green.avif" },
  { id: "rosewood", label: "Rosewood", hex: "#AE7683", image: "/images/products/sweaters/adult-kid/rosewood.avif" },
  { id: "cranberry", label: "Cranberry", hex: "#7A1F2A", image: "/images/products/sweaters/adult-kid/cranberry.avif" },
  { id: "firetruck-red", label: "Firetruck Red", hex: "#C8282E", image: "/images/products/sweaters/adult-kid/firetruck-red.avif" },
  { id: "orange", label: "Orange", hex: "#C86F3D", image: "/images/products/sweaters/adult-kid/orange.avif" },
];

export const findAdultKidSweaterColor = (id: string) =>
  ADULT_KID_SWEATER_COLORS.find((c) => c.id === id);
