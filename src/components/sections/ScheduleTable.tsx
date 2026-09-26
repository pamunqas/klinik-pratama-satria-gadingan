import { schedules } from "@/data/schedules";
import { services } from "@/data/services";
import { ClockIcon } from "@/components/icons";

const HARI_ORDER = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu", "Senin–Sabtu"];

export function ScheduleTable() {
  const sorted = [...schedules].sort((a, b) => {
    const aIdx = HARI_ORDER.indexOf(a.hari);
    const bIdx = HARI_ORDER.indexOf(b.hari);
    if (aIdx !== bIdx) return aIdx - bIdx;
    return a.jamMulai.localeCompare(b.jamMulai);
  });

  return (
    <section
      id="jadwal"
      aria-labelledby="jadwal-heading"
      className="bg-surface-soft py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <h2 id="jadwal-heading" className="text-3xl font-bold text-primary-dark md:text-4xl">
            Jadwal Dokter
          </h2>
          <p className="mt-4 text-base text-text-primary md:text-lg">
            Jadwal praktik dokter dan poli. Bawa kartu identitas dan kartu BPJS (jika ada)
            saat berkunjung.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border border-border-soft bg-surface-soft">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead className="bg-primary-dark text-surface-soft">
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-primary-dark px-4 py-3 text-base font-semibold">
                  Poli
                </th>
                <th scope="col" className="px-4 py-3 text-base font-semibold">Dokter</th>
                <th scope="col" className="px-4 py-3 text-base font-semibold">Hari</th>
                <th scope="col" className="px-4 py-3 text-base font-semibold">Jam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft text-base text-text-primary">
              {sorted.map((s) => {
                const poli = services.find((svc) => svc.id === s.poliId);
                return (
                  <tr key={s.id} className="hover:bg-surface-pale">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-surface-soft px-4 py-3 font-semibold"
                    >
                      {poli?.nama ?? s.poliId}
                    </th>
                    <td className="px-4 py-3">{s.doctorName}</td>
                    <td className="px-4 py-3">{s.hari}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="h-4 w-4 text-primary-soft" aria-hidden="true" />
                        {s.jamMulai} – {s.jamSelesai}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm italic text-text-secondary">
          * Jadwal dapat berubah sewaktu-waktu. Gunakan Mobile JKN untuk mengecek antrean.
        </p>
      </div>
    </section>
  );
}
