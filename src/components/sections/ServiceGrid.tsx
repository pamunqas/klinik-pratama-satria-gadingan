import { services } from "@/data/services";
import { ServiceCard } from "@/components/cards/ServiceCard";

export function ServiceGrid() {
  return (
    <section
      id="layanan"
      aria-labelledby="layanan-heading"
      className="bg-surface-soft py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-12 max-w-3xl">
          <h2
            id="layanan-heading"
            className="text-3xl font-bold text-primary-dark md:text-4xl"
          >
            Layanan Kami
          </h2>
          <p className="mt-4 text-base text-text-primary md:text-lg">
            Klinik Pratama Satria Gadingan melayani pasien umum dan peserta BPJS Kesehatan
            dengan berbagai layanan terpadu.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}
