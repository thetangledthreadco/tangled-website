export type ItemType =
  | "baby-toddler-sweater"
  | "big-kid-sweater"
  | "adult-sweater"
  | "chunky-romper"
  | "fine-gauge-romper"
  | "ftcwhp-romper"
  | "brave-little-one-romper"
  | "blanket-cotton"
  | "blanket-acrylic"
  | "denim-jacket"
  | "pillow-case"
  | "beanie";

export type FontStyle =
  | "font-1"
  | "font-2"
  | "font-3"
  | "font-4"
  | "font-5"
  | "font-6"
  | "font-7"
  | "font-8";

export type DeliveryMethod = "shipping" | "pickup";

export type SpecialtyDesign = "block-letter" | "floral-letter" | "";

export interface OrderFormData {
  // Step 1
  itemType: ItemType | "";
  // Step 2
  specialtyDesign: SpecialtyDesign;
  wording: string;
  fontStyle: FontStyle | "";
  yarnColors: string[];
  // Step 3
  size: string;
  itemColor: string;
  // Step 4
  referenceImageFile: File | null;
  referenceImageName: string;
  notes: string;
  // Step 5
  delivery: DeliveryMethod | "";
  zipCode: string;
  // Step 6
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const INITIAL_FORM_DATA: OrderFormData = {
  itemType: "",
  specialtyDesign: "",
  wording: "",
  fontStyle: "",
  yarnColors: [],
  size: "",
  itemColor: "",
  referenceImageFile: null,
  referenceImageName: "",
  notes: "",
  delivery: "",
  zipCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export interface DropItem {
  id: string;
  name: string;
  price: number;
  image: string;
  handle: string;
  soldOut: boolean;
  description: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: "custom" | "drop";
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "orders" | "custom" | "drops" | "shipping";
}
