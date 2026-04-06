import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Choose your item",
    description:
      "Select from baby sweaters, adult sweaters, blankets, rompers, or jackets.",
  },
  {
    number: "02",
    title: "Customize it",
    description:
      "Add a name or wording, choose a font style, and pick your yarn colors.",
  },
  {
    number: "03",
    title: "Submit & confirm",
    description:
      "Review and submit your details. A follow-up comes within 1–2 business days to confirm everything.",
  },
  {
    number: "04",
    title: "Receive your piece",
    description:
      "Your order ships in approximately 2 weeks. A photo is sent before anything leaves.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brown font-light">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-serif text-5xl text-rose/20 font-light block mb-5">
                {step.number}
              </span>
              <h3 className="font-serif text-xl text-brown mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/custom"
            className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
          >
            Start Your Custom Order
          </Link>
        </div>
      </div>
    </section>
  );
}
