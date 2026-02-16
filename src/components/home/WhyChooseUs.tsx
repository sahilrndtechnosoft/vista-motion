import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Gem, Leaf, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Trusted Excellence",
    description: "Over 15 years of delivering premium properties with unwavering commitment to quality and client satisfaction.",
  },
  {
    icon: Gem,
    title: "Bespoke Design",
    description: "Every project is a unique masterpiece, crafted with meticulous attention to architectural detail and luxurious finishes.",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description: "We integrate eco-conscious design principles without compromising on the opulence our clients expect.",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Recognized globally for our innovative approach to real estate development and architectural excellence.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding section-gap bg-background">
      <AnimatedSection>
        <div className="text-center mb-16">
          <p className="label-text text-accent mb-4">Why Choose Us</p>
          <h2 className="heading-lg text-foreground">
            The Verdant <span className="italic">Difference</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, i) => (
          <AnimatedSection key={reason.title} delay={i * 0.12}>
            <div className="group p-8 border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-[var(--shadow-elevated)]">
              <reason.icon
                size={32}
                className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <h3 className="heading-sm text-foreground mb-4">{reason.title}</h3>
              <p className="body-md text-muted-foreground">{reason.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
