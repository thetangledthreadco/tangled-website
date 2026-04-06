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
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  const handleSelect = (method: DeliveryMethod) => {
    onChange({ delivery: method, shippingAddress: "", shippingCity: "", shippingState: "", shippingZip: "" });
    setError("");
    setAddressErrors({});
  };

  const handleNext = () => {
    if (!formData.delivery) {
      setError("Please choose a delivery method.");
      return;
    }
    if (formData.delivery === "shipping") {
      const errs: Record<string, string> = {};
      if (!formData.shippingAddress.trim()) errs.shippingAddress = "Street address is required.";
      if (!formData.shippingCity.trim()) errs.shippingCity = "City is required.";
      if (!formData.shippingState.trim()) errs.shippingState = "State is required.";
      if (!formData.shippingZip.trim()) errs.shippingZip = "Zip code is required.";
      if (Object.keys(errs).length > 0) {
        setAddressErrors(errs);
        return;
      }
    }
    setError("");
    setAddressErrors({});
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

      {/* Shipping address - only shown when shipping selected */}
      {formData.delivery === "shipping" && (
        <div className="mt-4 mb-2 space-y-4">
          <div>
            <label htmlFor="shippingAddress" className="block font-sans text-sm font-medium text-ink mb-2">
              Street address <span className="text-rose">*</span>
            </label>
            <input
              id="shippingAddress"
              type="text"
              value={formData.shippingAddress}
              onChange={(e) => { onChange({ shippingAddress: e.target.value }); setAddressErrors((p) => ({ ...p, shippingAddress: "" })); }}
              placeholder="123 Main St"
              className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors ${addressErrors.shippingAddress ? "border-rose" : "border-border focus:border-rose/50"}`}
            />
            {addressErrors.shippingAddress && <p className="font-sans text-xs text-rose mt-1.5">{addressErrors.shippingAddress}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="shippingCity" className="block font-sans text-sm font-medium text-ink mb-2">
                City <span className="text-rose">*</span>
              </label>
              <input
                id="shippingCity"
                type="text"
                value={formData.shippingCity}
                onChange={(e) => { onChange({ shippingCity: e.target.value }); setAddressErrors((p) => ({ ...p, shippingCity: "" })); }}
                placeholder="Spokane"
                className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors ${addressErrors.shippingCity ? "border-rose" : "border-border focus:border-rose/50"}`}
              />
              {addressErrors.shippingCity && <p className="font-sans text-xs text-rose mt-1.5">{addressErrors.shippingCity}</p>}
            </div>
            <div>
              <label htmlFor="shippingState" className="block font-sans text-sm font-medium text-ink mb-2">
                State <span className="text-rose">*</span>
              </label>
              <input
                id="shippingState"
                type="text"
                maxLength={2}
                value={formData.shippingState}
                onChange={(e) => { onChange({ shippingState: e.target.value.toUpperCase() }); setAddressErrors((p) => ({ ...p, shippingState: "" })); }}
                placeholder="WA"
                className={`w-full px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors ${addressErrors.shippingState ? "border-rose" : "border-border focus:border-rose/50"}`}
              />
              {addressErrors.shippingState && <p className="font-sans text-xs text-rose mt-1.5">{addressErrors.shippingState}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="shippingZip" className="block font-sans text-sm font-medium text-ink mb-2">
              Zip code <span className="text-rose">*</span>
            </label>
            <input
              id="shippingZip"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={formData.shippingZip}
              onChange={(e) => { onChange({ shippingZip: e.target.value }); setAddressErrors((p) => ({ ...p, shippingZip: "" })); }}
              placeholder="99201"
              className={`w-full max-w-xs px-4 py-3 rounded border bg-warm-white font-sans text-base text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-colors ${addressErrors.shippingZip ? "border-rose" : "border-border focus:border-rose/50"}`}
            />
            {addressErrors.shippingZip && <p className="font-sans text-xs text-rose mt-1.5">{addressErrors.shippingZip}</p>}
          </div>
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
