import HeroSection from "@/components/home/HeroSection";
import HorizontalMarquee from "@/components/HorizontalMarquee";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HorizontalGallery from "@/components/home/HorizontalGallery";
import StatsSection from "@/components/home/StatsSection";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <main>
      <HeroSection />
      {/* Marquee divider */}
      <div className="py-6 bg-secondary border-y border-secondary-foreground/10 overflow-hidden">
        <HorizontalMarquee
          text="Luxury Living ✦ Bespoke Design ✦ Architectural Excellence ✦ Premium Estates"
          className="label-text text-secondary-foreground/30"
          speed={35}
          separator=""
        />
      </div>
      <FeaturedProjects />
      <HorizontalGallery />
      <StatsSection />
      <AboutPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
