"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/cms/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const isLogin = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-surface-pale text-text-primary">
      {!isLogin && (
        <header className="border-b border-border-soft bg-surface-soft">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
            <Link href="/admin" className="flex items-center gap-3">
              <span className="text-base font-semibold text-primary-dark">
                Klinik Pratama Satria Gadingan
              </span>
              <span className="text-sm text-text-secondary">CMS Admin</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-primary-dark px-3 py-1.5 text-sm font-medium text-surface-soft hover:bg-primary-soft hover:text-primary-dark"
            >
              Keluar
            </button>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
