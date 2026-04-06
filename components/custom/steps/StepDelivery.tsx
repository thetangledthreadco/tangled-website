"use client";

import { useState } from "react";
import type { OrderFormData, DeliveryMethod } from "@/lib/types";

interface StepDeliveryProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepDelivery({
  formData,
  onChange,
  onNext,
  onBack,
}: StepDeliveryProps) {
  const [error, setError] = useState("");
  const [zipError, setZipError] = useState("");

  const handleSelect = (method: DeliveryMethod) => {
    onChange({ delivery: method, zipCode: "" });
    setError("");
    setZipError("");
  };

  const handleNext = () => {
    if (!formData.delivery) {
      setError("Please choose a delivery method.");
      return;
    }
    if (formData.delivery === "shipping" && !formData.zipCode.trim()) {
      setZipError("Please enter your zip code so I can confirm shipping cost.");
      return;
    }
    setError("");
    setZipError("");
    onNext();
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">
        How should we get it to you?
      </h2>
      <p className="font-sans text-sm text-muted mb-8">
        Choose shipping or local pickup. A photo of the finished piece is sent before
        anything ships or is released.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        {/* Shipping */}
        <button
          onClick={() => handleSelect("shipping")}
          className={`
            text-left p-6 rounded border-2 transition-all duration-200 cursor-pointer
            ${
              formData.delivery === "shipping"
                ? "border-rose bg-rose/5"
                : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
            }
          `}
        >
          <p className="font-serif text-xl text-brown mb-2">Ship to me</p>
          <p className="font-sans text-sm text-muted leading-relaxed">
            Shipping within the US is $8–$10 depending on location. The exact cost is
            confirmed when I follow up.
          </p>
        </button>

        {/* Pickup */}
        <button
          onClick={() => handleSelect("pickup")}
          className={`
            text-left p-6 rounded border-2 transition-all duration-200 cursor-pointer
            ${
              formData.delivery === "pickup"
                ? "border-rose bg-rose/5"
                : "border-border bg-warm-white hover:border-rose/40 hover:bg-oat"
            }
          `}
        >
          <p className="font-serif text-xl text-brown mb-2">Local pickup</p>
          <p className="font-sans text-sm text-muted leading-relaxed">
            Pick up in Spokane, WA. Pickup details and timing confirmed when I reach out.
          </p>
        </button>
      </div>

      {error && <p className="font-sans text-xs text-rose mb-4">{error}</p>}

      {/* Zip code - only shown when shipping selected */}
      {formData.delivery === "shipping" && (
        <div className="mt-4 mb-2">
          <label
            htmlFor="zipCode"
            className="block font-sans text-sm font-medium text-ink mb-2"
          >
            Your zip code <span className="text-rose">*</span>
          </label>
          <input
            id="zipCode"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={formData.zipCode}
            onChange={(e) => {
              onChange({ zipCode: e.target.value });
              setZipError("");
            }}
            placeholder="e.g. 99201"
            className={`
              w-full max-w-xs px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink
              placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors
              ${zipError ? "border-rose" : "border-border focus:border-rose/50"}
            `}
          />
          {zipError && <p className="font-sans text-xs text-rose mt-1.5">{zipError}</p>}
          <p className="font-sans text-xs text-muted mt-1.5">
            Used to confirm your shipping rate. No full address needed yet.
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-6 py-3 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
