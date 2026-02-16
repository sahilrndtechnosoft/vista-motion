import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <StatsSection />
      <AboutPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
