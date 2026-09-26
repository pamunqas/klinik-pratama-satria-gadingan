import { staffStructure } from "@/data/doctors";
import { UsersIcon } from "@/components/icons";
import { totalStaff } from "@/lib/utils";

export function DoctorGrid() {
  const total = totalStaff(staffStructure);

  return (
    <section
      id="dokter"
      aria-labelledby="dokter-heading"
      className="bg-surface-pale py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <h2 id="dokter-heading" className="text-3xl font-bold text-primary-dark md:text-4xl">
            Tim Medis
          </h2>
          <p className="mt-4 text-base text-text-primary md:text-lg">
            Didukung oleh tenaga medis dan tenaga pendukung profesional yang berpengalaman.
          </p>
        </header>

        <article className="rounded-lg border-2 border-accent-peach bg-surface-soft p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-surface-pale text-primary-dark">
              <UsersIcon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text-primary">Tim Medis Klinik Satria</h3>
              <p className="mt-2 text-base text-text-secondary">
                {total} tenaga medis profesional yang berdedikasi untuk pelayanan kesehatan
                terbaik bagi masyarakat.
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 border-t border-border-soft pt-6 sm:grid-cols-2 md:grid-cols-3">
            {staffStructure.map((s) => (
              <div
                key={s.kategori}
                className="flex items-center justify-between gap-3 rounded-md bg-surface-pale px-4 py-2"
              >
                <dt className="text-sm text-text-primary">{s.label}</dt>
                <dd className="text-base font-semibold text-primary-dark">{s.jumlah}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 border-t-2 border-accent-peach pt-4 text-xs italic text-text-secondary">
            Ketersediaan sumber daya manusia ini mendukung pelaksanaan pelayanan kesehatan
            secara terpadu sesuai kebutuhan pasien dan masyarakat.
          </p>
        </article>
      </div>
    </section>
  );
}
