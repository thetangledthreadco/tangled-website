"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/custom", label: "Custom Orders" },
  { href: "/drops", label: "Drops" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b border-border transition-all duration-300
        ${scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}
      `}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image
              src="/simple.png"
              alt=""
              width={1536}
              height={1024}
              className="h-16 w-auto"
              priority
            />
            <span className="font-serif text-base text-brown tracking-wide">
              The Tangled Thread Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  font-sans text-sm tracking-wide transition-colors duration-200
                  ${pathname === link.href
                    ? "text-rose font-medium"
                    : "text-muted hover:text-brown"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://shop.thetangledthreadco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 rounded border border-brown text-brown text-sm font-medium hover:bg-oat transition-colors tracking-wide"
            >
              Shop Drops
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block w-6 h-px bg-brown transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-brown transition-all duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-brown transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-16 bg-cream border-b border-border shadow-lg">
          <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  py-3 font-sans text-base border-b border-border/50 last:border-0
                  transition-colors duration-200
                  ${pathname === link.href ? "text-rose font-medium" : "text-ink hover:text-rose"}
                `}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://shop.thetangledthreadco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-3 text-center rounded border border-brown text-brown font-medium hover:bg-oat transition-colors"
            >
              Shop Drops
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
