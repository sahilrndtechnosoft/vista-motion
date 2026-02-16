import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-villa.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury modern villa with infinity pool at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-secondary/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding pb-20 lg:pb-28 w-full">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="label-text text-accent mb-6"
          >
            Luxury Real Estate Development
          </motion.p>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-secondary-foreground"
            >
              Where Vision
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl text-secondary-foreground"
            >
              Meets <span className="italic text-accent">Architecture</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="body-lg text-secondary-foreground/70 max-w-xl mb-10"
          >
            Crafting exceptional living spaces that redefine luxury. 
            Discover properties that inspire extraordinary living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 label-text hover:bg-warm-orange-hover transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Properties
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-secondary-foreground/30 text-secondary-foreground px-8 py-4 label-text hover:bg-secondary-foreground/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 right-8 lg:right-20 hidden md:flex flex-col items-center gap-2"
        >
          <span className="label-text text-secondary-foreground/50 writing-mode-vertical" style={{ writingMode: "vertical-rl" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={18} className="text-secondary-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
