"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Review } from "@/lib/db/reviews";
import ReviewForm from "./ReviewForm";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-sm ${star <= rating ? "text-rose" : "text-border"}`}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-warm-white border border-border p-6 rounded">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-sans text-sm font-medium text-ink">{review.name}</p>
          {review.item && (
            <p className="font-sans text-xs text-muted mt-0.5">{review.item}</p>
          )}
        </div>
        <span className="font-sans text-xs text-muted shrink-0">{date}</span>
      </div>
      <StarRating rating={review.rating} />
      <p className="font-sans text-sm text-ink leading-relaxed mt-3">&ldquo;{review.body}&rdquo;</p>
    </div>
  );
}

export default function ReviewsClient({ initialReviews }: { initialReviews: Review[] }) {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const avgRating = initialReviews.length
    ? (initialReviews.reduce((sum, r) => sum + r.rating, 0) / initialReviews.length).toFixed(1)
    : null;

  return (
    <>
      {/* Stats */}
      {avgRating && (
        <div className="flex items-center gap-3 mb-10">
          <span className="font-serif text-4xl text-brown">{avgRating}</span>
          <div>
            <div className="flex gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-base ${star <= Math.round(Number(avgRating)) ? "text-rose" : "text-border"}`}>★</span>
              ))}
            </div>
            <p className="font-sans text-xs text-muted">{initialReviews.length} {initialReviews.length === 1 ? "review" : "reviews"}</p>
          </div>
        </div>
      )}

      {/* Reviews grid */}
      {initialReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {initialReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="font-sans text-sm text-muted mb-20">No reviews yet. Be the first!</p>
      )}

      {/* Leave a review */}
      <div className="border-t border-border pt-16">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl text-brown font-light mb-2">Leave a review</h2>
          <p className="font-sans text-sm text-muted mb-8">Had something made? I&apos;d love to hear about it.</p>

          {submitted ? (
            <div className="py-6 bg-warm-white border border-border rounded p-6">
              <p className="font-serif text-2xl text-brown mb-2">Thank you for leaving a review!</p>
              <p className="font-sans text-sm text-muted mb-4">Enjoy $5 off your next order, just mention this code to me before placing your order:</p>
              <span className="inline-block font-sans font-medium text-sm tracking-widest text-rose border border-rose/30 bg-rose/5 px-4 py-2 rounded">REVIEW5</span>
            </div>
          ) : (
            <ReviewForm
              onSubmitted={() => { setSubmitted(true); router.refresh(); }}
            />
          )}
        </div>
      </div>
    </>
  );
}
