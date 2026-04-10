"use server";

import { Resend } from "resend";
import type { OrderFormData, CartItem } from "@/lib/types";
import type { CartItemRecord } from "@/lib/db/orders";
import { insertOrder } from "@/lib/db/orders";

const resend = new Resend(process.env.RESEND_API_KEY);

const HOLLY_EMAIL = "thetangledthreadco@gmail.com";
const FROM = "The Tangled Thread Co. <noreply@thetangledthreadco.com>";

const itemLabels: Record<string, string> = {
  "baby-toddler-sweater": "Baby & Toddler Sweater",
  "big-kid-sweater": "Big Kid Sweater",
  "adult-sweater": "Adult Sweater",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "blanket-cotton": "Baby Blanket, 100% Cotton",
  "custom": "Custom Inquiry",
};

const specialtyLabels: Record<string, string> = {
  "block-letter": "Block Letter",
  "floral-letter": "Floral Letter",
};

function formatItem(item: CartItem | CartItemRecord, index: number, total: number): string {
  const prefix = total > 1 ? `Item ${index + 1}: ` : "";
  const lines = [
    `${prefix}${itemLabels[item.itemType] ?? item.itemType}`,
    item.itemType === "custom"
      ? `  Description: ${item.inquiryDescription}`
      : null,
    item.itemType !== "custom" && item.specialtyDesign
      ? `  Specialty design: ${specialtyLabels[item.specialtyDesign] ?? item.specialtyDesign}`
      : null,
    item.itemType !== "custom"
      ? `  ${item.specialtyDesign ? "Letter" : "Wording"}: ${item.wording}`
      : null,
    item.itemType !== "custom" && item.fontStyle
      ? `  Font: ${item.fontStyle}`
      : null,
    item.itemType !== "custom" && item.yarnColors.length
      ? `  Yarn colors: ${item.yarnColors.join(", ")}`
      : null,
    item.itemType !== "custom" && item.daisies ? `  Daisies: Yes` : null,
    item.size ? `  Size: ${item.size}` : null,
    item.romperStyle
      ? `  Romper style: ${item.romperStyle === "ruffled" ? "Ruffled" : "Non-Ruffled"}`
      : null,
    item.itemColor ? `  Color: ${item.itemColor}` : null,
    item.referenceImageName ? `  Reference image: ${item.referenceImageName}` : null,
    item.notes ? `  Notes: ${item.notes}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

export async function sendOrderEmail(
  formData: OrderFormData,
  itemImages: Array<{ filename: string; base64: string } | null> = [],
  imagesFailed = false
) {
  const orderId = crypto.randomUUID();
  const items = formData.cart;
  const first = items[0];

  // Serialize cart items for DB (no File objects)
  const itemRecords: CartItemRecord[] = items.map((item) => ({
    itemType: item.itemType,
    specialtyDesign: item.specialtyDesign,
    wording: item.wording,
    fontStyle: item.fontStyle,
    yarnColors: item.yarnColors,
    inquiryDescription: item.inquiryDescription,
    size: item.size,
    itemColor: item.itemColor,
    romperStyle: item.romperStyle,
    daisies: item.daisies,
    referenceImageName: item.referenceImageName,
    notes: item.notes,
  }));

  // Save to DB: flat columns use first item for backward compat
  await insertOrder({
    id: orderId,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    preferred_contact: formData.preferredContact,
    instagram_handle: formData.instagramHandle,
    item_type: first?.itemType ?? "",
    specialty_design: first?.specialtyDesign ?? "",
    wording: first?.wording ?? "",
    font_style: first?.fontStyle ?? "",
    yarn_colors: first?.yarnColors ?? [],
    inquiry_description: first?.inquiryDescription ?? "",
    size: first?.size ?? "",
    item_color: first?.itemColor ?? "",
    romper_style: first?.romperStyle ?? "",
    notes: first?.notes ?? "",
    items: itemRecords,
    delivery: formData.delivery,
    shipping_address: formData.shippingAddress,
    shipping_city: formData.shippingCity,
    shipping_state: formData.shippingState,
    shipping_zip: formData.shippingZip,
  });

  // Format order summary for email
  const itemSummaries = items.map((item, i) => formatItem(item, i, items.length)).join("\n\n");
  const deliveryLine =
    formData.delivery === "shipping"
      ? `Ship to ${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState} ${formData.shippingZip}`
      : "Local pickup, Spokane, WA";

  const preferredContactLine =
    formData.preferredContact === "instagram"
      ? `Preferred contact: Instagram DM (@${formData.instagramHandle})`
      : `Preferred contact: ${formData.preferredContact === "email" ? "Email" : "Text"}`;

  const attachments = itemImages
    .filter((img): img is { filename: string; base64: string } => img !== null)
    .map((img) => ({ filename: img.filename, content: img.base64 }));

  const imageSizeNote = imagesFailed
    ? "\n\n⚠️ Reference images were too large to attach. Ask the customer to send them via Instagram DM or email reply."
    : "";

  await Promise.all([
    // Notification to Holly
    resend.emails.send({
      from: FROM,
      to: HOLLY_EMAIL,
      replyTo: formData.email,
      subject: `New custom order from ${formData.firstName} ${formData.lastName}`,
      text: `New order from ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n${preferredContactLine}\n\n---\n\n${itemSummaries}\n\nDelivery: ${deliveryLine}${imageSizeNote}`,
      ...(attachments.length > 0 ? { attachments } : {}),
    }),

    // Confirmation to customer
    resend.emails.send({
      from: FROM,
      to: formData.email,
      replyTo: HOLLY_EMAIL,
      subject: "Your custom order request is in!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1C1917;">
          <img src="https://thetangledthreadco.com/logo.png" alt="The Tangled Thread Co." style="height: 80px; width: auto; margin-bottom: 32px; display: block;" />
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${formData.firstName},</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Your custom order request came through! I'll review the details and reach out within 1–2 business days to confirm everything and send over your 50% deposit invoice.</p>
          ${imagesFailed ? `<p style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6; background: #FEF3C7; padding: 12px 16px; margin: 0 0 16px;">Your reference images were too large to attach to this email. Holly will follow up to collect them, or feel free to send them via Instagram DM.</p>` : ""}
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px;">If you'd like a quicker reply, feel free to DM me on Instagram and I can confirm sooner!</p>
          <div style="background: #F0EBE3; padding: 20px 24px; margin-bottom: 32px;">
            <p style="font-size: 12px; font-family: Arial, sans-serif; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #6B6560; margin: 0 0 12px;">Your Order</p>
            ${itemSummaries.split("\n").map((line) => `<p style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6; margin: 0 0 4px; color: #1C1917;">${line}</p>`).join("")}
            <p style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6; margin: 8px 0 0; color: #1C1917;">Delivery: ${deliveryLine}</p>
          </div>
          <p style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6; color: #6B6560; margin: 0 0 32px;">If anything looks off, just reply to this email or DM me on Instagram.</p>
          <a href="https://instagram.com/the.tangled.thread.co" style="color: #C4877A; font-size: 14px; font-family: Arial, sans-serif;">@the.tangled.thread.co</a>
          <hr style="border: none; border-top: 1px solid #E8E0D8; margin: 32px 0;" />
          <p style="font-size: 13px; font-family: Arial, sans-serif; color: #6B6560; margin: 0;">Holly &middot; The Tangled Thread Co. &middot; Spokane, WA</p>
        </div>
      `,
    }),
  ]);
}
