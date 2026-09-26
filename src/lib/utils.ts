/**
 * Utility functions untuk komponen UI.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatHari(hari: string): string {
  return hari;
}

export function totalStaff(staff: { jumlah: number }[]): number {
  return staff.reduce((sum, s) => sum + s.jumlah, 0);
}
