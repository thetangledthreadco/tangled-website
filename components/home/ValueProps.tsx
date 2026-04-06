const values = [
  {
    label: "Handmade",
    description: "Every stitch placed by hand.",
  },
  {
    label: "Fully Custom",
    description: "Your name, your colors, your font.",
  },
  {
    label: "One of a Kind",
    description: "Each upcycled drop is unique.",
  },
  {
    label: "Small Batch",
    description: "Quality over volume, always.",
  },
];

export default function ValueProps() {
  return (
    <section className="bg-oat border-y border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {values.map((v) => (
            <div key={v.label} className="px-6 first:pl-0 last:pr-0 py-2">
              <p className="font-serif text-base text-brown mb-1">{v.label}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
