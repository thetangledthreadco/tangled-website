import Link from "next/link";

interface OrderSuccessProps {
  firstName: string;
  email: string;
}

export default function OrderSuccess({ firstName, email }: OrderSuccessProps) {
  return (
    <div className="py-8">
      <h2 className="font-serif text-4xl text-brown mb-4 font-light">
        Order received, {firstName}.
      </h2>
      <p className="font-sans text-base text-muted leading-relaxed mb-2 max-w-sm">
        I&apos;ll review everything and follow up at{" "}
        <strong className="text-ink font-medium">{email}</strong> within 1–2 business days.
      </p>
      <p className="font-sans text-sm text-muted mb-10">
        Work begins once your deposit is confirmed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-border text-brown font-sans font-medium text-sm rounded hover:bg-oat transition-colors tracking-wide"
        >
          Back to Home
        </Link>
        <Link
          href="/gallery"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
        >
          Browse the Gallery
        </Link>
      </div>
    </div>
  );
}
