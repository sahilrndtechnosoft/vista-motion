import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Gem, Leaf, Award } from "lucide-react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-border">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative p-8 lg:p-10 border-r border-b border-border hover:bg-card transition-all duration-700 cursor-default"
          >
            {/* Number watermark */}
            <span className="absolute top-4 right-6 font-serif text-6xl font-bold text-border/50 group-hover:text-accent/10 transition-colors duration-700">
              {reason.number}
            </span>

            <motion.div
              className="mb-6 relative z-10"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <reason.icon
                size={32}
                className="text-accent group-hover:scale-110 transition-transform duration-500"
                strokeWidth={1.5}
              />
            </motion.div>
            <h3 className="heading-sm text-foreground mb-4 relative z-10">{reason.title}</h3>
            <p className="body-md text-muted-foreground relative z-10">{reason.description}</p>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.5 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
