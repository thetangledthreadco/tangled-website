import { createClient } from "@supabase/supabase-js";
import type { Order, OrderStatus } from "./orderTypes";
export type { Order, OrderStatus } from "./orderTypes";
export { STATUS_LABELS, STATUS_FLOW } from "./orderTypes";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface InsertOrderPayload {
  id: string;
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
}

export async function insertOrder(payload: InsertOrderPayload): Promise<void> {
  const { error } = await supabase.from("orders").insert(payload);
  if (error) throw new Error(error.message);
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Order[];
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateOrderFlags(
  id: string,
  flags: Partial<Pick<Order, "deposit_paid" | "final_paid" | "photo_taken">>
): Promise<void> {
  const { error } = await supabase.from("orders").update(flags).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateInternalNotes(id: string, notes: string): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ internal_notes: notes })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
