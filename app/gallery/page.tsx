import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of custom embroidery and upcycled drops from The Tangled Thread Co.",
};

interface BeholdSize {
  mediaUrl: string;
  width: number;
  height: number;
}

interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  caption?: string;
  sizes: {
    small: BeholdSize;
    medium: BeholdSize;
    large: BeholdSize;
    full: BeholdSize;
  };
}

interface BeholdFeed {
  posts: BeholdPost[];
}

async function getInstagramFeed(): Promise<BeholdPost[]> {
  try {
    const res = await fetch("https://feeds.behold.so/fOpfQUZXc3nE2RgucFwx", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: BeholdFeed = await res.json();
    return data.posts ?? [];
  } catch {
    return [];
  }
}

const staticPhotos = [
  "IMG_1024.jpeg", "IMG_1003.jpeg", "IMG_1497.jpeg", "IMG_1499.jpeg",
  "IMG_1504.jpeg", "IMG_1748.jpeg", "IMG_1957.jpeg", "IMG_2450.jpeg",
  "IMG_2818.jpeg", "IMG_2824.jpeg", "IMG_3015.jpeg", "IMG_3017.jpeg",
  "IMG_3557.jpeg", "IMG_3562.jpeg", "IMG_3727.jpeg", "IMG_3983.jpeg",
  "IMG_4197.jpeg", "IMG_8057.jpeg", "IMG_8077.jpeg", "IMG_8286.jpeg",
  "IMG_8520.jpeg", "IMG_8666.jpeg", "IMG_8815.jpeg", "IMG_9394.jpeg",
  "IMG_9528.jpeg", "IMG_9530.jpeg",
];

export default async function GalleryPage() {
  const posts = await getInstagramFeed();
  const igPosts = posts.slice(0, 6);

  return (
    <>
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-6 md:px-12 bg-cream border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase mb-4">
            Gallery
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brown font-light leading-tight">
            Recent work
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-oat">
        <div className="max-w-6xl mx-auto">

          {/* Instagram: top 6 */}
          {igPosts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
              {igPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden aspect-square bg-border"
                >
                  <Image
                    src={post.sizes.medium.mediaUrl}
                    alt={post.caption?.slice(0, 100) ?? "Instagram post"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </a>
              ))}
            </div>
          )}

          {/* Static portfolio photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {staticPhotos.map((filename) => (
              <div
                key={filename}
                className="group relative overflow-hidden aspect-square bg-border"
              >
                <Image
                  src={`/images/portfolio/${filename}`}
                  alt="Custom embroidery by The Tangled Thread Co."
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-sm text-muted mb-4">See the full archive on Instagram</p>
            <a
              href="https://instagram.com/the.tangled.thread.co"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-sm text-brown hover:text-rose transition-colors duration-300"
            >
              @the.tangled.thread.co
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
