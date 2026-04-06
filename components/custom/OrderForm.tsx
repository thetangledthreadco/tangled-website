"use client";

import { useState } from "react";
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

  const update = (data: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 7));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await sendOrderEmail(formData);
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
