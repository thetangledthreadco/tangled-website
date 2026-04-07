import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/custom", label: "Custom Orders" },
  { href: "/drops", label: "Drops" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-oat border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="The Tangled Thread Co."
                width={240}
                height={240}
                className="h-48 w-auto [mix-blend-mode:multiply]"
              />
            </Link>
            <p className="font-sans text-sm text-muted leading-relaxed max-w-xs mb-5">
              Custom embroidery and one-of-a-kind upcycled pieces, handmade in Spokane, WA.
            </p>
            <a
              href="https://instagram.com/the.tangled.thread.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-rose hover:text-rose-dark transition-colors"
            >
              @the.tangled.thread.co ↗
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-ink hover:text-rose transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-muted uppercase mb-5">
              Get in Touch
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/the.tangled.thread.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  Instagram (preferred) ↗
                </a>
              </li>
              <li>
                <a
                  href="mailto:thetangledthreadco@gmail.com"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  thetangledthreadco@gmail.com
                </a>
              </li>
              <li>
                <span className="font-sans text-sm text-muted/50 cursor-not-allowed">
                  Shop Drops — Coming Soon
                </span>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="font-sans text-sm text-ink hover:text-rose transition-colors"
                >
                  Start a Custom Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans text-xs text-muted">
            &copy; {new Date().getFullYear()} The Tangled Thread Co. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted">
            Spokane, WA · Est. 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
