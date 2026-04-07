import type { Metadata } from "next";
import Image from "next/image";
import OrderForm from "@/components/custom/OrderForm";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Order a custom embroidered sweater, blanket, romper, or jacket. Personalized with your name, font, and yarn colors. Handmade in Spokane, WA.",
};

const pricingItems = [
  { label: "Baby & Toddler Sweater", price: "$45", detail: "0m–5T" },
  { label: "Big Kid Sweater", price: "$50", detail: "Sizes 5–12" },
  { label: "Adult Sweater", price: "$55", detail: "S–XL" },
  { label: "Fine-Gauge Knit Romper", price: "$45", detail: "Infant sizes" },
  { label: '"For This Child We Have Prayed"', price: "$60", detail: "Specialty romper" },
  { label: '"Brave Little One"', price: "$50", detail: "Specialty romper" },
  { label: "Baby Blanket, 100% Cotton", price: "$50", detail: "90×70 cm" },
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

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full pt-32 pb-20 px-6 md:px-12 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-5">
              Custom Embroidery
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight mb-6">
              Tell me what to stitch.
            </h1>
            <p className="font-sans text-base text-muted leading-relaxed max-w-md">
              Sweaters, blankets, rompers, jackets. Each one made to order, by hand.
              Your wording, your font, your colors.
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm font-sans text-muted">
              {[
                "Turnaround varies, ask for current timing",
                "50% deposit to confirm",
                "Ship ($8–$10) or Spokane pickup",
                "Photo sent before release",
                "Most sweater colors are available in 0–3m through 5T. If a specific color/size combo is out of stock, allow an extra ~3 weeks for it to be ordered in",
              ].map((note) => (
                <span key={note} className="flex items-center gap-3">
                  <span className="w-px h-4 bg-rose flex-shrink-0" />
                  {note}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/portfolio/portfolio-flatlay.jpeg"
              alt="Custom embroidered sweaters: Lily, Karis, Beans, Isabella, Penny Mabel, sunflower, and more"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full px-6 md:px-12 py-20 bg-oat border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Pricing
            </p>
            <h2 className="font-serif text-4xl text-brown font-light">Starting prices</h2>
            <p className="font-sans text-sm text-muted mt-3">
              Base price includes up to 6 letters. Final total confirmed when I follow up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mb-12">
            {pricingItems.map((item) => (
              <div
                key={item.label}
                className="bg-warm-white p-5"
              >
                <p className="font-serif text-base text-brown mb-1 leading-snug">
                  {item.label}
                </p>
                <p className="font-sans text-xl font-medium text-rose mb-1">{item.price}</p>
                <p className="font-sans text-xs text-muted">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="border border-border bg-warm-white">
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
                    <span className="font-sans text-sm font-medium text-rose shrink-0">
                      {item.price}
                    </span>
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
                    <span className="font-sans text-sm font-medium text-rose shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order form */}
      <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-cream border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
              Place Your Order
            </p>
            <h2 className="font-serif text-4xl text-brown font-light mb-3">
              Start your custom order
            </h2>
            <p className="font-sans text-sm text-muted leading-relaxed">
              Fill out the form below. I&apos;ll follow up to confirm details and send a
              50% deposit invoice before getting started.
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
