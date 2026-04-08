import type { OrderFormData, CartItem } from "@/lib/types";

interface StepReviewProps {
  formData: OrderFormData;
  onSubmit: () => void;
  onBack: () => void;
  submitting?: boolean;
  submitError?: string;
}

const itemLabels: Record<string, string> = {
  "baby-toddler-sweater": "Baby & Toddler Sweater",
  "big-kid-sweater": "Big Kid Sweater",
  "adult-sweater": "Adult Sweater",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "blanket-cotton": "Baby Blanket - 100% Cotton",
  "custom": "Custom Inquiry",
};

const fontLabels: Record<string, string> = {
  "font-1": "Font 1", "font-2": "Font 2", "font-3": "Font 3", "font-4": "Font 4",
  "font-5": "Font 5", "font-6": "Font 6", "font-7": "Font 7", "font-8": "Font 8",
};

const specialtyLabels: Record<string, string> = {
  "block-letter": "Block Letter",
  "floral-letter": "Floral Letter",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-border last:border-0">
      <span className="font-sans text-sm text-muted">{label}</span>
      <span className="font-sans text-sm text-ink text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function ItemSummary({ item, index, total }: { item: CartItem; index: number; total: number }) {
  return (
    <div className="bg-oat rounded p-5 mb-4">
      <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-3">
        {total > 1 ? `Item ${index + 1}` : "Your Order"}
      </p>
      <Row label="Item" value={itemLabels[item.itemType] ?? item.itemType} />
      {item.itemType === "custom" ? (
        <Row label="Description" value={item.inquiryDescription} />
      ) : (
        <>
          {item.specialtyDesign && (
            <Row label="Specialty design" value={specialtyLabels[item.specialtyDesign] ?? item.specialtyDesign} />
          )}
          <Row label={item.specialtyDesign ? "Letter" : "Wording"} value={`"${item.wording}"`} />
          {item.fontStyle && <Row label="Font" value={fontLabels[item.fontStyle] ?? item.fontStyle} />}
          {item.yarnColors.length > 0 && <Row label="Yarn color(s)" value={item.yarnColors.join(", ")} />}
        </>
      )}
      {item.size && <Row label="Size" value={item.size} />}
      {item.romperStyle && <Row label="Romper style" value={item.romperStyle === "ruffled" ? "Ruffled" : "Non-Ruffled"} />}
      {item.itemColor && <Row label={item.romperStyle || item.itemType === "blanket-cotton" ? "Color" : "Sweater color"} value={item.itemColor} />}
      {item.referenceImageName && <Row label="Reference image" value={item.referenceImageName} />}
      {item.notes && <Row label="Notes" value={item.notes} />}
    </div>
  );
}

export default function StepReview({ formData, onSubmit, onBack, submitting, submitError }: StepReviewProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-brown mb-2">Review your order</h2>
      <p className="font-sans text-sm text-muted mb-8">
        Everything look right? I&apos;ll follow up to confirm pricing and collect your 50%
        deposit before starting.
      </p>

      {formData.cart.map((item, i) => (
        <ItemSummary key={i} item={item} index={i} total={formData.cart.length} />
      ))}

      <div className="bg-oat rounded p-5 mb-4">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-3">Delivery</p>
        <Row
          label="Method"
          value={
            formData.delivery === "shipping"
              ? `Ship to ${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState} ${formData.shippingZip}`
              : "Local pickup — Spokane, WA"
          }
        />
      </div>

      <div className="bg-oat rounded p-5 mb-6">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-3">Contact</p>
        <Row label="Name" value={`${formData.firstName} ${formData.lastName}`} />
        <Row label="Email" value={formData.email} />
        <Row label="Phone" value={formData.phone} />
        <Row
          label="Preferred contact"
          value={
            formData.preferredContact === "instagram"
              ? `Instagram DM (@${formData.instagramHandle})`
              : formData.preferredContact === "email" ? "Email" : "Phone"
          }
        />
      </div>

      <div className="bg-rose/5 border border-rose/20 rounded p-4 mb-8">
        <p className="font-sans text-sm text-brown leading-relaxed">
          <strong>What happens next:</strong>{" "}I&apos;ll review your order and reach out
          within 1–2 business days to confirm details, finalize pricing, and send a 50%
          deposit invoice. Work begins once the deposit is received. Final payment is due
          before pickup or shipping.
        </p>
      </div>

      {submitError && (
        <p className="font-sans text-xs text-rose mb-3">{submitError}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 px-6 py-3 rounded bg-rose text-warm-white font-sans font-medium text-sm hover:bg-rose-dark transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </div>
  );
}
