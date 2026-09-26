"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { HeroSlide } from "@/types/content";
import { PauseIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

export function HeroCarousel({ slides, intervalMs = 6000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [pausedByHover, setPausedByHover] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!playing || pausedByHover) return;
    timerRef.current = setTimeout(advance, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, pausedByHover, active, intervalMs, advance]);

  const goTo = (i: number) => setActive(((i % slides.length) + slides.length) % slides.length);

  return (
    <section
      id="beranda"
      aria-label="Sambutan utama"
      className="relative h-[480px] w-full overflow-hidden bg-primary-dark md:h-[640px]"
      onMouseEnter={() => setPausedByHover(true)}
      onMouseLeave={() => setPausedByHover(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 via-primary-dark/60 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
            <div className="max-w-2xl text-surface-soft">
              {slide.badge && (
                <span className="inline-block rounded-full bg-accent-peach px-4 py-1.5 text-sm font-semibold text-primary-dark">
                  {slide.badge}
                </span>
              )}
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {slide.judul}
              </h1>
              {slide.subJudul && (
                <p className="mt-4 text-base text-surface-pale md:text-lg">{slide.subJudul}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Kontrol carousel */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Slide sebelumnya"
          className="rounded-full bg-surface-soft/80 p-2 text-primary-dark backdrop-blur transition-colors hover:bg-surface-soft"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Pergi ke slide ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === active ? "w-8 bg-accent-peach" : "w-2.5 bg-surface-soft/60 hover:bg-surface-soft"
            )}
          />
        ))}

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Slide berikutnya"
          className="rounded-full bg-surface-soft/80 p-2 text-primary-dark backdrop-blur transition-colors hover:bg-surface-soft"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Jeda carousel" : "Putar carousel"}
          className="ml-2 rounded-full bg-surface-soft/80 p-2 text-primary-dark backdrop-blur transition-colors hover:bg-surface-soft"
        >
          {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>
      </div>
    </section>
  );
}
