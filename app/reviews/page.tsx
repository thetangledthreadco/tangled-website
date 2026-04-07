import type { Metadata } from "next";
import { getReviews } from "@/lib/db/reviews";
import ReviewsClient from "@/components/reviews/ReviewsClient";

export const metadata: Metadata = {
  title: "Reviews",
  description: "See what customers are saying about The Tangled Thread Co. custom embroidery.",
};

export const revalidate = 0;

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            Reviews
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight">
            What people are saying.
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 md:px-12 py-20 bg-oat">
        <div className="max-w-4xl mx-auto">
          <ReviewsClient initialReviews={reviews} />
        </div>
      </section>
    </>
  );
}
