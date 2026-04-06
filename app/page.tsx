import type { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "The Tangled Thread Co. - Custom Embroidery & Upcycled Drops",
  description:
    "Handmade custom embroidery on sweaters, blankets, rompers, and more. Shop one-of-a-kind upcycled drops. Everything small-batch and made with care.",
};

export default function HomePage() {
  return <Hero />;
}
