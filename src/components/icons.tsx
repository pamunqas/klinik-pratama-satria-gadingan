/**
 * Ikon inline SVG minimalis, warna mengikuti currentColor (sesuai parent Tailwind class).
 * Tidak ada dependency eksternal — murni React + SVG.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.75,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function StethoscopeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 3v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V3" />
      <path d="M10 13v3a4 4 0 0 0 8 0v-1" />
      <circle cx="18" cy="11" r="2" />
    </svg>
  );
}

export function ToothIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 5.5C8 3 4 4 4 8c0 3 1 5 2 8s1 4 2 4 1-3 2-3 1 3 2 3 1-1 2-4 2-5 2-8c0-4-4-5-8-2.5z" />
    </svg>
  );
}

export function BabyIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="9" r="3" />
      <path d="M9 9h.01M15 9h.01M9.5 13s1 1 2.5 1 2.5-1 2.5-1" />
      <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

export function HeartHandshakeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="m12 14-2-2" />
    </svg>
  );
}

export function ScanIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </svg>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V2" />
      <path d="M9 2h6" />
      <path d="M7 14h10" />
    </svg>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="9" cy="12" r="2" />
      <path d="M15 8h3M15 12h3M7 16h10" />
    </svg>
  );
}

export function UserRoundIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
    </svg>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2Z" />
      <path d="M16 8a4 4 0 0 1 0 8" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 3v18l15-9L5 3z" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

const iconMap: Record<string, (p: IconProps) => React.JSX.Element> = {
  stethoscope: StethoscopeIcon,
  tooth: ToothIcon,
  baby: BabyIcon,
  "heart-handshake": HeartHandshakeIcon,
  scan: ScanIcon,
  activity: ActivityIcon,
  flask: FlaskIcon,
  "id-card": IdCardIcon,
  "user-round": UserRoundIcon,
  megaphone: MegaphoneIcon,
};

export function ServiceIcon({ name, ...props }: IconProps & { name: string }) {
  const Icon = iconMap[name] ?? HeartPulseIcon;
  return <Icon {...props} />;
}
