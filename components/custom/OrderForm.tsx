"use client";

import { useState, useRef, useEffect } from "react";
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

const STORAGE_KEY = "ttc_order_form";
const STORAGE_IMAGE_KEY = "ttc_order_image";

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_IMAGE_KEY);
  } catch {}
}

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);
  const [restored, setRestored] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) { setRestored(true); return; }
      const { step: savedStep, formData: savedFormData } = JSON.parse(stored);
      setStep(savedStep ?? 1);

      const imageDataUrl = localStorage.getItem(STORAGE_IMAGE_KEY);
      if (imageDataUrl && savedFormData.referenceImageName) {
        fetch(imageDataUrl)
          .then((r) => r.blob())
          .then((blob) => {
            const file = new File([blob], savedFormData.referenceImageName, { type: blob.type });
            setFormData({ ...INITIAL_FORM_DATA, ...savedFormData, referenceImageFile: file });
          })
          .catch(() => {
            setFormData({ ...INITIAL_FORM_DATA, ...savedFormData, referenceImageFile: null, referenceImageName: "" });
          })
          .finally(() => setRestored(true));
      } else {
        setFormData({ ...INITIAL_FORM_DATA, ...savedFormData, referenceImageFile: null, referenceImageName: "" });
        setRestored(true);
      }
    } catch {
      setRestored(true);
    }
  }, []);

  // Save form data to localStorage (skip until after restore)
  useEffect(() => {
    if (!restored) return;
    try {
      const { referenceImageFile, ...serializable } = formData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData: serializable }));
    } catch {}
  }, [step, formData, restored]);

  // Save image to localStorage whenever it changes
  useEffect(() => {
    if (!restored) return;
    if (!formData.referenceImageFile) {
      try { localStorage.removeItem(STORAGE_IMAGE_KEY); } catch {}
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try { localStorage.setItem(STORAGE_IMAGE_KEY, reader.result as string); } catch {}
    };
    reader.readAsDataURL(formData.referenceImageFile);
  }, [formData.referenceImageFile, restored]);

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
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            resolve(dataUrl.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.referenceImageFile!);
        });
      }
      await sendOrderEmail(formData, imageBase64);
      clearStorage();
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
