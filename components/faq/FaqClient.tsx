"use client";

import { useState } from "react";
import { faqs } from "@/lib/data/faq";
import type { FaqItem } from "@/lib/types";
import Link from "next/link";

type Category = "all" | FaqItem["category"];

const categoryLabels: Record<Category, string> = {
  all: "All",
  orders: "Orders",
  custom: "Custom",
  drops: "Drops",
  shipping: "Shipping",
};

function AccordionItem({ faq }: { faq: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-sans text-base font-medium text-ink group-hover:text-brown transition-colors pr-8">
          {faq.question}
        </span>
        <span
          className={`
            flex-shrink-0 w-5 h-5 flex items-center justify-center
            text-muted transition-all duration-300 text-lg leading-none
            ${open ? "rotate-45 text-rose" : "group-hover:text-brown"}
          `}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-6 pr-8">
          <p className="font-sans text-sm text-muted leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqClient() {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`
              px-5 py-2 rounded font-sans text-sm font-medium transition-colors cursor-pointer tracking-wide
              ${active === cat
                ? "bg-rose text-warm-white"
                : "border border-border text-muted hover:border-brown/40 hover:text-brown"
              }
            `}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((faq) => (
          <AccordionItem key={faq.question} faq={faq} />
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-border">
        <p className="font-serif text-xl text-brown mb-2">Still have a question?</p>
        <p className="font-sans text-sm text-muted mb-6">
          Send a message and I&apos;ll get back to you within 1–2 business days.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-rose text-warm-white font-sans font-medium text-sm rounded hover:bg-rose-dark transition-colors tracking-wide"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
