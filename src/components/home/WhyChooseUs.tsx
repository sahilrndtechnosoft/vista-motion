import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Gem, Leaf, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Shield,
    title: "Trusted Excellence",
    description: "Over 15 years of delivering premium properties with unwavering commitment to quality and client satisfaction.",
    number: "01",
  },
  {
    icon: Gem,
    title: "Bespoke Design",
    description: "Every project is a unique masterpiece, crafted with meticulous attention to architectural detail and luxurious finishes.",
    number: "02",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description: "We integrate eco-conscious design principles without compromising on the opulence our clients expect.",
    number: "03",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Recognized globally for our innovative approach to real estate development and architectural excellence.",
    number: "04",
  },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".why-card");
      
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Bottom accent line
        const line = card.querySelector(".accent-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: i * 0.12 + 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding section-gap bg-background overflow-hidden">
      <div className="text-center mb-20">
        <AnimatedSection direction="scale">
          <p className="label-text text-accent mb-4 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-accent" />
            Why Choose Us
            <span className="inline-block w-8 h-px bg-accent" />
          </p>
        </AnimatedSection>
        <TextReveal className="heading-lg text-foreground" delay={0.1}>
          The Verdant Difference
        </TextReveal>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border">
        {reasons.map((reason, i) => (
          <div
            key={reason.title}
            className="why-card group relative p-8 lg:p-10 border-r border-b border-border hover:bg-card transition-all duration-700 cursor-default hover-lift"
            style={{ opacity: 0 }}
          >
            {/* Number watermark */}
            <span className="absolute top-4 right-6 font-serif text-6xl font-bold text-border/50 group-hover:text-accent/10 transition-colors duration-700">
              {reason.number}
            </span>

            <div className="mb-6 relative z-10">
              <reason.icon
                size={32}
                className="text-accent group-hover:scale-110 transition-transform duration-500"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="heading-sm text-foreground mb-4 relative z-10">{reason.title}</h3>
            <p className="body-md text-muted-foreground relative z-10">{reason.description}</p>

            {/* Bottom accent line */}
            <div
              className="accent-line absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
