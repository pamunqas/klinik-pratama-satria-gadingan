"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border-soft bg-surface-soft/95 backdrop-blur"
          : "border-transparent bg-surface-soft"
      )}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <a href="#beranda" className="flex items-center gap-3" aria-label={`${siteConfig.nama} — Beranda`}>
          <Image
            src="/logo.png"
            alt={`Logo ${siteConfig.nama}`}
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-md object-contain"
          />
          <span className="hidden text-base font-semibold text-text-primary sm:inline">
            {siteConfig.nama}
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-base text-text-primary transition-colors hover:bg-surface-pale hover:text-primary-dark"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#kontak"
          className="rounded-md bg-primary-dark px-4 py-2 text-base font-medium text-surface-soft transition-colors hover:bg-primary-soft hover:text-primary-dark"
        >
          Hubungi Kami
        </a>
      </div>

      {/* Mobile nav */}
      <nav aria-label="Navigasi mobile" className="border-t border-border-soft md:hidden">
        <ul className="flex overflow-x-auto px-4 py-2">
          {navigation.map((item) => (
            <li key={item.href} className="flex-shrink-0">
              <a
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-text-primary hover:bg-surface-pale"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
