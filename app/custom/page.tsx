import type { Metadata } from "next";
import Image from "next/image";
import OrderForm from "@/components/custom/OrderForm";
import SweaterConfigurator from "@/components/custom/SweaterConfigurator";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Order a custom hand-embroidered piece — sweaters, rompers, blankets, denim, and more. Made just for you in Spokane, WA.",
};

const pricingItems = [
  { label: "Baby & Toddler Sweater", price: "$45", detail: "0m–5T" },
  { label: "Big Kid Sweater", price: "$50", detail: "Sizes 5–12" },
  { label: "Adult Sweater", price: "$55", detail: "S–XL" },
  { label: "Fine-Gauge Knit Romper", price: "$45", detail: "Infant sizes" },
  { label: "Baby Blanket, 100% Cotton", price: "$50", detail: "90×70 cm, one size" },
  { label: "Something Else", price: "Let's chat", detail: "Denim, totes, pillows, backpacks & more" },
];

const addOnItems = [
  { label: "Middle name (up to 6 letters)", price: "$5" },
  { label: "Each additional letter (7+)", price: "$2 each" },
  { label: "Small design (flower, bee, heart, rose, bow…)", price: "$1.50 each" },
  { label: "Medium design (mountains, specialty flower…)", price: "$5–$10" },
  { label: "Large design (wildflower garden, bear face, duck, goose)", price: "$10–$15+" },
  { label: "Block letter specialty design", price: "$45" },
  { label: "Big/Lil Bro or Sis design", price: "$45" },
  { label: "Floral letter design", price: "$50" },
];

const steps = [
  {
    n: "01",
    title: "Fill out the form",
    body: "Tell me what you want stitched — the item, your wording, colors, and any notes. Don't worry if you're not sure on every detail yet.",
  },
  {
    n: "02",
    title: "I follow up personally",
    body: "I reach out within 1–2 business days to confirm your design — placement, yarn colors, font choice, and anything else we need to sort out.",
  },
  {
    n: "03",
    title: "Deposit and done",
    body: "Once we've finalized everything together, I send a 50% deposit invoice. Work begins as soon as it's received.",
  },
  {
    n: "04",
    title: "Photo before it ships",
    body: "I stitch your piece by hand, send a photo for your approval, then ship it out or arrange pickup here in Spokane.",
  },
];

const itemCategories = [
  { label: "Baby & Toddler Sweaters", detail: "Sizes 0m–5T" },
  { label: "Big Kid Sweaters", detail: "Sizes 5–12" },
  { label: "Adult Sweaters", detail: "Sizes S–XL" },
  { label: "Fine-Gauge Knit Rompers", detail: "Infant sizes" },
  { label: "Baby Blankets", detail: "100% Cotton" },
  { label: "Denim Jackets", detail: "Kids & adult" },
  { label: "Beanies", detail: "Infant through adult" },
  { label: "Something else?", detail: "Name baskets, pillow cases, tote bags, backpacks, denim jackets — if it can be stitched, let's talk" },
];

