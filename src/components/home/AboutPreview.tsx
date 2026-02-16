import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import aboutImage from "@/assets/about-office.jpg";

const AboutPreview = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["inset(20% 20% 20% 20%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section ref={sectionRef} className="section-padding section-gap bg-background overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div style={{ clipPath }} className="aspect-[4/5] relative">
          <ParallaxImage
            src={aboutImage}
            alt="Verdant Estates luxury office interior"
            className="w-full h-full"
            speed={0.15}
          />
          {/* Floating accent frame */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent/30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        <div>
          <AnimatedSection direction="left">
            <p className="label-text text-accent mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-accent" />
              About Us
            </p>
          </AnimatedSection>
          <TextReveal className="heading-lg text-foreground mb-8" delay={0.15}>
            Building Legacy, One Home at a Time
          </TextReveal>
          <AnimatedSection delay={0.4}>
            <p className="body-lg text-muted-foreground mb-6">
              For over 15 years, Verdant Estates has been at the forefront of luxury real estate
              development, creating spaces that transcend the ordinary and inspire extraordinary living.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <p className="body-md text-muted-foreground mb-10">
              Our commitment to architectural excellence, sustainable practices, and uncompromising
              quality has earned us recognition as one of the most trusted names in premium real estate.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.6}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 label-text text-foreground btn-underline group"
            >
              Discover Our Story
              <motion.span whileHover={{ x: 4, y: -4 }} transition={{ duration: 0.2 }}>
                <ArrowUpRight size={16} />
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
