/**
 * gallery.ts — typed loader dari gallery.json (Decap CMS-editable).
 * Struktur JSON: { "gallery": GalleryItem[] }.
 */
import data from "./gallery.json";
import type { GalleryItem } from "@/types/content";

export const gallery: GalleryItem[] = (data as { gallery: GalleryItem[] }).gallery;