export default function CustomPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text + CTAs */}
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-5">
              Custom Embroidery · Spokane, WA
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight mb-6">
              Tell me what<br className="hidden sm:block" /> to stitch.
            </h1>
            <p className="font-sans text-base text-muted leading-relaxed max-w-md mb-10">
              Hand-embroidered pieces made just for you — sweaters, rompers, blankets, denim, and more.
              Fill out the form with what you have in mind, I&apos;ll follow up to confirm every detail,
              and then I get to stitching.
            </p>

            {/* Quick-jump buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#items"
                className="px-5 py-2.5 rounded border border-border bg-warm-white font-sans text-sm text-brown hover:bg-oat hover:border-rose/30 transition-colors"
              >
                What I can stitch
              </a>
              <a
                href="#pricing"
                className="px-5 py-2.5 rounded border border-border bg-warm-white font-sans text-sm text-brown hover:bg-oat hover:border-rose/30 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#order"
                className="px-5 py-2.5 rounded bg-rose text-warm-white font-sans text-sm hover:bg-rose-dark transition-colors"
              >
                Place your order
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src="/images/portfolio/portfolio-flatlay.jpeg"
              alt="Custom embroidered sweaters laid flat — Lily, Karis, Isabella, Penny Mabel, and more"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="w-full px-6 md:px-12 py-20 bg-warm-white border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              The process
            </p>
            <h2 className="font-serif text-4xl text-brown font-light">How it works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step) => (
              <div key={step.n} className="bg-oat p-7">
                <p className="font-serif text-3xl text-rose/30 font-light mb-5 leading-none">
                  {step.n}
                </p>
                <p className="font-sans text-sm font-medium text-ink mb-3">{step.title}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customizable Pieces ── */}
      <section id="items" className="w-full px-6 md:px-12 py-20 bg-oat border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Items
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">
              Customizable Pieces
            </h2>
            <p className="font-sans text-sm text-muted max-w-lg">
              Don&apos;t see what you&apos;re looking for? Fill out the form and describe it — if it can be stitched, I&apos;ll make it work.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {itemCategories.map((item) => (
              <div key={item.label} className="bg-warm-white border border-border p-5">
                <p className="font-serif text-base text-brown leading-snug mb-1">{item.label}</p>
                <p className="font-sans text-xs text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Sweater color note */}
          <p className="font-sans text-xs text-muted leading-relaxed max-w-xl">
            <span className="text-brown font-medium">Sweater color note:</span>{" "}
            Most colors are available in 0–3m through 5T. If a specific color/size combo
            needs to be ordered in, allow an extra ~3 weeks.
          </p>
        </div>
      </section>

      {/* ── Preview configurator ── */}
      <section className="w-full px-6 md:px-12 py-20 bg-warm-white border-t border-border">
        <div className="max-w-md mx-auto">
          <div className="mb-10 text-center">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Preview
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">
              See it before you order.
            </h2>
            <p className="font-sans text-sm text-muted">
              Play with colors and fonts to get an idea of how your piece will look.
            </p>
          </div>
          <SweaterConfigurator />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="w-full px-6 md:px-12 py-20 bg-oat border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Pricing
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">Starting prices</h2>
            <p className="font-sans text-sm text-muted">
              Base price includes up to 6 letters. Final total confirmed when I follow up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
            {pricingItems.map((item) => (
              <div key={item.label} className="bg-oat border border-border p-5">
                <p className="font-serif text-base text-brown mb-1 leading-snug">{item.label}</p>
                <p className="font-sans text-xl font-medium text-rose mb-1">{item.price}</p>
                <p className="font-sans text-xs text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="border border-border bg-warm-white mb-10">
            <div className="px-6 py-5 border-b border-border">
              <p className="font-sans text-sm font-medium text-ink">
                Add-ons <span className="font-normal text-muted">(applies to all items)</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div>
                {addOnItems.slice(0, Math.ceil(addOnItems.length / 2)).map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-start px-6 py-3.5 border-b border-border last:border-0"
                  >
                    <span className="font-sans text-sm text-ink pr-4">{item.label}</span>
                    <span className="font-sans text-sm font-medium text-rose shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
              <div>
                {addOnItems.slice(Math.ceil(addOnItems.length / 2)).map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-start px-6 py-3.5 border-b border-border last:border-0"
                  >
                    <span className="font-sans text-sm text-ink pr-4">{item.label}</span>
                    <span className="font-sans text-sm font-medium text-rose shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logistics notes */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {[
              { label: "Shipping", value: "$8–$10 flat rate, or free local pickup in Spokane" },
              { label: "Turnaround", value: "Varies by season — ask when you fill out the form and I'll give you a current estimate" },
              { label: "Deposit", value: "50% upfront once details are confirmed, remaining balance before pickup or shipping" },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1">
                <p className="font-sans text-xs font-medium text-rose uppercase tracking-widest mb-1">{label}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order form ── */}
      <section id="order" className="w-full px-6 md:px-12 py-20 md:py-28 bg-cream border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Custom Order
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">
              Start your custom order.
            </h2>
            <p className="font-sans text-sm text-muted leading-relaxed mb-4">
              Tell me what you&apos;re envisioning and I&apos;ll follow up to finalize the design before getting started.
            </p>
            <p className="font-sans text-xs text-muted/60">
              Not sure yet?{" "}
              <a href="#pricing" className="underline underline-offset-2 hover:text-rose transition-colors">
                Scroll up to explore pricing and options.
              </a>
            </p>
          </div>

          <div className="bg-warm-white p-6 md:p-10 border border-border">
            <OrderForm />
          </div>
        </div>
      </section>
    </>
  );
}
