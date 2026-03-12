import WindowScrollBtns from "@/shared/components/ui/WindowScrollBtns";
import BestOffersSection from "@/app/(landing)/_components/best-offer-section/BestOffersSection";
import BestSellersSection from "@/app/(landing)/_components/best-sellers-section/BestSellersSection";
import CategoriesSection from "@/app/(landing)/_components/categories-section/CategorySection";
import LatestProductSection from "@/app/(landing)/_components/latest-section/LatestProductSection";
import LimitedTimeOfferSection from "@/app/(landing)/_components/limited-offers-section/LimitedTimeOfferSection";
import HeroSection from "@/app/(landing)/_components/hero-section/HeroSection";
import TestimonialsSection from "@/app/(landing)/_components/testimonial-section/TestimonialsSection";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <LatestProductSection />
      <BestOffersSection />
      <BestSellersSection />
      <LimitedTimeOfferSection />
      <TestimonialsSection />
      <WindowScrollBtns />
    </>
  );
}

export default LandingPage;
