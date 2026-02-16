import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/about-office.jpg";

const AboutPreview = () => {
  return (
    <section className="section-padding section-gap bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <AnimatedSection>
          <div className="image-reveal aspect-[4/5] relative">
            <img
              src={aboutImage}
              alt="Verdant Estates luxury office interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="label-text text-accent mb-6">About Us</p>
          <h2 className="heading-lg text-foreground mb-8">
            Building Legacy,<br />
            <span className="italic">One Home at a Time</span>
          </h2>
          <p className="body-lg text-muted-foreground mb-6">
            For over 15 years, Verdant Estates has been at the forefront of luxury real estate 
            development, creating spaces that transcend the ordinary and inspire extraordinary living.
          </p>
          <p className="body-md text-muted-foreground mb-10">
            Our commitment to architectural excellence, sustainable practices, and uncompromising 
            quality has earned us recognition as one of the most trusted names in premium real estate.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 label-text text-foreground btn-underline"
          >
            Discover Our Story <ArrowUpRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutPreview;
