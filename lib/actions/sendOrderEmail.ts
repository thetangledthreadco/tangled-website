"use server";

import { Resend } from "resend";
import type { OrderFormData } from "@/lib/types";

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

function formatOrder(formData: OrderFormData): string {
  const lines = [
    `Item: ${itemLabels[formData.itemType] ?? formData.itemType}`,
    formData.itemType === "custom"
      ? `Description: ${formData.inquiryDescription}`
      : null,
    formData.itemType !== "custom" && formData.specialtyDesign ? `Specialty design: ${specialtyLabels[formData.specialtyDesign] ?? formData.specialtyDesign}` : null,
    formData.itemType !== "custom" ? `${formData.specialtyDesign ? "Letter" : "Wording"}: ${formData.wording}` : null,
    formData.itemType !== "custom" && formData.fontStyle ? `Font: ${formData.fontStyle}` : null,
    formData.itemType !== "custom" ? `Yarn colors: ${formData.yarnColors.join(", ")}` : null,
    `Size: ${formData.size}`,
    formData.romperStyle ? `Romper style: ${formData.romperStyle === "ruffled" ? "Ruffled" : "Non-Ruffled"}` : null,
    formData.itemColor ? `${formData.romperStyle || formData.itemType === "blanket-cotton" ? "Color" : "Sweater color"}: ${formData.itemColor}` : null,
    formData.referenceImageName ? `Reference image: ${formData.referenceImageName}` : null,
    formData.notes ? `Notes: ${formData.notes}` : null,
    `Delivery: ${formData.delivery === "shipping" ? `Ship to ${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState} ${formData.shippingZip}` : "Local pickup - Spokane, WA"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function sendOrderEmail(formData: OrderFormData, imageBase64: string | null = null) {
  const orderSummary = formatOrder(formData);
  const customerName = formData.firstName;

  const preferredContactLine =
    formData.preferredContact === "instagram"
      ? `Preferred contact: Instagram DM (@${formData.instagramHandle})`
      : `Preferred contact: ${formData.preferredContact === "email" ? "Email" : "Phone"}`;

  await Promise.all([
    // Notification to Holly
    resend.emails.send({
      from: FROM,
      to: HOLLY_EMAIL,
      replyTo: formData.email,
      subject: `New custom order from ${formData.firstName} ${formData.lastName}`,
      text: `New order from ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n${preferredContactLine}\n\n---\n\n${orderSummary}`,
      ...(imageBase64 && formData.referenceImageName
        ? { attachments: [{ filename: formData.referenceImageName, content: imageBase64 }] }
        : {}),
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
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${customerName},</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Your custom order request came through! I'll review the details and reach out within 1–2 business days to confirm everything and send over your 50% deposit invoice.</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px;">If you'd like a quicker reply, feel free to DM me on Instagram and I can confirm sooner!</p>
          <div style="background: #F0EBE3; padding: 20px 24px; margin-bottom: 32px;">
            <p style="font-size: 12px; font-family: Arial, sans-serif; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #6B6560; margin: 0 0 12px;">Your Order</p>
            ${orderSummary.split("\n").map(line => `<p style="font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6; margin: 0 0 6px; color: #1C1917;">${line}</p>`).join("")}
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
