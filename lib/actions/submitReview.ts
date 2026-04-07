"use server";

import { Resend } from "resend";
import { insertReview } from "@/lib/db/reviews";

const resend = new Resend(process.env.RESEND_API_KEY);
const HOLLY_EMAIL = "thetangledthreadco@gmail.com";
const FROM = "The Tangled Thread Co. <noreply@thetangledthreadco.com>";

export async function validateReviewCode(code: string): Promise<boolean> {
  return code.trim().toLowerCase() === (process.env.REVIEW_CODE ?? "").toLowerCase();
}

export async function submitReview(data: {
  name: string;
  item: string;
  rating: number;
  body: string;
  code: string;
}) {
  if (!await validateReviewCode(data.code)) {
    throw new Error("Invalid review code.");
  }
  const review = await insertReview({ name: data.name, item: data.item, rating: data.rating, body: data.body });

  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  await resend.emails.send({
    from: FROM,
    to: HOLLY_EMAIL,
    subject: `New review from ${data.name} ${stars}`,
    text: `New review:\n\nName: ${data.name}\nItem: ${data.item || "Not specified"}\nRating: ${stars} (${data.rating}/5)\n\n"${data.body}"\n\nReview ID: ${review.id}\nSubmitted: ${new Date().toLocaleString()}`,
  });
}
