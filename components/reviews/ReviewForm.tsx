"use client";

import { useState } from "react";
import { submitReview, validateReviewCode } from "@/lib/actions/submitReview";

const itemOptions = [
  "Baby & Toddler Sweater",
  "Big Kid Sweater",
  "Adult Sweater",
  "Fine-Gauge Knit Romper",
  "Baby Blanket - 100% Cotton",
  "Something else",
];

export default function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [form, setForm] = useState({ name: "", item: "", rating: 0, body: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) { setCodeError("Please enter your review code."); return; }
    setVerifying(true);
    const valid = await validateReviewCode(code.trim());
    setVerifying(false);
    if (valid) {
      setCodeVerified(true);
      setCodeError("");
    } else {
      setCodeError("That code doesn't look right. Check your order confirmation or DM me on Instagram.");
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.rating) errs.rating = "Please select a rating.";
    if (!form.body.trim()) errs.body = "Please write a review.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitReview({ ...form, code });
      onSubmitted();
    } catch {
      setErrors({ body: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!codeVerified) {
    return (
      <form onSubmit={handleVerifyCode} noValidate className="space-y-4">
        <div>
          <label htmlFor="review-code" className="block font-sans text-sm font-medium text-ink mb-2">
            Review code <span className="text-rose">*</span>
          </label>
          <p className="font-sans text-xs text-muted mb-3">
            You&apos;ll receive this when your order is complete.
          </p>
          <input
            id="review-code"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setCodeError(""); }}
            placeholder="Enter your code"
            className={`w-full max-w-xs px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors ${codeError ? "border-rose" : "border-border focus:border-rose/50"}`}
          />
          {codeError && <p className="font-sans text-xs text-rose mt-1.5">{codeError}</p>}
        </div>
        <button
          type="submit"
          disabled={verifying}
          className="px-6 py-3 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {verifying ? "Checking…" : "Continue"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="review-name" className="block font-sans text-sm font-medium text-ink mb-2">
            Name <span className="text-rose">*</span>
          </label>
          <input
            id="review-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Jane"
            className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors ${errors.name ? "border-rose" : "border-border focus:border-rose/50"}`}
          />
          {errors.name && <p className="font-sans text-xs text-rose mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="review-item" className="block font-sans text-sm font-medium text-ink mb-2">
            What did you order? <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="review-item"
            value={form.item}
            onChange={(e) => setForm((f) => ({ ...f, item: e.target.value }))}
            className="w-full px-4 py-3 rounded border border-border bg-warm-white font-sans text-base text-ink focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose/50 transition-colors"
          >
            <option value="">Select an item…</option>
            {itemOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="font-sans text-sm font-medium text-ink mb-2">
          Rating <span className="text-rose">*</span>
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setForm((f) => ({ ...f, rating: star }))}
              className="text-3xl leading-none transition-transform hover:scale-110 cursor-pointer"
            >
              <span className={star <= form.rating ? "text-rose" : "text-border"}>★</span>
            </button>
          ))}
        </div>
        {errors.rating && <p className="font-sans text-xs text-rose mt-1.5">{errors.rating}</p>}
      </div>

      <div>
        <label htmlFor="review-body" className="block font-sans text-sm font-medium text-ink mb-2">
          Your review <span className="text-rose">*</span>
        </label>
        <textarea
          id="review-body"
          rows={4}
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          placeholder="Share your experience…"
          className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none transition-colors ${errors.body ? "border-rose" : "border-border focus:border-rose/50"}`}
        />
        {errors.body && <p className="font-sans text-xs text-rose mt-1.5">{errors.body}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors cursor-pointer tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
