import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { DoctorGrid } from "@/components/sections/DoctorGrid";
import { ScheduleTable } from "@/components/sections/ScheduleTable";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { heroSlides } from "@/data/heroSlides";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel slides={heroSlides} />
        <ProfileSection />
        <ServiceGrid />
        <DoctorGrid />
        <ScheduleTable />
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
