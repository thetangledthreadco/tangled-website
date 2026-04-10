"use client";

import { useState } from "react";
import type { OrderFormData, PreferredContact } from "@/lib/types";

interface StepContactProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepContact({
  formData,
  onChange,
  onNext,
  onBack,
}: StepContactProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required.";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    }
    if (!formData.preferredContact) {
      errs.preferredContact = "Please choose how you'd like to be contacted.";
    }
    if (formData.preferredContact === "instagram" && !formData.instagramHandle.trim()) {
      errs.instagramHandle = "Instagram handle is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Almost there</h2>
      <p className="font-sans text-sm text-muted mb-8">
        I&apos;ll reach out to confirm your order details, quote pricing, and collect your
        50% deposit before getting started.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="firstName"
            className="block font-sans text-sm font-medium text-ink mb-2"
          >
            First name <span className="text-rose">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Jane"
            className={`
              w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
              placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
              ${errors.firstName ? "border-rose" : "border-border focus:border-rose/50"}
            `}
          />
          {errors.firstName && (
            <p className="font-sans text-xs text-rose mt-1.5">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block font-sans text-sm font-medium text-ink mb-2"
          >
            Last name <span className="text-rose">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Doe"
            className={`
              w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
              placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
              ${errors.lastName ? "border-rose" : "border-border focus:border-rose/50"}
            `}
          />
          {errors.lastName && (
            <p className="font-sans text-xs text-rose mt-1.5">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block font-sans text-sm font-medium text-ink mb-2"
        >
          Email address <span className="text-rose">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="jane@example.com"
          className={`
            w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
            ${errors.email ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {errors.email && (
          <p className="font-sans text-xs text-rose mt-1.5">{errors.email}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block font-sans text-sm font-medium text-ink mb-2"
        >
          Phone number <span className="text-rose">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="(509) 555-0123"
          className={`
            w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
            ${errors.phone ? "border-rose" : "border-border focus:border-rose/50"}
          `}
        />
        {errors.phone && (
          <p className="font-sans text-xs text-rose mt-1.5">{errors.phone}</p>
        )}
      </div>

      <div className="mb-10">
        <p className="block font-sans text-sm font-medium text-ink mb-3">
          Preferred contact method <span className="text-rose">*</span>
        </p>
        <div className="flex flex-wrap gap-3 mb-3">
          {(["email", "phone", "instagram"] as PreferredContact[]).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onChange({ preferredContact: method, instagramHandle: method !== "instagram" ? "" : formData.instagramHandle })}
              className={`px-5 py-2.5 rounded border font-sans text-sm font-medium transition-all cursor-pointer capitalize ${
                formData.preferredContact === method
                  ? "border-rose bg-rose/5 text-rose"
                  : "border-border bg-warm-white text-ink hover:border-rose/40 hover:bg-oat"
              }`}
            >
              {method === "instagram" ? "Instagram DM" : method === "phone" ? "Text" : "Email"}
            </button>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="font-sans text-xs text-rose mb-3">{errors.preferredContact}</p>
        )}

        {formData.preferredContact === "instagram" && (
          <div>
            <label htmlFor="instagramHandle" className="block font-sans text-sm font-medium text-ink mb-2">
              Instagram handle <span className="text-rose">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-3 py-3 border border-r-0 border-border rounded-l bg-oat font-sans text-sm text-muted">@</span>
              <input
                id="instagramHandle"
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => onChange({ instagramHandle: e.target.value.replace(/^@/, "") })}
                placeholder="yourhandle"
                className={`flex-1 px-4 py-3 rounded-r border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors ${errors.instagramHandle ? "border-rose" : "border-border focus:border-rose/50"}`}
              />
            </div>
            {errors.instagramHandle && (
              <p className="font-sans text-xs text-rose mt-1.5">{errors.instagramHandle}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (validate()) onNext();
          }}
          className="flex-1 px-6 py-3 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer"
        >
          Review Order
        </button>
      </div>
    </div>
  );
}
