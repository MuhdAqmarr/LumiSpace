import CinematicNavbar from "@/components/layout/CinematicNavbar";
import Footer from "@/components/layout/Footer";
import VideoHero from "@/components/public/VideoHero";
import FeaturedVenueGrid from "@/components/public/FeaturedVenueGrid";
import FeaturedProviders from "@/components/public/FeaturedProviders";
import HowItWorks from "@/components/public/HowItWorks";
import ProviderCTA from "@/components/public/ProviderCTA";

export default function HomePage() {
  return (
    <>
      <CinematicNavbar />
      <main>
        <VideoHero />
        <FeaturedVenueGrid />
        <FeaturedProviders />
        <HowItWorks />
        <ProviderCTA />
      </main>
      <Footer />
    </>
  );
}
