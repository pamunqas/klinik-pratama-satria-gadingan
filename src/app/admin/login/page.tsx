"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const errorParam = params.get("error");
  const fromParam = params.get("from") ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "server-misconfig"
      ? "Server belum dikonfigurasi. Hubungi maintainer untuk set ADMIN_PASSWORD & CMS_SESSION_SECRET."
      : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const resp = await fetch("/api/cms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error ?? "Login gagal.");
        return;
      }
      router.push(fromParam);
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-md rounded-lg border border-border-soft bg-surface-soft p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold text-primary-dark">Login Admin</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Masuk untuk mengelola konten landing page klinik.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-text-primary">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="mt-1 block w-full rounded-md border border-border-soft bg-surface-soft px-3 py-2 text-base focus:border-primary-dark focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="mt-1 block w-full rounded-md border border-border-soft bg-surface-soft px-3 py-2 text-base focus:border-primary-dark focus:outline-none"
          />
        </div>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-primary-dark px-4 py-2 text-base font-semibold text-surface-soft transition-colors hover:bg-primary-soft hover:text-primary-dark disabled:opacity-60"
        >
          {submitting ? "Memeriksa…" : "Masuk"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Memuat…</div>}>
      <LoginForm />
    </Suspense>
  );
}
