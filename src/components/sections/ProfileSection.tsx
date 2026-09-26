import { clinicContent } from "@/data/clinicContent";
import { siteConfig } from "@/data/siteConfig";
import { ClockIcon, MapPinIcon, CalendarIcon, UsersIcon } from "@/components/icons";

export function ProfileSection() {
  return (
    <section
      id="profil"
      aria-labelledby="profil-heading"
      className="bg-surface-pale py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <h2
            id="profil-heading"
            className="text-3xl font-bold text-primary-dark md:text-4xl"
          >
            Tentang Klinik Pratama Satria Gadingan
          </h2>
          <p className="mt-4 text-base text-text-primary md:text-lg">{clinicContent.profilSingkat}</p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            {/* Sejarah / Milestone */}
            <article className="rounded-lg bg-surface-soft p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-semibold text-primary-dark">Perjalanan Kami</h3>
              <ol className="mt-6 space-y-6">
                {clinicContent.sejarah.map((m) => (
                  <li key={m.tahun} className="flex gap-4 border-l-4 border-primary-soft pl-4">
                    <div>
                      <p className="text-lg font-bold text-primary-dark">{m.tahun}</p>
                      <p className="mt-1 font-semibold text-text-primary">{m.judul}</p>
                      <p className="mt-1 text-sm text-text-secondary">{m.deskripsi}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            {/* Visi & Misi dalam sand box */}
            <article className="rounded-lg bg-accent-sand p-6 shadow-sm md:p-8">
              <h3 className="text-xl font-semibold text-primary-dark">Visi & Misi</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">Visi</p>
                  <blockquote className="mt-2 border-l-4 border-primary-dark pl-4 text-lg italic text-text-primary">
                    “{clinicContent.visi}”
                  </blockquote>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">Misi</p>
                  <ol className="mt-2 list-decimal space-y-2 pl-6 text-base text-text-primary">
                    {clinicContent.misi.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          </div>

          {/* Info ringkas */}
          <aside className="space-y-4">
            <InfoCard icon={<ClockIcon className="h-6 w-6" />} title="Jam Operasional">
              {clinicContent.jamOperasional}
            </InfoCard>
            <InfoCard icon={<MapPinIcon className="h-6 w-6" />} title="Alamat">
              {siteConfig.alamat}
            </InfoCard>
            <InfoCard icon={<CalendarIcon className="h-6 w-6" />} title="Tahun Berdiri">
              {siteConfig.tahunBerdiri} — dirintis oleh {siteConfig.pendiri}
            </InfoCard>
            <InfoCard icon={<UsersIcon className="h-6 w-6" />} title="Status">
              Bekerja sama dengan BPJS Kesehatan — melayani pasien umum dan peserta JKN.
            </InfoCard>
          </aside>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-surface-soft p-5 shadow-sm">
      <div className="flex items-center gap-3 text-primary-dark">
        {icon}
        <h4 className="text-base font-semibold">{title}</h4>
      </div>
      <div className="mt-2 text-sm text-text-primary">{children}</div>
    </div>
  );
}
