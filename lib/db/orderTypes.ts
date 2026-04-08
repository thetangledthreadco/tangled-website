export type OrderStatus =
  | "new"
  | "waiting_deposit"
  | "waiting_shipment"
  | "ready_to_stitch"
  | "in_progress"
  | "awaiting_pickup_ship"
  | "ready_to_ship"
  | "complete";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new:                  "New",
  waiting_deposit:      "Waiting — Deposit",
  waiting_shipment:     "Waiting — Shipment",
  ready_to_stitch:      "Ready to Stitch",
  in_progress:          "In Progress",
  awaiting_pickup_ship: "Awaiting Pickup / Ship",
  ready_to_ship:        "Ready to Ship",
  complete:             "Complete",
};

export const STATUS_FLOW: OrderStatus[] = [
  "new",
  "waiting_deposit",
  "waiting_shipment",
  "ready_to_stitch",
  "in_progress",
  "awaiting_pickup_ship",
  "ready_to_ship",
  "complete",
];

export interface Order {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_contact: string;
  instagram_handle: string;
  item_type: string;
  specialty_design: string;
  wording: string;
  font_style: string;
  yarn_colors: string[];
  inquiry_description: string;
  size: string;
  item_color: string;
  romper_style: string;
  notes: string;
  delivery: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  status: OrderStatus;
  deposit_paid: boolean;
  final_paid: boolean;
  photo_taken: boolean;
  internal_notes: string;
}
