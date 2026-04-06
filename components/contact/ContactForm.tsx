"use client";

import { useState } from "react";
import Link from "next/link";
import { sendContactEmail } from "@/lib/actions/sendContactEmail";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) errs.message = "Message is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await sendContactEmail(form);
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong. Please try again or DM me on Instagram." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-10">
        <div className="w-px h-8 bg-rose mb-8" />
        <h2 className="font-serif text-2xl text-brown mb-3">Message sent.</h2>
        <p className="font-sans text-sm text-muted mb-8 leading-relaxed">
          I&apos;ll reply to{" "}
          <strong className="text-ink font-medium">{form.email}</strong> within 1–2 business days.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-border text-brown font-sans font-medium text-sm rounded hover:bg-oat transition-colors tracking-wide"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-sans text-sm font-medium text-ink mb-2">
          Name <span className="text-rose">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Jane Doe"
          className={`
            w-full px-4 py-3 rounded border bg-cream font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors
            ${errors.name ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {errors.name && <p className="font-sans text-xs text-rose mt-1.5">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-ink mb-2">
          Email <span className="text-rose">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="jane@example.com"
          className={`
            w-full px-4 py-3 rounded border bg-cream font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 transition-colors
            ${errors.email ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {errors.email && <p className="font-sans text-xs text-rose mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block font-sans text-sm font-medium text-ink mb-2">
          Message <span className="text-rose">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="What's on your mind?"
          className={`
            w-full px-4 py-3 rounded border bg-cream font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none transition-colors
            ${errors.message ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {errors.message && <p className="font-sans text-xs text-rose mt-1.5">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors cursor-pointer tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
