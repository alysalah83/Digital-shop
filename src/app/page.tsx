import WindowScrollBtns from "@/components/ui/WindowScrollBtns";
import BestOffersSection from "@/features/landing/components/BestOffersSection";
import BestSellersSection from "@/features/landing/components/BestSellersSection";
import CategoriesSection from "@/features/landing/components/CategorySection";
import LatestProductSection from "@/features/landing/components/LatestProductSection";
import LimitedTimeOfferSection from "@/features/landing/components/LimitedTimeOfferSection";
import MainSection from "@/features/landing/components/MainSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";

function LandingPage() {
  return (
    <>
      <MainSection />
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
