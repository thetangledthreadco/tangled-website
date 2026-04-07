"use client";

import { useState, useRef } from "react";
import type { OrderFormData } from "@/lib/types";
import { INITIAL_FORM_DATA } from "@/lib/types";
import { sendOrderEmail } from "@/lib/actions/sendOrderEmail";
import StepIndicator from "./StepIndicator";
import StepItemType from "./steps/StepItemType";
import StepCustomize from "./steps/StepCustomize";
import StepOptions from "./steps/StepOptions";
import StepUpload from "./steps/StepUpload";
import StepDelivery from "./steps/StepDelivery";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import OrderSuccess from "./OrderSuccess";

const STEP_LABELS = [
  "Item Type",
  "Customize",
  "Size & Options",
  "Reference & Notes",
  "Delivery",
  "Contact Info",
  "Review",
];

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);
  const topRef = useRef<HTMLDivElement>(null);

  const update = (data: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const isCustom = formData.itemType === "custom";
  const next = () => { setStep((s) => { const n = s + 1; return Math.min(isCustom && n === 3 ? 4 : n, 7); }); scrollToTop(); };
  const back = () => { setStep((s) => { const n = s - 1; return Math.max(isCustom && n === 3 ? 2 : n, 1); }); scrollToTop(); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      let imageBase64: string | null = null;
      if (formData.referenceImageFile) {
        const buffer = await formData.referenceImageFile.arrayBuffer();
        imageBase64 = Buffer.from(buffer).toString("base64");
      }
      await sendOrderEmail(formData, imageBase64);
      scrollToTop();
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong submitting your order. Please try again or DM me on Instagram.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <OrderSuccess firstName={formData.firstName} email={formData.email} />;
  }

  return (
    <div>
      <div ref={topRef} />
      <div className="mb-10">
        <StepIndicator
          currentStep={step}
          totalSteps={7}
          labels={STEP_LABELS}
        />
      </div>

      {step === 1 && (
        <StepItemType formData={formData} onChange={update} onNext={next} />
      )}
      {step === 2 && (
        <StepCustomize formData={formData} onChange={update} onNext={next} onBack={back} />
      )}
      {step === 3 && (
        <StepOptions formData={formData} onChange={update} onNext={next} onBack={back} />
      )}
      {step === 4 && (
        <StepUpload formData={formData} onChange={update} onNext={next} onBack={back} />
      )}
      {step === 5 && (
        <StepDelivery formData={formData} onChange={update} onNext={next} onBack={back} />
      )}
      {step === 6 && (
        <StepContact formData={formData} onChange={update} onNext={next} onBack={back} />
      )}
      {step === 7 && (
        <StepReview formData={formData} onSubmit={handleSubmit} onBack={back} submitting={submitting} submitError={submitError} />
      )}
    </div>
  );
}
