import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="section-padding py-24 md:py-36 text-center relative z-10">
        <AnimatedSection>
          <p className="label-text text-accent mb-6">Start Your Journey</p>
          <h2 className="heading-lg text-primary-foreground mb-8 max-w-3xl mx-auto">
            Ready to Find Your <span className="italic">Dream Property?</span>
          </h2>
          <p className="body-lg text-primary-foreground/60 mb-12 max-w-xl mx-auto">
            Let us guide you to the perfect home. Our team of experts is ready to turn 
            your vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300 hover:scale-[1.02]"
            >
              Schedule Consultation <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground px-8 py-4 label-text hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
