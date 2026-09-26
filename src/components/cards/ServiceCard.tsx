import type { Service } from "@/types/content";
import { ServiceIcon } from "@/components/icons";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border-soft bg-surface-soft p-6 transition-shadow hover:shadow-md">
      <div
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-pale text-primary-soft"
        aria-hidden="true"
      >
        <ServiceIcon name={service.ikonName} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-text-primary">{service.nama}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.deskripsi}</p>
    </article>
  );
}
