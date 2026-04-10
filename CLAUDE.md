# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build, must pass before merging
npm run lint      # ESLint
```

## Stack

- **Next.js 16** (App Router, Turbopack): all pages are server components by default; use `"use client"` only for interactive components
- **React 19**
- **Tailwind CSS v4**: design tokens live in `app/globals.css` inside the `@theme {}` block (no `tailwind.config.ts`)
- **TypeScript strict**

## Architecture

### Two business models
1. **Custom embroidery**: guided multi-step order form at `/custom`. Currently submits to a success state only (no backend). Stripe deposit wiring is a future task.
2. **Upcycled drops**: preview grid at `/drops` that links to `https://shop.thetangledthreadco.com/products/[handle]`. Do NOT build a cart; Shopify owns checkout.

### Key design system facts
- All brand colors are defined as `--color-*` vars in `app/globals.css` → `@theme {}`. Use them as Tailwind classes: `bg-cream`, `text-rose`, `border-border`, etc.
- Fonts: `--font-serif` (Cormorant Garamond) for all headings, `--font-sans` (DM Sans) for body. Applied via CSS vars loaded in `app/layout.tsx`.

### Client/server split pattern
Page files (`app/*/page.tsx`) are server components and export `metadata`. Interactive sections are extracted to `components/*/` client components with `"use client"`. See `components/faq/FaqClient.tsx` and `components/contact/ContactForm.tsx` as examples.

### Image hosting
Placeholder images from `images.unsplash.com`, swap-ready. Domain is whitelisted in `next.config.ts`. Use `next/image` with `fill` + explicit `sizes` for all images.

### Data
Mock data lives in `lib/data/`. `DropItem`, `GalleryItem`, `FaqItem`, and `OrderFormData` types are in `lib/types.ts`. The `drops.ts` shape mirrors what a future Shopify Storefront API integration would return.

### Order form
7-step form in `components/custom/OrderForm.tsx`: state machine with `useState<OrderFormData>`. Each step is a separate component under `components/custom/steps/`. All validation is inline per-step.
