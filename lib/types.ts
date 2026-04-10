export type ItemType =
  | "baby-toddler-sweater"
  | "big-kid-sweater"
  | "adult-sweater"
  | "fine-gauge-romper"
  | "blanket-cotton"
  | "custom";

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

export type PreferredContact = "email" | "phone" | "instagram" | "";

export type RomperStyle = "ruffled" | "non-ruffled" | "";

export type SpecialtyDesign = "block-letter" | "floral-letter" | "";

// A single configured item in the cart
export interface CartItem {
  itemType: ItemType | "";
  specialtyDesign: SpecialtyDesign;
  wording: string;
  fontStyle: FontStyle | "";
  yarnColors: string[];
  inquiryDescription: string;
  size: string;
  itemColor: string;
  romperStyle: RomperStyle;
  daisies: boolean;
  referenceImageFile: File | null;
  referenceImageName: string;
  notes: string;
}

export const EMPTY_CART_ITEM: CartItem = {
  itemType: "",
  specialtyDesign: "",
  wording: "",
  fontStyle: "",
  yarnColors: [],
  inquiryDescription: "",
  size: "",
  itemColor: "",
  romperStyle: "",
  daisies: false,
  referenceImageFile: null,
  referenceImageName: "",
  notes: "",
};

// OrderFormData = current item being configured + completed cart + checkout fields
export interface OrderFormData extends CartItem {
  cart: CartItem[];
  // Delivery (step 6)
  delivery: DeliveryMethod | "";
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  // Contact (step 7)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
  instagramHandle: string;
}

export const INITIAL_FORM_DATA: OrderFormData = {
  ...EMPTY_CART_ITEM,
  cart: [],
  delivery: "",
  shippingAddress: "",
  shippingCity: "",
  shippingState: "",
  shippingZip: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "",
  instagramHandle: "",
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
