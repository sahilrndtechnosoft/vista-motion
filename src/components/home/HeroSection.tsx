import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import heroImage from "@/assets/hero-villa.jpg";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  const headingVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };

  const lineVariants = {
    hidden: { y: "120%", rotateX: -80 },
    visible: {
      y: 0,
      rotateX: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale, opacity: imageOpacity }}>
        <img
          src={heroImage}
          alt="Luxury modern villa with infinity pool at sunset"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      {/* Grain overlay for cinematic feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 section-padding pb-20 lg:pb-28 w-full"
        style={{ y: contentY }}
      >
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="label-text text-accent mb-6 flex items-center gap-3"
          >
            <motion.span
              className="inline-block w-12 h-px bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ originX: 0 }}
            />
            Luxury Real Estate Development
          </motion.p>

          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden mb-4">
              <motion.h1 variants={lineVariants} className="heading-xl text-secondary-foreground">
                Where Vision
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 variants={lineVariants} className="heading-xl text-secondary-foreground">
                Meets <span className="italic text-accent">Architecture</span>
              </motion.h1>
            </div>
          </motion.div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg text-secondary-foreground/70 max-w-xl mb-10"
            >
              Crafting exceptional living spaces that redefine luxury.
              Discover properties that inspire extraordinary living.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton strength={0.15}>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300 group"
              >
                <span className="relative overflow-hidden">
                  <motion.span className="inline-block" whileHover={{ y: -28 }} transition={{ duration: 0.3 }}>
                    Explore Properties
                  </motion.span>
                </span>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-secondary-foreground/30 text-secondary-foreground px-8 py-4 label-text hover:bg-secondary-foreground/10 transition-all duration-300"
              >
                Our Story
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 right-8 lg:right-20 hidden md:flex flex-col items-center gap-3"
        >
          <motion.span
            className="label-text text-secondary-foreground/50"
            style={{ writingMode: "vertical-rl" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-secondary-foreground/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom line reveal */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
};

export default HeroSection;
