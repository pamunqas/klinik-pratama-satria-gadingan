import Image from "next/image";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  return (
    <section
      id="galeri"
      aria-labelledby="galeri-heading"
      className="bg-surface-pale py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <h2 id="galeri-heading" className="text-3xl font-bold text-primary-dark md:text-4xl">
            Galeri Fasilitas
          </h2>
          <p className="mt-4 text-base text-text-primary md:text-lg">
            Fasilitas klinik yang nyaman dan modern untuk mendukung pelayanan terbaik.
          </p>
        </header>

        <div
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          style={{ columnFill: "balance" }}
        >
          {gallery.map((item, idx) => (
            <figure
              key={item.id}
              className={cn(
                "mb-4 break-inside-avoid overflow-hidden rounded-lg bg-surface-soft shadow-sm transition-shadow hover:shadow-md",
                // variasi tinggi untuk efek masonry
                idx % 3 === 0 && "aspect-[4/3]",
                idx % 3 === 1 && "aspect-[3/4]",
                idx % 3 === 2 && "aspect-[1/1]"
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="bg-surface-soft px-4 py-3 text-sm font-medium text-text-primary">
                {item.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
