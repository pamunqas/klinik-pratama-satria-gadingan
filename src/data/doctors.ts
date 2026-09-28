/**
 * doctors.ts — typed loader dari doctors.json (Decap CMS-editable).
 * Struktur JSON: { "staffStructure": StaffStructure[], "individualStaff": StaffMember[] }.
 */
import data from "./doctors.json";
import type { StaffMember, StaffStructure } from "@/types/content";

export const staffStructure: StaffStructure[] = (data as { staffStructure: StaffStructure[] }).staffStructure;
export const individualStaff: StaffMember[] = (data as { individualStaff: StaffMember[] }).individualStaff;
