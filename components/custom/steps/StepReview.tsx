import type { OrderFormData } from "@/lib/types";

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
  "chunky-romper": "Chunky Knit Romper",
  "fine-gauge-romper": "Fine-Gauge Knit Romper",
  "ftcwhp-romper": '"For This Child We Have Prayed" Romper',
  "brave-little-one-romper": '"Brave Little One" Romper',
  "blanket-cotton": "Baby Blanket - 100% Cotton",
  "blanket-acrylic": "Baby Blanket - Acrylic",
  "denim-jacket": "Denim Jacket",
  "pillow-case": "Pillow Case",
  "beanie": "Infant/Kids Beanie",
};

const fontLabels: Record<string, string> = {
  "font-1": "Font 1",
  "font-2": "Font 2",
  "font-3": "Font 3",
  "font-4": "Font 4",
  "font-5": "Font 5",
  "font-6": "Font 6",
  "font-7": "Font 7",
  "font-8": "Font 8",
};

const specialtyDesignLabels: Record<string, string> = {
  "block-letter": "Block Letter",
  "floral-letter": "Floral Letter",
};

interface RowProps {
  label: string;
  value: string;
}
function Row({ label, value }: RowProps) {
  return (
    <div className="flex justify-between py-3 border-b border-border last:border-0">
      <span className="font-sans text-sm text-muted">{label}</span>
      <span className="font-sans text-sm text-ink text-right max-w-[60%]">{value}</span>
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

      <div className="bg-oat rounded p-6 mb-5 space-y-1">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-3">
          Your Order
        </p>
        <Row label="Item" value={itemLabels[formData.itemType] ?? formData.itemType} />
        {formData.specialtyDesign && (
          <Row label="Specialty design" value={specialtyDesignLabels[formData.specialtyDesign] ?? formData.specialtyDesign} />
        )}
        <Row label={formData.specialtyDesign ? "Letter" : "Wording"} value={`"${formData.wording}"`} />
        <Row label="Font" value={fontLabels[formData.fontStyle] ?? formData.fontStyle} />
        <Row label="Yarn color(s)" value={formData.yarnColors.join(", ")} />
        <Row label="Size" value={formData.size} />
        {formData.itemColor && <Row label="Sweater color" value={formData.itemColor} />}
        {formData.referenceImageName && (
          <Row label="Reference image" value={formData.referenceImageName} />
        )}
        {formData.notes && <Row label="Notes" value={formData.notes} />}
        <Row
          label="Delivery"
          value={
            formData.delivery === "shipping"
              ? `Ship to ${formData.shippingAddress}, ${formData.shippingCity}, ${formData.shippingState} ${formData.shippingZip}`
              : "Local pickup - Spokane, WA"
          }
        />
      </div>

      <div className="bg-oat rounded p-6 mb-6">
        <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-3">
          Contact
        </p>
        <Row label="Name" value={`${formData.firstName} ${formData.lastName}`} />
        <Row label="Email" value={formData.email} />
        <Row label="Phone" value={formData.phone} />
        <Row
          label="Preferred contact"
          value={
            formData.preferredContact === "instagram"
              ? `Instagram DM (@${formData.instagramHandle})`
              : formData.preferredContact === "email"
              ? "Email"
              : "Phone"
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

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded border border-border text-brown font-sans font-medium text-sm hover:bg-oat transition-colors cursor-pointer"
        >
          Back
        </button>
        {submitError && (
          <p className="font-sans text-xs text-rose w-full mb-1">{submitError}</p>
        )}
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
