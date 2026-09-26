import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://klinik-satria-gadingan.vercel.app"
  ),
  title: {
    default: siteConfig.namaLengkap,
    template: `%s | ${siteConfig.nama}`,
  },
  description:
    "Klinik Pratama Satria Gadingan Yogyakarta — pelayanan kesehatan prima 24 jam untuk pasien umum dan BPJS. Poli Umum, Gigi, KIA, KB, USG, Fisioterapi, dan Laboratorium.",
  keywords: [
    "klinik pratama",
    "klinik sleman",
    "klinik yogyakarta",
    "bpjs",
    "poli umum",
    "klinik 24 jam",
    "klinik ngaglik",
  ],
  authors: [{ name: siteConfig.nama }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: siteConfig.nama,
    title: siteConfig.namaLengkap,
    description: "Pelayanan kesehatan prima, siaga 24 jam, untuk pasien umum dan BPJS.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: `Logo ${siteConfig.nama}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.namaLengkap,
    description: "Pelayanan kesehatan prima, siaga 24 jam.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2E7D5B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
