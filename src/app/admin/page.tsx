import Link from "next/link";

const COLLECTIONS = [
  {
    slug: "jadwal",
    title: "Jadwal Dokter",
    description:
      "Edit jadwal praktik dokter per poli (Poli Umum, Gigi, KIA, dll). Perubahan tersimpan ke git dan Vercel redeploy otomatis.",
    href: "/admin/jadwal",
  },
  {
    slug: "dokter",
    title: "Staf Medis",
    description:
      "Edit struktur tim (16 staf dalam 9 kategori) + nama individu & foto anggota tim medis.",
    href: "/admin/dokter",
  },
  {
    slug: "galeri",
    title: "Galeri",
    description:
      "Edit foto fasilitas & kegiatan klinik (Ruang Tunggu, UGD, Poli Gigi, Penyuluhan, dll).",
    href: "/admin/galeri",
  },
];

export default function AdminHome() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark md:text-4xl">
          Dashboard Admin
        </h1>
        <p className="mt-2 text-base text-text-secondary">
          Pilih koleksi yang ingin diedit. Klik kartu untuk membuka editor.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            href={c.href}
            className="block rounded-lg border border-border-soft bg-surface-soft p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-text-primary">{c.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{c.description}</p>
            <p className="mt-4 text-sm font-medium text-primary-dark">Edit →</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-lg border border-border-soft bg-surface-soft p-6">
        <h2 className="text-lg font-semibold text-primary-dark">Catatan Admin</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-text-primary">
          <li>
            Setiap perubahan akan di-commit ke branch <code>main</code> di repo
            GitHub secara otomatis (via GitHub PAT).
          </li>
          <li>
            Vercel akan rebuild dan redeploy otomatis dalam ~30-60 detik setelah commit.
          </li>
          <li>
            Untuk upload foto dokter/galeri, gunakan field upload pada form edit.
          </li>
          <li>
            Session login berlaku 7 hari. Klik "Keluar" untuk logout lebih awal.
          </li>
        </ul>
      </section>
    </div>
  );
}
