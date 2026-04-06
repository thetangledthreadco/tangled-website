"use client";

import { useRef } from "react";
import type { OrderFormData } from "@/lib/types";

interface StepUploadProps {
  formData: OrderFormData;
  onChange: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepUpload({ formData, onChange, onNext, onBack }: StepUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange({
      referenceImageFile: file,
      referenceImageName: file?.name ?? "",
    });
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Reference & notes</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Optionally share an inspiration image and any special instructions.
      </p>

      {/* Image upload */}
      <div className="mb-8">
        <p className="font-sans text-sm font-medium text-ink mb-3">
          Reference image <span className="font-normal text-muted">- optional</span>
        </p>
        <div
          onClick={() => fileRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center p-8 rounded border-2 border-dashed
            cursor-pointer transition-colors duration-200
            ${formData.referenceImageName
              ? "border-rose bg-rose/5"
              : "border-border bg-warm-white hover:border-rose/50 hover:bg-oat"
            }
          `}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {formData.referenceImageName ? (
            <>
              <span className="text-2xl mb-2">✓</span>
              <p className="font-sans text-sm font-medium text-rose">{formData.referenceImageName}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({ referenceImageFile: null, referenceImageName: "" });
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="mt-2 font-sans text-xs text-muted hover:text-rose transition-colors"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <span className="text-3xl mb-3 text-muted/40">↑</span>
              <p className="font-sans text-sm font-medium text-brown">Click to upload an image</p>
              <p className="font-sans text-xs text-muted mt-1">PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
        <p className="font-sans text-xs text-muted mt-2">
          Share an inspiration photo, a font reference, or a placement example.
        </p>
      </div>

      {/* Notes */}
      <div className="mb-10">
        <label htmlFor="notes" className="block font-sans text-sm font-medium text-ink mb-2">
          Special notes <span className="font-normal text-muted">- optional</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Any special placement, spelling instructions, or requests…"
          className="
            w-full px-4 py-3 rounded border border-border bg-warm-white font-sans text-base text-ink
            placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose/50
            resize-none transition-colors
          "
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-6 py-3 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
