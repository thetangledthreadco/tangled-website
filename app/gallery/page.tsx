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

export default async function GalleryPage() {
  const posts = await getInstagramFeed();

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
          {posts.length === 0 ? (
            <p className="font-sans text-sm text-muted">No posts to show right now.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {posts.map((post) => (
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
