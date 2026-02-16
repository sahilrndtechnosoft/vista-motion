import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import TextReveal from "@/components/TextReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Verdant Estates exceeded every expectation. The attention to detail in our home is remarkable — from the custom finishes to the panoramic views, everything is flawless.",
    name: "Alexandra Chen",
    role: "Skyline Penthouse Owner",
  },
  {
    quote: "Working with the Verdant team was an extraordinary experience. They understood our vision from day one and delivered a home that truly reflects our lifestyle.",
    name: "Marcus & Elena Rivera",
    role: "Coastal Haven Residents",
  },
  {
    quote: "The quality of craftsmanship and the seamless process — from consultation to handover — sets Verdant Estates apart from every developer we've worked with.",
    name: "Jonathan Drake",
    role: "Commercial Portfolio Investor",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="section-padding section-gap bg-cream-dark relative overflow-hidden">
      {/* Large decorative quote */}
      <motion.div
        className="absolute top-12 left-12 text-[200px] leading-none font-serif text-border/30 pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        "
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection direction="scale">
          <p className="label-text text-accent mb-6">Testimonials</p>
        </AnimatedSection>
        <TextReveal className="heading-md text-foreground mb-16">
          What Our Clients Say
        </TextReveal>

        <div className="relative min-h-[280px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <Quote size={32} className="text-accent/30 mb-6" />
              <blockquote className="heading-sm text-foreground font-normal mb-8 leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="label-text text-foreground">{testimonials[current].name}</p>
                <p className="body-md text-muted-foreground mt-1">{testimonials[current].role}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative w-12 h-1 bg-border overflow-hidden"
              aria-label={`Testimonial ${i + 1}`}
            >
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i === current ? 1 : 0 }}
                transition={{ duration: i === current ? 5 : 0.3 }}
                style={{ originX: 0 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
