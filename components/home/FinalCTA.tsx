import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full px-6 md:px-12 py-24 md:py-36 bg-brown text-warm-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-6">
          Something made{" "}
          <span className="italic text-rose-light">just for you.</span>
        </h2>
        <p className="font-sans text-base text-warm-white/60 leading-relaxed mb-12 max-w-sm mx-auto">
          Custom orders are always open. Start with the form, or reach out directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/custom"
            className="inline-flex items-center justify-center px-8 py-4 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
          >
            Start a Custom Order
          </Link>
          <button
            disabled
            className="inline-flex items-center justify-center px-8 py-4 border border-warm-white/15 text-warm-white/40 font-sans font-medium text-sm rounded tracking-wide cursor-not-allowed"
          >
            Shop Drops — Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}
