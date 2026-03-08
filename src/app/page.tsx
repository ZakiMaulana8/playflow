import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { FloatingControls } from "@/components/FloatingControls";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navigation />
      <Hero />
      <Gallery />
      <Footer />
      <FloatingControls />
    </main>
  );
}
