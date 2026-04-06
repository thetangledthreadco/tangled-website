"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const HOLLY_EMAIL = "thetangledthreadco@gmail.com";
const FROM = "The Tangled Thread Co. <noreply@thetangledthreadco.com>";

export async function sendContactEmail(form: {
  name: string;
  email: string;
  message: string;
}) {
  await Promise.all([
    // Notification to Holly
    resend.emails.send({
      from: FROM,
      to: HOLLY_EMAIL,
      replyTo: form.email,
      subject: `New message from ${form.name}`,
      text: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    }),

    // Confirmation to customer
    resend.emails.send({
      from: FROM,
      to: form.email,
      subject: "Got your message!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1C1917;">
          <img src="https://thetangledthreadco.com/logo.png" alt="The Tangled Thread Co." style="height: 80px; width: auto; margin-bottom: 32px; display: block;" />
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${form.name},</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Thanks for reaching out! I got your inquiry and will be reaching out by email within 1–2 business days.</p>
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px;">If you'd like a quicker reply, feel free to DM me directly on Instagram for a faster confirmation!</p>
          <a href="https://instagram.com/the.tangled.thread.co" style="color: #C4877A; font-size: 14px;">@the.tangled.thread.co</a>
          <hr style="border: none; border-top: 1px solid #E8E0D8; margin: 32px 0;" />
          <p style="font-size: 13px; color: #6B6560; margin: 0;">Holly &middot; The Tangled Thread Co. &middot; Spokane, WA</p>
        </div>
      `,
    }),
  ]);
}
