/**
 * schedules.ts — typed loader dari schedules.json (Decap CMS-editable).
 * Struktur JSON: { "schedules": Schedule[] }.
 */
import data from "./schedules.json";
import type { Schedule } from "@/types/content";

export const schedules: Schedule[] = (data as { schedules: Schedule[] }).schedules;
