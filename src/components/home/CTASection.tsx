import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/TextReveal";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import HorizontalMarquee from "@/components/HorizontalMarquee";

const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ scale: bgScale, rotate }}
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(var(--accent)) 35px, hsl(var(--accent)) 36px)`,
          }}
        />
      </motion.div>

      {/* Marquee background */}
      <div className="absolute inset-0 flex items-center opacity-[0.03] pointer-events-none">
        <HorizontalMarquee
          text="YOUR DREAM HOME"
          className="heading-xl text-primary-foreground whitespace-nowrap"
          speed={25}
        />
      </div>

      <div className="section-padding py-28 md:py-40 text-center relative z-10">
        <AnimatedSection direction="scale">
          <p className="label-text text-accent mb-6 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-accent" />
            Start Your Journey
            <span className="inline-block w-8 h-px bg-accent" />
          </p>
        </AnimatedSection>

        <TextReveal className="heading-lg text-primary-foreground mb-8 max-w-3xl mx-auto" delay={0.1}>
          Ready to Find Your Dream Property?
        </TextReveal>

        <AnimatedSection delay={0.4}>
          <p className="body-lg text-primary-foreground/60 mb-12 max-w-xl mx-auto">
            Let us guide you to the perfect home. Our team of experts is ready to turn
            your vision into reality.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.2}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300"
              >
                Schedule Consultation <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground px-8 py-4 label-text hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Browse Properties
              </Link>
            </MagneticButton>
          </div>
        </AnimatedSection>
      </div>

      {/* Top and bottom accent lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </section>
  );
};

export default CTASection;
