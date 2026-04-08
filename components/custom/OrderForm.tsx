"use client";

import { useState, useRef, useEffect } from "react";
import type { OrderFormData, CartItem } from "@/lib/types";
import { INITIAL_FORM_DATA, EMPTY_CART_ITEM } from "@/lib/types";
import { sendOrderEmail } from "@/lib/actions/sendOrderEmail";
import StepIndicator from "./StepIndicator";
import StepItemType from "./steps/StepItemType";
import StepCustomize from "./steps/StepCustomize";
import StepOptions from "./steps/StepOptions";
import StepUpload from "./steps/StepUpload";
import StepCart from "./steps/StepCart";
import StepDelivery from "./steps/StepDelivery";
import StepContact from "./steps/StepContact";
import StepReview from "./steps/StepReview";
import OrderSuccess from "./OrderSuccess";

const ITEM_LABELS: Record<string, string> = {
  "baby-toddler-sweater": "Baby & Toddler Sweater",
  "big-kid-sweater": "Big Kid Sweater",
  "adult-sweater": "Adult Sweater",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "blanket-cotton": "Baby Blanket, 100% Cotton",
  "custom": "Something Else",
};

// Step 5 = Cart, 6 = Delivery, 7 = Contact, 8 = Review
const STEP_LABELS = [
  "Item Type",
  "Customize",
  "Size & Options",
  "Reference & Notes",
  "Your Cart",
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

function extractCartItem(formData: OrderFormData): CartItem {
  return {
    itemType: formData.itemType,
    specialtyDesign: formData.specialtyDesign,
    wording: formData.wording,
    fontStyle: formData.fontStyle,
    yarnColors: formData.yarnColors,
    inquiryDescription: formData.inquiryDescription,
    size: formData.size,
    itemColor: formData.itemColor,
    romperStyle: formData.romperStyle,
    referenceImageFile: formData.referenceImageFile,
    referenceImageName: formData.referenceImageName,
    notes: formData.notes,
  };
}

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);
  const [restored, setRestored] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
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
        // Restore cart items without File objects (just names)
        const restoredCart = (savedFormData.cart ?? []).map((item: CartItem) => ({
          ...item,
          referenceImageFile: null,
        }));
        setFormData({ ...INITIAL_FORM_DATA, ...savedFormData, cart: restoredCart, referenceImageFile: null });
        setRestored(true);
      }
    } catch {
      setRestored(true);
    }
  }, []);

  // If somehow on the cart step with nothing in it, go back to step 1
  useEffect(() => {
    if (restored && step === 5 && formData.cart.length === 0) {
      setStep(1);
    }
  }, [restored, step, formData.cart.length]);

  // Save to localStorage
  useEffect(() => {
    if (!restored) return;
    try {
      const { referenceImageFile, cart, ...rest } = formData;
      const serializableCart = cart.map(({ referenceImageFile: _, ...item }) => item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, formData: { ...rest, cart: serializableCart } }));
    } catch {}
  }, [step, formData, restored]);

  // Save current item image
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

  // Add current item to cart (or update if editing) and go to cart step
  const addToCart = () => {
    const item = extractCartItem(formData);
    if (editingIndex !== null) {
      // Replace the item at the original index
      const updated = [...formData.cart];
      updated.splice(editingIndex, 0, item);
      update({ ...EMPTY_CART_ITEM, cart: updated });
      setEditingIndex(null);
    } else {
      update({ ...EMPTY_CART_ITEM, cart: [...formData.cart, item] });
    }
    setStep(5);
    scrollToTop();
  };

  // Start editing a specific cart item by index
  const startEditItem = (index: number) => {
    const items = [...formData.cart];
    const [item] = items.splice(index, 1);
    update({ ...item, cart: items });
    setEditingIndex(index);
    setStep(1);
    scrollToTop();
  };

  // From cart: go back (no longer used for edit, kept for back nav from step 5 edge case)
  const backFromCart = () => {
    setStep(4);
    scrollToTop();
  };

  // From cart: reset current item and go to step 1 to configure another
  const addAnotherItem = () => {
    update(EMPTY_CART_ITEM);
    setEditingIndex(null);
    setStep(1);
    scrollToTop();
  };

  const removeFromCart = (index: number) => {
    const updated = formData.cart.filter((_, i) => i !== index);
    update({ cart: updated });
    // If cart is now empty, go back to configure an item
    if (updated.length === 0) {
      addAnotherItem();
    }
  };

  const isEditing = editingIndex !== null;

  const next = () => {
    if (step === 4) { addToCart(); return; }
    setStep((s) => {
      const n = s + 1;
      // Skip step 3 for custom items; cap at 8
      return Math.min(isCustom && n === 3 ? 4 : n, 8);
    });
    scrollToTop();
  };

  const back = () => {
    if (step === 5) { backFromCart(); return; }
    setStep((s) => {
      const n = s - 1;
      return Math.max(isCustom && n === 3 ? 2 : n, 1);
    });
    scrollToTop();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      // Convert each cart item's image to base64
      const itemImages = await Promise.all(
        formData.cart.map(async (item) => {
          if (!item.referenceImageFile) return null;
          return new Promise<{ filename: string; base64: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              resolve({ filename: item.referenceImageName, base64: dataUrl.split(",")[1] });
            };
            reader.onerror = reject;
            reader.readAsDataURL(item.referenceImageFile!);
          });
        })
      );

      // If total image payload exceeds ~7MB, drop attachments and flag it
      // so the email notes that images should be sent separately
      const MAX_IMAGE_BYTES = 7 * 1024 * 1024;
      const totalImageBytes = itemImages.reduce((sum, img) => sum + (img?.base64.length ?? 0), 0);
      const imagesFailed = totalImageBytes > MAX_IMAGE_BYTES;

      await sendOrderEmail(formData, imagesFailed ? [] : itemImages, imagesFailed);
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

  // Show step indicator for item-config steps (1–4) or checkout steps (6–8)
  // Hide on cart step (5) to keep it cleaner — it's an interstitial
  const showIndicator = step !== 5;

  // For the indicator, show step numbers relative to the full 8-step flow
  // but when adding/editing an item (step < 5 and cart.length > 0), show a secondary label
  const addingAdditional = step <= 4 && formData.cart.length > 0;

  return (
    <div>
      <div ref={topRef} />

      {/* Mini-cart — visible on all steps except the full cart view (step 5) */}
      {step !== 5 && formData.cart.length > 0 && (
        <div className="mb-6 border border-border rounded bg-oat overflow-hidden">
          <button
            onClick={() => setCartOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
          >
            <span className="font-sans text-xs font-medium text-ink">
              Cart — {formData.cart.length} {formData.cart.length === 1 ? "item" : "items"}
            </span>
            <span className="font-sans text-xs text-muted">{cartOpen ? "▲ hide" : "▼ show"}</span>
          </button>
          {cartOpen && (
            <div className="border-t border-border divide-y divide-border">
              {formData.cart.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 gap-4">
                  <div>
                    <p className="font-sans text-xs font-medium text-ink">
                      {ITEM_LABELS[item.itemType] ?? item.itemType}
                    </p>
                    {item.itemType === "custom"
                      ? item.inquiryDescription && <p className="font-sans text-xs text-muted truncate max-w-[200px]">{item.inquiryDescription}</p>
                      : item.wording && <p className="font-sans text-xs text-muted">&ldquo;{item.wording}&rdquo;</p>
                    }
                  </div>
                  <button
                    onClick={() => { startEditItem(i); setCartOpen(false); }}
                    className="font-sans text-xs text-muted hover:text-rose transition-colors shrink-0 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              ))}
              <div className="px-4 py-2.5">
                <button
                  onClick={() => { setStep(5); scrollToTop(); setCartOpen(false); }}
                  className="font-sans text-xs text-rose hover:underline cursor-pointer"
                >
                  View full cart →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showIndicator && (
        <div className="mb-10">
          {addingAdditional && (
            <p className="font-sans text-xs text-rose font-medium tracking-widest uppercase mb-3">
              {isEditing ? `Editing item ${editingIndex! + 1}` : `Adding item ${formData.cart.length + 1}`}
            </p>
          )}
          <StepIndicator currentStep={step} totalSteps={8} labels={STEP_LABELS} />
        </div>
      )}

      {step === 1 && <StepItemType formData={formData} onChange={update} onNext={next} />}
      {step === 2 && <StepCustomize formData={formData} onChange={update} onNext={next} onBack={back} />}
      {step === 3 && <StepOptions formData={formData} onChange={update} onNext={next} onBack={back} />}
      {step === 4 && <StepUpload formData={formData} onChange={update} onNext={next} onBack={back} isEditing={isEditing} />}
      {step === 5 && formData.cart.length === 0 && (
        <StepItemType formData={formData} onChange={update} onNext={next} />
      )}
      {step === 5 && formData.cart.length > 0 && (
        <StepCart
          formData={formData}
          onAddAnother={addAnotherItem}
          onPlaceOrder={() => { setStep(6); scrollToTop(); }}
          onRemove={removeFromCart}
          onEdit={startEditItem}
        />
      )}
      {step === 6 && <StepDelivery formData={formData} onChange={update} onNext={next} onBack={back} />}
      {step === 7 && <StepContact formData={formData} onChange={update} onNext={next} onBack={back} />}
      {step === 8 && (
        <StepReview
          formData={formData}
          onSubmit={handleSubmit}
          onBack={back}
          submitting={submitting}
          submitError={submitError}
        />
      )}
    </div>
  );
}
