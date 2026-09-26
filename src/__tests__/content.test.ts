/**
 * Unit tests untuk konten terverifikasi dari clinic-info.md.
 * Memastikan struktur data sesuai sumber kanonik.
 */
import { describe, it, expect } from "vitest";
import { services } from "@/data/services";
import { staffStructure, individualStaff } from "@/data/doctors";
import { clinicContent } from "@/data/clinicContent";
import { heroSlides } from "@/data/heroSlides";
import { siteConfig } from "@/data/siteConfig";
import { gallery } from "@/data/gallery";
import { totalStaff } from "@/lib/utils";

describe("Content fidelity to clinic-info.md", () => {
  it("services memiliki tepat 10 entri (a–j)", () => {
    expect(services).toHaveLength(10);
  });

  it("services berurutan 1..10", () => {
    expect(services.map((s) => s.urutan)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("staffStructure total 16 orang (4+2+2+3+1+1+1+1+1)", () => {
    expect(totalStaff(staffStructure)).toBe(16);
    expect(staffStructure).toHaveLength(9);
  });

  it("individualStaff total 16 orang", () => {
    expect(individualStaff).toHaveLength(16);
  });

  it("misi memiliki tepat 5 poin (a–e)", () => {
    expect(clinicContent.misi).toHaveLength(5);
  });

  it("sejarah memiliki 3 milestone (2002, 2010, 2017)", () => {
    expect(clinicContent.sejarah).toHaveLength(3);
    expect(clinicContent.sejarah.map((m) => m.tahun)).toEqual([2002, 2010, 2017]);
  });

  it("heroSlides memiliki 2 slide", () => {
    expect(heroSlides).toHaveLength(2);
    expect(heroSlides[0].badge).toBe("Buka 24 Jam");
  });

  it("siteConfig.nama sesuai", () => {
    expect(siteConfig.nama).toBe("Klinik Pratama Satria Gadingan");
    expect(siteConfig.tahunBerdiri).toBe(2002);
    expect(siteConfig.pendiri).toBe("dr. A. Eki Dewanti");
  });

  it("gallery minimal 4 item", () => {
    expect(gallery.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Placeholder scope (verified vs [Contoh])", () => {
  it("clinicContent.ts TIDAK mengandung [Contoh]", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const filePath = path.resolve(__dirname, "../data/clinicContent.ts");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toMatch(/\[Contoh\]/);
  });

  it("services.ts TIDAK mengandung [Contoh]", () => {
    const fs = require("node:fs");
    const path = require("node:path");
    const filePath = path.resolve(__dirname, "../data/services.ts");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).not.toMatch(/\[Contoh\]/);
  });
});
