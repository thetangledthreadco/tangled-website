"use server";

import { cookies } from "next/headers";
import { updateOrderStatus, updateOrderFlags, updateInternalNotes, insertOrder } from "@/lib/db/orders";
import type { OrderStatus, Order } from "@/lib/db/orderTypes";

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

async function assertAuth() {
  if (!(await isAuthed())) throw new Error("Unauthorized");
}

export async function adminLogin(password: string): Promise<{ ok: boolean }> {
  if (password !== process.env.ADMIN_PASSWORD) return { ok: false };
  const store = await cookies();
  store.set("admin_session", password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { ok: true };
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete("admin_session");
}

export async function setOrderStatus(id: string, status: OrderStatus): Promise<void> {
  await assertAuth();
  await updateOrderStatus(id, status);
}

export async function setOrderFlags(
  id: string,
  flags: Partial<Pick<Order, "deposit_paid" | "final_paid" | "photo_taken">>
): Promise<void> {
  await assertAuth();
  await updateOrderFlags(id, flags);
}

export async function saveInternalNotes(id: string, notes: string): Promise<void> {
  await assertAuth();
  await updateInternalNotes(id, notes);
}

export async function createManualOrder(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_contact: string;
  instagram_handle: string;
  item_type: string;
  wording: string;
  inquiry_description: string;
  yarn_colors: string;
  size: string;
  item_color: string;
  notes: string;
  delivery: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
}): Promise<{ id: string }> {
  await assertAuth();
  const id = crypto.randomUUID();
  await insertOrder({
    id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    preferred_contact: data.preferred_contact,
    instagram_handle: data.instagram_handle,
    item_type: data.item_type,
    specialty_design: "",
    wording: data.wording,
    font_style: "",
    yarn_colors: data.yarn_colors ? data.yarn_colors.split(",").map((s) => s.trim()).filter(Boolean) : [],
    inquiry_description: data.inquiry_description,
    size: data.size,
    item_color: data.item_color,
    romper_style: "",
    notes: data.notes,
    delivery: data.delivery,
    shipping_address: data.shipping_address,
    shipping_city: data.shipping_city,
    shipping_state: data.shipping_state,
    shipping_zip: data.shipping_zip,
  });
  return { id };
}
