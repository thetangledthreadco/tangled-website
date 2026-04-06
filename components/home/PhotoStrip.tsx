"use client";

import Image from "next/image";

const photos = [
  { src: "/images/portfolio/IMG_3983.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_3727.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_3547.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_3015.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_2824.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_2818.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_2461.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_2450.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_1509.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_1024.jpeg", alt: "Embroidery work" },
  { src: "/images/portfolio/IMG_1003.jpeg", alt: "Embroidery work" },
];

export default function PhotoStrip() {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-6 md:-mx-12 px-6 md:px-12">
      <div className="flex gap-3 md:gap-4 w-max pb-2">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative shrink-0 w-52 md:w-64 aspect-[3/4] overflow-hidden rounded-sm"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              sizes="256px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
