import { siteConfig } from "@/data/siteConfig";
import { footerLinks } from "@/data/footerLinks";
import { MapPinIcon, PhoneIcon, MailIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontak"
      className="bg-primary-dark text-surface-soft"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Kontak dan Tautan
      </h2>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
        {/* Kolom 1: Identitas & Alamat */}
        <div>
          <h3 className="text-xl font-semibold text-surface-soft">{siteConfig.nama}</h3>
          <p className="mt-2 text-sm text-surface-pale">Berdiri sejak {siteConfig.tahunBerdiri}</p>
          <div className="mt-4 flex items-start gap-3 text-sm">
            <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-soft" aria-hidden="true" />
            <address className="not-italic">{siteConfig.alamat}</address>
          </div>
        </div>

        {/* Kolom 2: Kontak & Navigasi */}
        <div>
          <h3 className="text-xl font-semibold text-surface-soft">Kontak</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 flex-shrink-0 text-primary-soft" aria-hidden="true" />
              <a href={`tel:${siteConfig.telepon.replace(/\[Contoh\]\s*/, "")}`} className="hover:underline">
                {siteConfig.telepon}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 flex-shrink-0 text-primary-soft" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email.replace(/\[Contoh\]\s*/, "")}`} className="hover:underline">
                {siteConfig.email}
              </a>
            </div>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-surface-soft">Tautan</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Peta & Media Sosial */}
        <div>
          <h3 className="text-xl font-semibold text-surface-soft">Lokasi</h3>
          <div className="mt-4 overflow-hidden rounded-lg border border-border-soft">
            <iframe
              src={siteConfig.mapsEmbedUrl.replace(/\[Contoh\]\s*/, "")}
              title="Peta lokasi Klinik Pratama Satria Gadingan"
              width="100%"
              height="220"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {siteConfig.socialMedia.map((s) => (
              <a
                key={s.platform}
                href={s.url.replace(/\[Contoh\]\s*/, "#")}
                aria-label={`${s.label} Klinik Pratama Satria Gadingan`}
                className="rounded-md bg-primary-soft px-3 py-1.5 text-sm text-primary-dark transition-colors hover:bg-surface-soft"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft/30 px-4 py-4 text-center text-sm text-surface-pale">
        © {year} {siteConfig.nama}. Berdiri sejak {siteConfig.tahunBerdiri}.
      </div>
    </footer>
  );
}
