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
  "chunky-romper": "Chunky Knit Romper",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "ftcwhp-romper": '"For This Child We Have Prayed" Romper',
  "brave-little-one-romper": '"Brave Little One" Romper',
  "blanket-cotton": "Baby Blanket, 100% Cotton",
  "blanket-acrylic": "Baby Blanket, Acrylic",
  "denim-jacket": "Denim Jacket",
  "pillow-case": "Pillow Case",
  "beanie": "Infant/Kids Beanie",
};

const specialtyLabels: Record<string, string> = {
  "block-letter": "Block Letter",
  "floral-letter": "Floral Letter",
};

function formatOrder(formData: OrderFormData): string {
  const lines = [
    `Item: ${itemLabels[formData.itemType] ?? formData.itemType}`,
    formData.specialtyDesign ? `Specialty design: ${specialtyLabels[formData.specialtyDesign] ?? formData.specialtyDesign}` : null,
    `${formData.specialtyDesign ? "Letter" : "Wording"}: ${formData.wording}`,
    formData.fontStyle ? `Font: ${formData.fontStyle}` : null,
    `Yarn colors: ${formData.yarnColors.join(", ")}`,
    `Size: ${formData.size}`,
    formData.itemColor ? `Sweater color: ${formData.itemColor}` : null,
    formData.referenceImageName ? `Reference image: ${formData.referenceImageName}` : null,
    formData.notes ? `Notes: ${formData.notes}` : null,
    `Delivery: ${formData.delivery === "shipping" ? `Ship to zip ${formData.zipCode}` : "Local pickup - Spokane, WA"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function sendOrderEmail(formData: OrderFormData) {
  const orderSummary = formatOrder(formData);
  const customerName = formData.firstName;

  await Promise.all([
    // Notification to Holly
    resend.emails.send({
      from: FROM,
      to: HOLLY_EMAIL,
      replyTo: formData.email,
      subject: `New custom order from ${formData.firstName} ${formData.lastName}`,
      text: `New order from ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n---\n\n${orderSummary}`,
    }),

    // Confirmation to customer
    resend.emails.send({
      from: FROM,
      to: formData.email,
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
